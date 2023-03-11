import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'
import httpService, { base_url } from '../../apis/config'
import { useGoogleLogin } from '@react-oauth/google';

const Signup = () => {

    const initialFormValues = {
        email: "",
        password: "",
        role: ""
    }
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const isValid = validate(formValues);
            if (isValid) {
                const toastId = toast.loading('Loading...');
                const response = await httpService.post(`${base_url}/register`, { formValues });
                if (response.data.success) {
                    toast.dismiss(toastId);
                    toast.success(response.data.message);
                    setFormValues(initialFormValues);
                    localStorage.setItem("user", JSON.stringify({
                        userId: response.data.userId,
                        userEmail: response.data.email
                    }));
                    navigate('/');
                } else {
                    toast.dismiss(toastId);
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error("Network Error");
        }

    };

    const responseGoogleSuccess = async (response) => {
        try {
            const data = await httpService.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            })
            const toastId = toast.loading('Loading...');
            const backendResponse = await httpService.post(`${base_url}/register`, { formValues: { email: data.data.email } });

            localStorage.setItem("user", JSON.stringify({
                userId: backendResponse.data.userId,
                userEmail: data.data.email
            }));
            toast.dismiss(toastId);
            toast.success(backendResponse.data.message);

            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error("Network Error");
        }
    }
    const responseGoogleFailed = () => {
        toast.error("Network Error");
    }

    const handleGoogleSignin = useGoogleLogin({
        onSuccess: (response) => responseGoogleSuccess(response),
        onError: responseGoogleFailed
    });



    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let isValid = true;
        if (!values.role) {
            errors.role = "Please select your role";
            isValid = false;
        }
        if (!values.email) {
            errors.email = "Please enter your email";
            isValid = false;
        } else if (!regex.test(values.email)) {
            errors.email = "Please enter valid email";
        }
        if (!values.password) {
            errors.password = "Please enter your password";
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    // console.log("formValues :", formValues);

    return (
        <>
            <div><Toaster /></div>
            <div className="account-section">
                <div className="acoount-row row">
                    <div className="col-md-6 pt-4 pt-md-0">
                        <div className="account-col">
                            <div className="brand-logo">
                                <Link to="/"><img src="/app-logo-v2.png" alt="" /></Link>
                                <Link to="/"><p>CipherSchools</p></Link>
                            </div>
                            <form onSubmit={handleSignUp}>
                                <div className="form-title">
                                    <p>Let's Connect</p>
                                    <span>Fill the below form to signup</span>
                                </div>
                                <div className="form-inputs">
                                    <label>You are a</label>
                                    <select name='role' value={formValues.role} onChange={handleFormValues}>
                                        <option value="">Select your role</option>
                                        <option value="Student">Student</option>
                                        <option value="Creator">Creator</option>
                                    </select>
                                    <span>{formErrors.role}</span>
                                </div>
                                <div className="form-inputs">
                                    <label>Email</label>
                                    <input type="email" name='email' placeholder='Enter your email' value={formValues.email} onChange={handleFormValues} />
                                    <span>{formErrors.email}</span>
                                </div>
                                <div className="form-inputs">
                                    <label>Password</label>
                                    <input type="password" name='password' placeholder='•••••••••••' value={formValues.password} onChange={handleFormValues} />
                                    <span>{formErrors.password}</span>
                                </div>
                                <div className="form-submit-div">
                                    <button type="submit">Sign up</button>
                                </div>
                                <div className="form-submit-div google-signin">
                                    <button type='button' onClick={() => handleGoogleSignin()}><img src="/google-logo.svg" alt='google' />&nbsp;&nbsp;Sign up with Google</button>
                                </div>
                            </form>
                            <div className="account-redirect">
                                <p>Already have an account? <Link to="/signin">Sign in here</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="account-right-col col-md-6 d-none d-md-block">
                        <div className="account-image-banner">
                            <p>“The super way to solve your doubts”<br />Join us </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;