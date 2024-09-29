'use server';

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId, formData) {
    // Connect to DB.
    await connectDB();

    // Get session user.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }
    const { userId } = sessionUser;

    // Fetch property and check if it exist.
    const existingProperty = await Property.findById(propertyId);

    // Verify the ownership.
    if (existingProperty.owner.toString() !== userId) {
        throw new Error('Current user does not own this property');
    }
    // Get property data.
    const amenities = formData.getAll('amenities');
    const propertyData = {
        owner: userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode')
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
    };

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);

    revalidatePath('/', 'layout');

    redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;