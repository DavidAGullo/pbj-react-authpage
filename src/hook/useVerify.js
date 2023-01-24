import { useQuery } from "react-query";
import pb from "../lib/pocketbase";

export default function useVerify() {
    const id = pb.authStore.model?.id;
    async function verify() {
        if (pb.authStore.isValid) {
            const userdata = await pb.collection('users').getOne(id);
            return userdata.verified;
        }
        
    }

    return useQuery({queryFn: verify, queryKey: ['verify-check', id]});
}

export async function requestVerification() {
    const email = pb.authStore.model.email;
    const res = await pb.collection('users').requestVerification(email);

    if (res) alert('Verification email sent!'); 
}
