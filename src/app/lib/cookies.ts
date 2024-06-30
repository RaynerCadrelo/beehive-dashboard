import { cookies } from "next/headers";

const cookiesParameters = {
    maxAge: 60 * 15, // 15 minutes in seconds
    httpOnly: true, // prevent client-side access
    sameSite: 'strict', // prevent cross-site requests
};

export function setCookies(key: string, value: string) {
    cookies().set(key, value, cookiesParameters as any);
}