import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/xxx-admin-login`,
                formData,
                {
                    withCredentials: true,
                }
            );

            // console.log("LOGIN RESPONSE:", res.data);

            // বিভিন্ন response structure handle
            const token =
                res?.data?.data?.accessToken ||
                res?.data?.accessToken ||
                res?.data?.token;

            // console.log("TOKEN:", token);

            if (token) {
                localStorage.setItem(
                    "adminAccessToken",
                    token
                );
            }

            navigate("/admin/dashboard");
        } catch (err) {
            console.log("LOGIN ERROR:", err);
            console.log(
                "ERROR RESPONSE:",
                err?.response?.data
            );

            alert(
                err?.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border p-3 rounded"
                        required
                    />

                    <div className="relative">
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full border p-3 rounded pr-12"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute right-3 top-3"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded disabled:opacity-50"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
