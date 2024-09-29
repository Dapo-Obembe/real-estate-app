'use server';

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
    // Get the user.
    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    // Get the property.
    const property = await Property.findById(propertyId);

    if (!property) throw new Error('Property Not Found');

    // Verify Ownership.
    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized!');
    }

    // Delete property's image from the CLoudinary server.
    // 1. Extract public ID from image URL.
    const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split('/');
        return parts.at(-1).split('.').at(0)
    });

    // Now delete the image.
    if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('RealEstateApp/' + publicId);
        }
    }

    // Proceed with the deletion.
    await property.deleteOne();

    revalidatePath('/', 'layout');

}

export default deleteProperty;