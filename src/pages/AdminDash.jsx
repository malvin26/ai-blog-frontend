




import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../component/Navbar";

const AdminDash = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [publishMsg, setPublishMsg] = useState("");

    const [tokens, setTokens] = useState({
        prompt: 0,
        completion: 0,
        total: 0,
        thoughts: 0,
    });

    // =========================
    // DARK MODE STATE
    // =========================
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("admin_theme");
        if (saved) return saved === "dark";
        // fallback: system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("admin_theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("admin_theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    // =========================
    // AUTH CHECK (ONLY LOCAL TOKEN)
    // =========================
    useEffect(() => {
        const token = localStorage.getItem("adminAccessToken");

        if (!token) {
            navigate("/xxx-admin-login");
            return;
        }

        const savedContent = localStorage.getItem("ai_blog");
        const savedTokens = localStorage.getItem("ai_tokens");

        if (savedContent) setContent(JSON.parse(savedContent));
        if (savedTokens) setTokens(JSON.parse(savedTokens));
    }, []);

    // =========================
    // GENERATE CONTENT
    // =========================
    const handleGenerate = async () => {
        try {
            setLoading(true);
            setError("");
            setPublishMsg("");

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/xxx-admin-generate`,
                { withCredentials: true }
            );

            const data = res?.data?.data;

            setContent(data?.result);

            localStorage.setItem(
                "ai_blog",
                JSON.stringify(data?.result)
            );

            const tokenData = {
                prompt: data?.usage?.prompt_tokens || 0,
                completion: data?.usage?.completion_tokens || 0,
                total: data?.usage?.total_tokens || 0,
                thoughts: data?.usage?.thoughts_tokens || 0,
            };

            setTokens(tokenData);

            localStorage.setItem(
                "ai_tokens",
                JSON.stringify(tokenData)
            );

        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Generation failed"
            );

            console.log(err);


        } finally {
            setLoading(false);
        }
    };




    // =========================
    // HANDLE EDIT
    // =========================
    const handleContentChange = (e) => {
        const val = e.target.value;
        setContent(val);
        localStorage.setItem("ai_blog", JSON.stringify(val));
    };

    // =========================
    // PUBLISH
    // =========================
    const handlePublish = async () => {
        if (!content) {
            setError("No content to publish!");
            return;
        }

        try {
            setPublishing(true);
            setError("");
            setPublishMsg("");

            let payload;

            if (typeof content === "string") {
                const cleaned = content
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                payload = JSON.parse(cleaned);
            } else {
                payload = content;
            }

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/xxx-admin-publish`,
                { rawContent: payload },
                { withCredentials: true }
            );

            // console.log(res);


            if (res.data.success) {
                setPublishMsg("✅ " + res.data.message);

                localStorage.removeItem("ai_blog");
                localStorage.removeItem("ai_tokens");

                setContent("");
                setTokens({
                    prompt: 0,
                    completion: 0,
                    total: 0,
                    thoughts: 0,
                });
            }

        } catch (err) {
            setError(
                err.data
            );
        } finally {
            setPublishing(false);
        }
    };



    // =========================
    // CLEAR
    // =========================
    const handleClear = () => {
        setContent("");
        setError("");
        setPublishMsg("");
        setTokens({
            prompt: 0,
            completion: 0,
            total: 0,
            thoughts: 0,
        });

        localStorage.removeItem("ai_blog");
        localStorage.removeItem("ai_tokens");
    };

    // =========================
    // LOGOUT
    // =========================
    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/xxx-admin-logout`,
                {},
                { withCredentials: true }
            );
        } catch (err) {
            console.log(err);
        }

        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("ai_blog");
        localStorage.removeItem("ai_tokens");

        navigate("/xxx-admin-login");
    };

    const cost = (tokens.total / 1000) * 0.0005;

    const displayContent =
        typeof content === "object"
            ? JSON.stringify(content, null, 2)
            : content;

    return (<>
        <Navbar>
            <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
            >
                Logout
            </button>
        </Navbar>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">


            {/* ================= BODY ================= */}

            <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8">

                {/* ================= LEFT ================= */}

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-300">

                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Generate AI Blog
                    </h2>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || publishing}
                        className="
            w-full
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            dark:bg-blue-500
            dark:hover:bg-blue-600
            text-white
            py-3
            font-semibold
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
                    >
                        {loading ? "Generating..." : "Generate Blog"}
                    </button>

                    {error && (
                        <div className="mt-5 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 rounded-xl bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 p-5 transition-colors duration-300">

                        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
                            Token Usage
                        </h3>

                        <div className="space-y-2 text-gray-700 dark:text-gray-300">

                            <div className="flex justify-between">
                                <span>Prompt</span>
                                <span>{tokens.prompt}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Completion</span>
                                <span>{tokens.completion}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Thoughts</span>
                                <span>{tokens.thoughts}</span>
                            </div>

                            <hr className="dark:border-gray-700" />

                            <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100">
                                <span>Total Tokens</span>
                                <span>{tokens.total}</span>
                            </div>

                            <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
                                <span>Estimated Cost</span>
                                <span>${cost.toFixed(5)}</span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= RIGHT ================= */}

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-300">

                    <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
                        Generated Content
                    </h2>

                    <textarea
                        value={displayContent}
                        onChange={handleContentChange}
                        placeholder="No content generated..."
                        className="
            w-full
            h-[550px]
            rounded-xl
            border
            border-gray-300
            dark:border-gray-700
            bg-gray-50
            dark:bg-gray-800
            text-gray-900
            dark:text-gray-100
            p-4
            outline-none
            resize-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            font-mono
            text-sm
            transition-colors
            duration-300
          "
                    />

                    {publishMsg && (
                        <div className="mt-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 text-green-700 dark:text-green-400">
                            {publishMsg}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mt-6">

                        <button
                            onClick={handleClear}
                            className="
              py-3
              rounded-xl
              bg-red-500
              hover:bg-red-600
              dark:bg-red-600
              dark:hover:bg-red-700
              text-white
              font-semibold
              transition
            "
                        >
                            Clear
                        </button>

                        <button
                            onClick={handlePublish}
                            disabled={publishing || loading || !content}
                            className="
              py-3
              rounded-xl
              bg-green-600
              hover:bg-green-700
              dark:bg-green-600
              dark:hover:bg-green-700
              text-white
              font-semibold
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
                        >
                            {publishing ? "Publishing..." : "Publish Blog"}
                        </button>

                    </div>

                </div>

            </div>

        </div></>
    );
};

export default AdminDash;

