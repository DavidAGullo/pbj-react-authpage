import { useState, useEffect } from "react";
import pb from "../lib/pocketbase";

export default function useVerify() {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        async function verify() {
            const id = pb.authStore.model.id;
            const userData = await pb.collection('users').getOne(id);

            setIsVerified(userData.verified);
        }
        const isLoggedIn = pb.authStore.isValid;
        if (isLoggedIn) { verify(); }
    }, []);

    async function sendVerificationEmail() {
        const email = pb.authStore.model.email;
        const res = await pb.collection('users').sendVerificationEmail(email);

        if (res) { alert('Verification email sent!'); }
    }

    return { isVerified, sendVerificationEmail };
}

