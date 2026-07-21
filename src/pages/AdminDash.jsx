import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../component/Navbar";

// =========================
// TOAST COMPONENT
// =========================
const Toast = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(toast.id), 3500);
        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const styles = {
        success:
            "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400",
        error:
            "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400",
    };

    return (
        <div
            className={`pointer-events-auto w-80 rounded-xl border shadow-lg p-4 animate-in slide-in-from-right ${styles[toast.type] || styles.success
                }`}
        >
            <p className="text-sm font-medium">{toast.message}</p>
        </div>
    );
};

const ToastContainer = ({ toasts, removeToast }) => (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map((t) => (
            <Toast key={t.id} toast={t} onClose={removeToast} />
        ))}
    </div>
);

const AdminDash = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

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
    // IMAGE UPLOAD STATE
    // =========================
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [imageError, setImageError] = useState("");

    // =========================
    // TOAST STATE
    // =========================
    const [toasts, setToasts] = useState([]);

    const pushToast = (message, type = "success") => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    // =========================
    // DARK MODE STATE
    // =========================
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("admin_theme");
        if (saved) return saved === "dark";
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

    // cleanup object URL on unmount
    useEffect(() => {
        return () => {
            if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        };
    }, [thumbnailPreview]);

    // =========================
    // GENERATE CONTENT
    // =========================
    const handleGenerate = async () => {
        try {
            setLoading(true);
            setError("");
            setPublishMsg("");

            const token = localStorage.getItem("adminAccessToken");

            if (!token) {
                navigate("/xxx-admin-login");
                return;
            }

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/xxx-admin-generate`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = res?.data?.data;

            setContent(data?.result);

            localStorage.setItem("ai_blog", JSON.stringify(data?.result));

            const tokenData = {
                prompt: data?.usage?.prompt_tokens || 0,
                completion: data?.usage?.completion_tokens || 0,
                total: data?.usage?.total_tokens || 0,
                thoughts: data?.usage?.thoughts_tokens || 0,
            };

            setTokens(tokenData);

            localStorage.setItem("ai_tokens", JSON.stringify(tokenData));

            pushToast("Blog content generated successfully.", "success");
        } catch (err) {
            const msg = err?.response?.data?.message || "Generation failed";
            setError(msg);
            pushToast(msg, "error");
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
    // IMAGE VALIDATION
    // =========================
    const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const MAX_SIZE_MB = 5;

    const validateAndSetImage = (file) => {
        setImageError("");

        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            setImageError("শুধুমাত্র JPG, PNG বা WEBP ফরম্যাট গ্রহণযোগ্য।");
            return;
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setImageError(`ছবির সাইজ ${MAX_SIZE_MB}MB এর কম হতে হবে।`);
            return;
        }

        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);

        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        validateAndSetImage(file);
        e.target.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        validateAndSetImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleRemoveImage = () => {
        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setImageError("");
    };

    // =========================
    // PUBLISH
    // =========================
    const handlePublish = async () => {
        if (!content) {
            setError("No content to publish!");
            pushToast("No content to publish!", "error");
            return;
        }

        if (!thumbnailFile) {
            setImageError("Thumbnail image is required.");
            pushToast("Thumbnail image is required.", "error");
            return;
        }

        try {
            setPublishing(true);
            setError("");
            setPublishMsg("");

            const token = localStorage.getItem("adminAccessToken");

            if (!token) {
                navigate("/xxx-admin-login");
                return;
            }

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

            const formData = new FormData();
            formData.append("rawContent", JSON.stringify(payload));
            formData.append("thumbnail", thumbnailFile);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/xxx-admin-publish`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                setPublishMsg("✅ " + res.data.message);
                pushToast(res.data.message || "Blog published successfully.", "success");

                localStorage.removeItem("ai_blog");
                localStorage.removeItem("ai_tokens");

                setContent("");
                handleRemoveImage();

                setTokens({
                    prompt: 0,
                    completion: 0,
                    total: 0,
                    thoughts: 0,
                });
            }
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                (err instanceof SyntaxError ? "Invalid JSON content" : "Publish failed");
            setError(msg);
            pushToast(msg, "error");
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

        handleRemoveImage();

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
        typeof content === "object" ? JSON.stringify(content, null, 2) : content;

    return (
        <>
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            <Navbar>

                <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                >
                    Logout
                </button>
            </Navbar>

            <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8">
                    {/* ================= LEFT ================= */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-300">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                            Generate AI Blog
                        </h2>

                        <button
                            onClick={handleGenerate}
                            disabled={loading || publishing}
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            )}
                            {loading ? "Generating..." : "Generate Blog"}
                        </button>

                        {error && (
                            <div className="mt-5 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {/* ================= THUMBNAIL UPLOAD ================= */}
                        <div className="mt-8">
                            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
                                Thumbnail Image
                            </h3>

                            {!thumbnailPreview ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-200 ${isDragging
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                        : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                                        }`}
                                >
                                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                                        ছবি এখানে ড্র্যাগ করুন অথবা ক্লিক করে বাছাই করুন
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                        JPG, PNG, WEBP — সর্বোচ্চ {MAX_SIZE_MB}MB
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-4 py-2 rounded-lg bg-white/90 text-gray-900 text-sm font-semibold hover:bg-white"
                                        >
                                            Change
                                        </button>
                                        <button
                                            onClick={handleRemoveImage}
                                            className="px-4 py-2 rounded-lg bg-red-600/90 text-white text-sm font-semibold hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                    />
                                </div>
                            )}

                            {imageError && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    {imageError}
                                </p>
                            )}
                        </div>

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
                            className="w-full h-[550px] rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm transition-colors duration-300"
                        />

                        {publishMsg && (
                            <div className="mt-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 text-green-700 dark:text-green-400">
                                {publishMsg}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                onClick={handleClear}
                                className="py-3 rounded-xl bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold transition"
                            >
                                Clear
                            </button>

                            <button
                                onClick={handlePublish}
                                disabled={publishing || loading || !content}
                                className="py-3 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {publishing && (
                                    <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                )}
                                {publishing ? "Publishing..." : "Publish Blog"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDash;