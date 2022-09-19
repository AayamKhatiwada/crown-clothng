import { useState } from "react";
import { signinAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../routes/utils/firebase";
// import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../routes/utils/firebase";
import FormInput from "../form-input/form-input";

const initialState = {
    email: '',
    password: '',
};

const SigninForm = () => {

    const [state, setstate] = useState(initialState);
    const { email, password } = state;

    // console.log(state);

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setstate({ ...state, [name]: value });
    }

    // sign in using email and password
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signinAuthUserWithEmailAndPassword(email, password);
            // console.log(user);
            setstate(initialState);

        } catch (error) {
            console.log(error);
        }
    }

    // sign in with google
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        // console.log(user);
    }

    return (
        <>
            <div className="container">
                <h1>
                    Sign in with email and username
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <FormInput label="Email" type="email" className="form-control" name="email" id="email-signin" aria-describedby="emailHelpId" placeholder="abc@mail.com" value={email} onChange={changeHandler} />
                    </div>

                    <div className="mb-3">
                        <FormInput label="Password" type="password" className="form-control" name="password" id="password-signin" placeholder="" value={password} onChange={changeHandler} />
                    </div>

                    <div className="mb-3 row">
                        <div className="offset-sm-4 col-sm-8">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button className="btn btn-primary" type="button" onClick={signInWithGoogle}>Sign in with google</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export default SigninForm;