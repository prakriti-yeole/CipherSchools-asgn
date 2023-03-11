import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import httpService, { base_url } from '../../apis/config';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Signin = () => {

    const navigate = useNavigate();
    const initialFormValues = {
        email: "",
        password: "",
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            const toastId = toast.loading('Loading...');
            try {
                const response = await httpService.post(`${base_url}/signin`, { formValues });
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
            } catch (error) {
                toast.dismiss(toastId);
                toast.error("Network Error");
            }

        }
    };

    const responseGoogleSuccess = async (response) => {
        try {
            const data = await httpService.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${response.access_token}`
                }
            })
            console.log(data.data);
            const backendResponse = await httpService.post(`${base_url}/register`, { formValues: { email: data.data.email } });

            localStorage.setItem("user", JSON.stringify({
                userId: backendResponse.data.userId,
                userEmail: data.data.email
            }));

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    const responseGoogleFailed = () => {
        toast.error("Network Error")
    }
    const handleGoogleSignin = useGoogleLogin({
        onSuccess: (response) => responseGoogleSuccess(response),
        onError: responseGoogleFailed
    });

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let isValid = true;
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

    return (
        <>
            <div><Toaster /></div>
            <div className="account-section">
                <div className="acoount-row row">
                    <div className="col-md-6">
                        <div className="account-col">
                            <div className="brand-logo">
                                <Link to="/"><img src="/app-logo-v2.png" alt="" /></Link>
                                <Link to="/"><p>CipherSchools</p></Link>
                            </div>
                            <form onSubmit={handleSignIn}>
                                <div className="form-title">
                                    <p>Welcome back</p>
                                    <span>Welcome back, Please enter your details</span>
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
                                <div className="account-forgot">
                                    <Link to="">Forgot Password?</Link>
                                </div>
                                <div className="form-submit-div">
                                    <button type="submit">Sign in</button>
                                </div>

                                <div className="form-submit-div google-signin">
                                    <button onClick={() => handleGoogleSignin()} type='button'><img src="/google-logo.svg" alt='google' />&nbsp;&nbsp;Sign in with Google</button>
                                </div>
                            </form>

                            <div className="account-redirect">
                                <p>Don’t have account? <Link to="/signup">Sign up here</Link></p>
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

export default Signin;