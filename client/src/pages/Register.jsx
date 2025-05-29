import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from '../api/axiosInstance.js'

import BG from "../assets/bg.png";
import Logo from "../components/Logo.jsx";
import Input from "../components/Input.jsx";

function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        employeeId: '',
        password: '',
        confirm_password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(''); // Clear previous errors

            const res = await axiosInstance.post('/auth/register', formData);

            if (res.status === 201) {
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const serverMessage = error.response.data?.message || error.response.data?.error;

                if (status === 409) {
                    setError(serverMessage || 'User already exists. Please try a different email or username.');
                } else if (status === 400) {
                    setError(serverMessage || 'Invalid registration data. Please check your inputs.');
                } else {
                    setError(serverMessage || 'Registration failed. Please try again.');
                }
            } else if (error.request) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }

            console.log('Full error:', error);
            console.log('Error response:', error.response);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="w-full h-screen min-h-screen">
            <div
                className="grid md:grid-cols-2 gap-10 grid-cols-1 items-center justify-center min-h-screen p-4 md:p-12 lg:p-20 bg-cover"
                style={{
                    backgroundImage: `url(${BG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    minHeight: "100vh",
                }}
            >
                <div className="flex justify-center items-center md:justify-start">
                    <Logo />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col p-4 md:p-6 w-full md:w-screen m-auto max-w-md md:mr-auto md:ml-0"
                >
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-5">Register</h1>
                    {error && (
                        <div className="mb-4 p-[0.5em_1em] bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                type="text"
                                name="firstname"
                                placeholder="First Name:"
                                onChange={handleChange}
                                value={formData.firstname}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="lastname"
                                placeholder="Last Name:"
                                onChange={handleChange}
                                value={formData.lastname}
                                required
                            />
                        </div>
                    </div>
                    <Input
                        type="text"
                        name="employeeId"
                        placeholder="Employee ID:"
                        onChange={handleChange}
                        value={formData.employeeId}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password:"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                    <Input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password:"
                        onChange={handleChange}
                        value={formData.confirm_password}
                        required
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/auth/login"
                                className="text-[var(--primary-color)] hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] transition-colors w-full sm:w-fit py-2 px-6 rounded text-white font-medium disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;