import mongoose from 'mongoose'
import { user_model } from '../models/user.model.js'

const dateIndia = new Date();
const User = new mongoose.model("user", user_model);

const register = async (req, res) => {
    const { formValues } = req.body;

    try {
        const user = await User.findOne({ email: formValues.email })
        if (user) {
            if (user.email === formValues.email) {
                return res.send({
                    message: "User already exist",
                    success: false,
                })
            }
        } else {
            const user = new User({
                email: formValues.email,
                password: formValues.password,
                role: formValues.role,
                date: new Date(`${dateIndia} UTC`)
            })

            await user.save();
            return res.send({
                message: "registration successful",
                success: true,
                userId: user._id,
                email: user.email
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Network Error",
            success: false
        })
    }

}

export default register;