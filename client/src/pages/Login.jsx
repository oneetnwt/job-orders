import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance.js'

import BG from '../assets/bg.png'
import Logo from '../components/Logo';
import Input from '../components/Input';
import Loader from '../components/Loader.jsx';

function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        employeeId: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axiosInstance.post('/auth/login', formData);

            if (res.status === 200) {
                navigate('/');
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed. Please try again."
            );
            console.error("Login error:", error);
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
                <form onSubmit={handleSubmit} className="flex flex-col p-4 md:p-6 w-full md:w-screen m-auto max-w-md md:mr-auto md:ml-0">
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-5">Login</h1>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <Input
                        type="text"
                        name="employeeId"
                        placeholder="Employee ID:"
                        disabled={loading}
                        onChange={handleChange}
                        value={formData.employeeId}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password:"
                        disabled={loading}
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                        <p className="text-sm text-[var(--label-gray)]">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/register"
                                className="text-[var(--primary-color)] hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] transition-colors w-full sm:w-fit py-2 px-6 rounded text-white font-medium disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;