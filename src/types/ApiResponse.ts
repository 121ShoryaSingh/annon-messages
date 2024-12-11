import { Message } from "@/model/user";

export interface ApiResonse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>;
}

