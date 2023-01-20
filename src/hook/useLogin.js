import { useState } from 'react';
import pb from '../lib/pocketbase';

export default function useLogin() {
    const [isLoading, setisLoading] = useState(false);

    async function login({data}) {
        setisLoading(true);
        try{
            const authData = await pb
            .collection('users')
            .authWithPassword(data.username, data.password);
        }
        catch(error){
            console.log(error);
        }
        setisLoading(false);
    }
    return login, isLoading;
}