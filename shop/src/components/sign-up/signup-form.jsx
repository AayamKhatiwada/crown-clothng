import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupStart } from "../../store/user/user-action";
import FormInput from "../form-input/form-input";

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignupForm = () => {

    const [state, setstate] = useState(initialState);
    const { displayName, email, password, confirmPassword } = state;
    const dispatch = useDispatch();

    // console.log(state);

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setstate({ ...state, [name]: value });
    }

    // sign up with user name and password
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password and confirm password doesn't match");
            return;
        }

        try {
            dispatch(signupStart(email, password, displayName));
            setstate(initialState);

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Sorry Sir, we already got the user with the same email');
            } else {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="container">
                <h1>
                    Sign up with email and username
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <FormInput label="Name" type="text" className="form-control" name="displayName" id="displayName" placeholder="Your name" value={displayName} onChange={changeHandler} />
                    </div>

                    <div className="mb-3">
                        <FormInput label="Email" type="email" className="form-control" name="email" id="email" aria-describedby="emailHelpId" placeholder="abc@mail.com" value={email} onChange={changeHandler} />
                    </div>

                    <div className="mb-3">
                        <FormInput label="Password" type="password" className="form-control" name="password" id="password" placeholder="" value={password} onChange={changeHandler} />
                    </div>

                    <div className="mb-3">
                        <FormInput label="Confirm Password" type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="" value={confirmPassword} onChange={changeHandler} />
                    </div>

                    <div className="mb-3 row">
                        <div className="offset-sm-4 col-sm-8">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export default SignupForm;