// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);

//             const res = await axios.post(
//                 `${import.meta.env.VITE_API_URL}/xxx-admin-login`,
//                 formData,
//                 {
//                     withCredentials: true,
//                 }
//             );

//             // console.log("LOGIN RESPONSE:", res.data);

//             // বিভিন্ন response structure handle
//             const token =
//                 res?.data?.data?.accessToken ||
//                 res?.data?.accessToken ||
//                 res?.data?.token;

//             // console.log("TOKEN:", token);

//             if (token) {
//                 localStorage.setItem(
//                     "adminAccessToken",
//                     token
//                 );
//             }

//             navigate("/admin/dashboard");
//         } catch (err) {
//             console.log("LOGIN ERROR:", err);
//             console.log(
//                 "ERROR RESPONSE:",
//                 err?.response?.data
//             );

//             alert(
//                 err?.response?.data?.message ||
//                 "Login failed"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
//             <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//                 <h1 className="text-3xl font-bold text-center mb-6">
//                     Admin Login
//                 </h1>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="space-y-4"
//                 >
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                         className="w-full border p-3 rounded"
//                         required
//                     />

//                     <div className="relative">
//                         <input
//                             type={
//                                 showPassword
//                                     ? "text"
//                                     : "password"
//                             }
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Password"
//                             className="w-full border p-3 rounded pr-12"
//                             required
//                         />

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowPassword(
//                                     !showPassword
//                                 )
//                             }
//                             className="absolute right-3 top-3"
//                         >
//                             {showPassword ? (
//                                 <EyeOff size={20} />
//                             ) : (
//                                 <Eye size={20} />
//                             )}
//                         </button>
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white py-3 rounded disabled:opacity-50"
//                     >
//                         {loading
//                             ? "Logging in..."
//                             : "Login"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


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

        console.log("✅ Submit Clicked");
        console.log("API URL =", import.meta.env.VITE_API_URL);

        const apiUrl = `${import.meta.env.VITE_API_URL}/xxx-admin-login`;

        console.log("POST URL =", apiUrl);

        try {
            setLoading(true);

            const res = await axios.post(
                apiUrl,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("LOGIN RESPONSE =", res.data);

            const token =
                res?.data?.data?.accessToken ||
                res?.data?.accessToken ||
                res?.data?.token;

            if (token) {
                localStorage.setItem("adminAccessToken", token);
            }

            alert("Login Success");

            navigate("/admin/dashboard");
        } catch (err) {
            console.error("LOGIN ERROR =", err);

            if (err.response) {
                console.log("STATUS =", err.response.status);
                console.log("DATA =", err.response.data);

                alert(
                    err.response.data?.message ||
                    "Login Failed"
                );
            } else {
                alert("Server Connection Failed");
            }
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
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded p-3"
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded p-3 pr-12"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute top-3 right-3"
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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-3"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
