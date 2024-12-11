import mongosse, {Schema, Document} from 'mongoose';
import { ST } from 'next/dist/shared/lib/utils';

export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: Boolean;
    messages: Message[]

}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "UserName is required"],
        trim: true,
        unique: true, 
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "please use a valid email address"]
    },
    password :{
        type: String,
        required:[true, "Password is required"],
    },

    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code Expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    } ,
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]

})

const UserModel = (mongosse.models.User as mongosse.Model<User>) || mongosse.model<User>("User", UserSchema)
export default UserModel