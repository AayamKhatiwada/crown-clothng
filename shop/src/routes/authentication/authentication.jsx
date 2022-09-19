// import { getRedirectResult } from "firebase/auth";
// import { useEffect } from "react";
import SigninForm from "../../components/sign-in/signin-form";
import SignupForm from "../../components/sign-up/signup-form";
// import { /*auth, signInWithGoogleRedirect, */ createUserDocumentFromAuth, signInWithGooglePopup } from "../utils/firebase";


const Authentication = () => {
    
    // useEffect(()=> {
    //     async function func() {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //     } 
    //     func()
    // });

    // const logGoogleUser = async () =>{
    //     const {user} = await signInWithGooglePopup();
    //     createUserDocumentFromAuth(user);
    // }

    return (
        <>
            <h1>
                This is sign in page
            </h1>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in redirect</button> */}
            {/* <button onClick={logGoogleUser}>Sign in popup</button> */}
            <SignupForm/>
            <SigninForm/>
        </>
    );
}

export default Authentication;