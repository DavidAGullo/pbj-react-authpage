import { useState } from 'react';
import pb from '../lib/pocketbase';

export default function useLogout() {
    const [DUMMY, setDUMMY] = useState();
    
    function logout(){
        pb.authStore.clear();
        setDUMMY(Math.random(0))
    }
    
    return logout;
}
