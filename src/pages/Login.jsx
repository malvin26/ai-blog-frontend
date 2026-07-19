import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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

            const token =
                res?.data?.data?.accessToken ||
                res?.data?.accessToken ||
                res?.data?.token;

            if (token) {
                localStorage.setItem(
                    "adminAccessToken",
                    token
                );
            }

            navigate("/admin/dashboard");
        } catch (err) {
            alert(
                err?.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-2xl p-8">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        AI
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Login to your Admin Dashboard
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Email */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <div className="relative">

                            <Mail
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@gmail.com"
                                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  py-3
                  pl-12
                  pr-4
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-4
                  focus:ring-blue-100
                "
                            />
                        </div>
                    </div>

                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <div className="relative">

                            <Lock
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  py-3
                  pl-12
                  pr-12
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-4
                  focus:ring-blue-100
                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
              w-full
              rounded-xl
              bg-blue-600
              py-3.5
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>

                {/* Footer */}

                <p className="mt-8 text-center text-sm text-gray-500">
                    AI Blog Admin Panel
                </p>

            </div>
        </div>
    );
};

export default Login;