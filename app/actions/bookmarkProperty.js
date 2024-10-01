'use server';

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('user ID is required');
    }

    // Get the userId from the session.
    const { userId } = sessionUser;

    // Get user from the DB via the User model.
    const user = await User.findById(userId);

    //------ Check if the property to be bookmarked is already in the array.
    // Add to the Bookmark array if not, and remove if already in the array -------//
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
        // If already bookmarked, then remove.
        user.bookmarks.pull(propertyId);
        message = 'Bookmark removed';
        isBookmarked = false;
    } else {
        // If not bookmarked, then add.
        user.bookmarks.push(propertyId);
        message = 'Bookmark Added';
        isBookmarked = true;
    }

    await user.save();
    revalidatePath('/property/saved', 'page');

    return {
        message,
        isBookmarked,
    };
    
}

export default bookmarkProperty;