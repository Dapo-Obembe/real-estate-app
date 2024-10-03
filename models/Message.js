import { Schema, model, models } from 'mongoose';

// Set up the USer Schema.
const MessageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        property: {
            type: Schema.Types.ObjectId,
            ref: 'Property',
            required: true
        },
        // Form fields.
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        phone: {
            type: String
        },
        body: String, // This is the message field in the form.
        read: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Message = models.Message || model('Message', MessageSchema);

export default User;