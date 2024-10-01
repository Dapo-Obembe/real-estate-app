'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
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
    let isBookmarked = user.bookmarks.includes(propertyId);

    return { isBookmarked };
}
export default checkBookmarkStatus;