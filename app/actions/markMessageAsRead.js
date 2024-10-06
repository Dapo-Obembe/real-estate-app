'use server';
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('user ID is required');
    }

    // Get the userId from the session.
    const { userId } = sessionUser;

    // Get message from the DB via the Message model.
    const message = await Message.findById(messageId);

    if (!message) throw new Error('Message not found');

    //Verify ownership.
    if (message.recipient.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    // Update the message.
    message.read = !message.read;

    revalidatePath('/messages', 'page');

    await message.save();

    return message.read;
    
}
export default markMessageAsRead;