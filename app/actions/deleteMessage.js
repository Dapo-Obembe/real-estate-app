'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
    // Get the user.
    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    // Get themessage.
    const message = await Message.findById(messageId);

     // Verify Ownership.
    if (message.recipient.toString() !== userId) throw new Error('Unauthorized!');;

    // Proceed to delete.
    await Message.deleteOne();

    revalidatePath('/message', 'page');

}

export default deleteMessage;