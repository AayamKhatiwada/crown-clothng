import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../routes/utils/firebase";

export const UserContext = createContext({

    currentUser: null,
    changeUser: ()=>{},
    
})

export const UserProvider = ({children})=>{
    const [currentUser, changeUser] = useState(null);
    const value = { currentUser, changeUser }

    // signOutUser()

    useEffect(() => {
        const ussubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            changeUser(user);
            console.log(user);
        })
        return ussubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}