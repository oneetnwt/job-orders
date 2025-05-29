import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import User from "../models/users.js";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, employeeId, password, confirm_password } = req.body;

        if (!firstname || !lastname || !employeeId || !password || !confirm_password) return res.status(400).json({ message: 'All fields are required' });

        if (password !== confirm_password) return res.status(400).json({ message: "Passwords do not match" })

        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long" });

        const existingUser = await User.findOne({ employeeId });

        if (existingUser) return res.status(409).json({ message: "User with this employee ID already exists" })

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || 10));
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            employeeId,
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({ message: "User has been created" });
        } else {
            res.status(400).json({ message: "Invalid User Data" });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error in register controller: ${error}` });
    }
}

export const login = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        if (!employeeId || !password) return res.status(400).json({ message: 'All fields are required' });

        const user = await User.findOne({ employeeId });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" })

        generateToken(user._id, res);
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                employeeId: user.employeeId,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: `Error in login controller: ${error}` });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: `Error in logout controller: ${error}` });
    }
}