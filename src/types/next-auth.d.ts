import 'next-auth'
import { decl } from 'postcss';

declare module 'next-auth' {
    interface User {
        _id? : string;
        isVerfied?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
    interface Session {
        user: {
            _id? : string;
            isVerfied?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        } & DefaultSession['user']    
    } 
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id? : string;
        isVerfied?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}