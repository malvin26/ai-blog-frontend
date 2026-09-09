
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../component/Navbar";

// =========================
// TOAST COMPONENT
// =========================

const Toast = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(
            () => onClose(toast.id),
            3500
        );

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
            <p className="text-sm font-medium">
                {toast.message}
            </p>
        </div>
    );
};

const ToastContainer = ({
    toasts,
    removeToast,
}) => (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map((t) => (
            <Toast
                key={t.id}
                toast={t}
                onClose={removeToast}
            />
        ))}
    </div>
);

// =========================
// ADMIN DASHBOARD
// =========================

const AdminDash = () => {
    const navigate = useNavigate();

    // =========================
    // FILE INPUT REFS
    // =========================

    const thumbnailInputRef = useRef(null);
    const affiliatedThumbnailInputRef =
        useRef(null);

    // =========================
    // GENERAL STATE
    // =========================

    const [loading, setLoading] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const [content, setContent] = useState("");

    const [error, setError] = useState("");
    const [publishMsg, setPublishMsg] = useState("");

    // =========================
    // AFFILIATE STATE
    // =========================

    const [affiliatedLink, setAffiliatedLink] =
        useState("");

    const [
        affiliatedThumbnailFile,
        setAffiliatedThumbnailFile,
    ] = useState(null);

    const [
        affiliatedThumbnailPreview,
        setAffiliatedThumbnailPreview,
    ] = useState(null);

    const [
        affiliatedImageError,
        setAffiliatedImageError,
    ] = useState("");

    // =========================
    // TOKEN STATE
    // =========================

    const [tokens, setTokens] = useState({
        prompt: 0,
        completion: 0,
        total: 0,
        thoughts: 0,
    });

    // =========================
    // MAIN THUMBNAIL STATE
    // =========================

    const [thumbnailFile, setThumbnailFile] =
        useState(null);

    const [thumbnailPreview, setThumbnailPreview] =
        useState(null);

    const [isDragging, setIsDragging] =
        useState(false);

    const [imageError, setImageError] =
        useState("");

    // =========================
    // TOAST STATE
    // =========================

    const [toasts, setToasts] = useState([]);

    const pushToast = (
        message,
        type = "success"
    ) => {
        const id =
            Date.now() + Math.random();

        setToasts((prev) => [
            ...prev,
            {
                id,
                message,
                type,
            },
        ]);
    };

    const removeToast = (id) => {
        setToasts((prev) =>
            prev.filter((t) => t.id !== id)
        );
    };

    // =========================
    // DARK MODE
    // =========================

    const [darkMode, setDarkMode] = useState(() => {
        const saved =
            localStorage.getItem(
                "admin_theme"
            );

        if (saved) {
            return saved === "dark";
        }

        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
    });

    useEffect(() => {
        const root =
            document.documentElement;

        if (darkMode) {
            root.classList.add("dark");

            localStorage.setItem(
                "admin_theme",
                "dark"
            );
        } else {
            root.classList.remove("dark");

            localStorage.setItem(
                "admin_theme",
                "light"
            );
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    // =========================
    // AUTH CHECK
    // =========================

    useEffect(() => {
        const token =
            localStorage.getItem(
                "adminAccessToken"
            );

        if (!token) {
            navigate("/xxx-admin-login");
            return;
        }

        const savedContent =
            localStorage.getItem(
                "ai_blog"
            );

        const savedTokens =
            localStorage.getItem(
                "ai_tokens"
            );

        const savedAffiliateLink =
            localStorage.getItem(
                "ai_affiliated_link"
            );

        if (savedContent) {
            try {
                setContent(
                    JSON.parse(savedContent)
                );
            } catch {
                setContent(savedContent);
            }
        }

        if (savedTokens) {
            try {
                setTokens(
                    JSON.parse(savedTokens)
                );
            } catch {
                console.log(
                    "Invalid saved token data"
                );
            }
        }

        if (savedAffiliateLink) {
            setAffiliatedLink(
                savedAffiliateLink
            );
        }
    }, [navigate]);

    // =========================
    // SAVE AFFILIATE LINK
    // =========================

    useEffect(() => {
        if (affiliatedLink.trim()) {
            localStorage.setItem(
                "ai_affiliated_link",
                affiliatedLink
            );
        } else {
            localStorage.removeItem(
                "ai_affiliated_link"
            );
        }
    }, [affiliatedLink]);

    // =========================
    // CLEANUP OBJECT URLS
    // =========================

    useEffect(() => {
        return () => {
            if (thumbnailPreview) {
                URL.revokeObjectURL(
                    thumbnailPreview
                );
            }

            if (
                affiliatedThumbnailPreview
            ) {
                URL.revokeObjectURL(
                    affiliatedThumbnailPreview
                );
            }
        };
    }, [
        thumbnailPreview,
        affiliatedThumbnailPreview,
    ]);

    // =========================
    // GENERATE CONTENT
    // =========================

    const handleGenerate = async () => {
        try {
            setLoading(true);

            setError("");
            setPublishMsg("");

            const token =
                localStorage.getItem(
                    "adminAccessToken"
                );

            if (!token) {
                navigate(
                    "/xxx-admin-login"
                );
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

            const data =
                res?.data?.data;

            setContent(data?.result);

            localStorage.setItem(
                "ai_blog",
                JSON.stringify(
                    data?.result
                )
            );

            const tokenData = {
                prompt:
                    data?.usage
                        ?.prompt_tokens || 0,

                completion:
                    data?.usage
                        ?.completion_tokens ||
                    0,

                total:
                    data?.usage
                        ?.total_tokens || 0,

                thoughts:
                    data?.usage
                        ?.thoughts_tokens ||
                    0,
            };

            setTokens(tokenData);

            localStorage.setItem(
                "ai_tokens",
                JSON.stringify(
                    tokenData
                )
            );

            pushToast(
                "Blog content generated successfully.",
                "success"
            );
        } catch (err) {
            const msg =
                err?.response?.data
                    ?.message ||
                "Generation failed";

            setError(msg);

            pushToast(
                msg,
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // HANDLE CONTENT EDIT
    // =========================

    const handleContentChange = (e) => {
        const val =
            e.target.value;

        setContent(val);

        localStorage.setItem(
            "ai_blog",
            JSON.stringify(val)
        );
    };

    // =========================
    // AFFILIATE LINK CHANGE
    // =========================

    const handleAffiliateChange = (
        e
    ) => {
        setAffiliatedLink(
            e.target.value
        );
    };

    // =========================
    // IMAGE SETTINGS
    // =========================

    const ALLOWED_TYPES = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];

    const MAX_SIZE_MB = 5;

    // =========================
    // MAIN THUMBNAIL VALIDATION
    // =========================

    const validateAndSetImage = (
        file
    ) => {
        setImageError("");

        if (!file) return;

        if (
            !ALLOWED_TYPES.includes(
                file.type
            )
        ) {
            setImageError(
                "শুধুমাত্র JPG, PNG বা WEBP ফরম্যাট গ্রহণযোগ্য।"
            );

            return;
        }

        if (
            file.size >
            MAX_SIZE_MB * 1024 * 1024
        ) {
            setImageError(
                `ছবির সাইজ ${MAX_SIZE_MB}MB এর কম হতে হবে।`
            );

            return;
        }

        if (thumbnailPreview) {
            URL.revokeObjectURL(
                thumbnailPreview
            );
        }

        setThumbnailFile(file);

        setThumbnailPreview(
            URL.createObjectURL(file)
        );
    };

    // =========================
    // AFFILIATE THUMBNAIL VALIDATION
    // =========================

    const validateAndSetAffiliateImage = (
        file
    ) => {
        setAffiliatedImageError("");

        if (!file) return;

        if (
            !ALLOWED_TYPES.includes(
                file.type
            )
        ) {
            setAffiliatedImageError(
                "শুধুমাত্র JPG, PNG বা WEBP ফরম্যাট গ্রহণযোগ্য।"
            );

            return;
        }

        if (
            file.size >
            MAX_SIZE_MB * 1024 * 1024
        ) {
            setAffiliatedImageError(
                `ছবির সাইজ ${MAX_SIZE_MB}MB এর কম হতে হবে।`
            );

            return;
        }

        if (
            affiliatedThumbnailPreview
        ) {
            URL.revokeObjectURL(
                affiliatedThumbnailPreview
            );
        }

        setAffiliatedThumbnailFile(
            file
        );

        setAffiliatedThumbnailPreview(
            URL.createObjectURL(file)
        );
    };

    // =========================
    // MAIN FILE INPUT
    // =========================

    const handleFileInputChange = (
        e
    ) => {
        const file =
            e.target.files?.[0];

        validateAndSetImage(file);

        e.target.value = "";
    };

    // =========================
    // AFFILIATE FILE INPUT
    // =========================

    const handleAffiliateFileInputChange = (
        e
    ) => {
        const file =
            e.target.files?.[0];

        validateAndSetAffiliateImage(
            file
        );

        e.target.value = "";
    };

    // =========================
    // MAIN DRAG & DROP
    // =========================

    const handleDrop = (e) => {
        e.preventDefault();

        setIsDragging(false);

        const file =
            e.dataTransfer.files?.[0];

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

    // =========================
    // REMOVE MAIN IMAGE
    // =========================

    const handleRemoveImage = () => {
        if (thumbnailPreview) {
            URL.revokeObjectURL(
                thumbnailPreview
            );
        }

        setThumbnailFile(null);
        setThumbnailPreview(null);
        setImageError("");
    };

    // =========================
    // REMOVE AFFILIATE IMAGE
    // =========================

    const handleRemoveAffiliateImage = () => {
        if (
            affiliatedThumbnailPreview
        ) {
            URL.revokeObjectURL(
                affiliatedThumbnailPreview
            );
        }

        setAffiliatedThumbnailFile(
            null
        );

        setAffiliatedThumbnailPreview(
            null
        );

        setAffiliatedImageError("");
    };

    // =========================
    // PUBLISH
    // =========================

    const handlePublish = async () => {
        if (!content) {
            setError(
                "No content to publish!"
            );

            pushToast(
                "No content to publish!",
                "error"
            );

            return;
        }

        // Main thumbnail required
        if (!thumbnailFile) {
            setImageError(
                "Thumbnail image is required."
            );

            pushToast(
                "Thumbnail image is required.",
                "error"
            );

            return;
        }

        try {
            setPublishing(true);

            setError("");
            setPublishMsg("");

            const token =
                localStorage.getItem(
                    "adminAccessToken"
                );

            if (!token) {
                navigate(
                    "/xxx-admin-login"
                );
                return;
            }

            // =========================
            // PARSE CONTENT
            // =========================

            let payload;

            if (
                typeof content ===
                "string"
            ) {
                const cleaned =
                    content
                        .replace(
                            /```json/g,
                            ""
                        )
                        .replace(
                            /```/g,
                            ""
                        )
                        .trim();

                payload =
                    JSON.parse(cleaned);
            } else {
                payload = content;
            }

            // =========================
            // VALIDATE REQUIRED FIELDS
            // =========================

            if (
                !payload?.meta?.title ||
                !payload?.meta?.slug ||
                !payload?.meta
                    ?.description
            ) {
                setError(
                    "Title, slug অথবা description missing."
                );

                pushToast(
                    "Title, slug অথবা description missing.",
                    "error"
                );

                return;
            }

            if (
                !payload?.category ||
                !payload?.topic ||
                !payload?.angle ||
                !payload?.intentGroup
            ) {
                setError(
                    "Category, topic, angle অথবা intentGroup missing."
                );

                pushToast(
                    "Category, topic, angle অথবা intentGroup missing.",
                    "error"
                );

                return;
            }

            // =========================
            // ADD AFFILIATE LINK
            // =========================

            payload.affiliatedLink =
                affiliatedLink.trim();

            // =========================
            // FORM DATA
            // =========================

            const formData =
                new FormData();

            // Blog JSON
            formData.append(
                "rawContent",
                JSON.stringify(
                    payload
                )
            );

            // Main thumbnail
            formData.append(
                "thumbnail",
                thumbnailFile
            );

            // Affiliate thumbnail
            if (
                affiliatedThumbnailFile
            ) {
                formData.append(
                    "affiliatedThumbnail",
                    affiliatedThumbnailFile
                );
            }

            // =========================
            // API REQUEST
            // =========================

            const res =
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/xxx-admin-publish`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            // =========================
            // SUCCESS
            // =========================

            if (
                res.data.success
            ) {
                setPublishMsg(
                    "✅ " +
                    res.data
                        .message
                );

                pushToast(
                    res.data
                        .message ||
                    "Blog published successfully.",
                    "success"
                );

                // =========================
                // CLEAR LOCAL STORAGE
                // =========================

                localStorage.removeItem(
                    "ai_blog"
                );

                localStorage.removeItem(
                    "ai_tokens"
                );

                localStorage.removeItem(
                    "ai_affiliated_link"
                );

                // =========================
                // CLEAR STATES
                // =========================

                setContent("");

                setAffiliatedLink("");

                handleRemoveImage();

                handleRemoveAffiliateImage();

                setTokens({
                    prompt: 0,
                    completion: 0,
                    total: 0,
                    thoughts: 0,
                });
            }
        } catch (err) {
            const msg =
                err?.response?.data
                    ?.message ||
                (err instanceof
                    SyntaxError
                    ? "Invalid JSON content"
                    : "Publish failed");

            setError(msg);

            pushToast(
                msg,
                "error"
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

        setAffiliatedLink("");

        setTokens({
            prompt: 0,
            completion: 0,
            total: 0,
            thoughts: 0,
        });

        handleRemoveImage();

        handleRemoveAffiliateImage();

        localStorage.removeItem(
            "ai_blog"
        );

        localStorage.removeItem(
            "ai_tokens"
        );

        localStorage.removeItem(
            "ai_affiliated_link"
        );
    };

    // =========================
    // LOGOUT
    // =========================

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/xxx-admin-logout`,
                {},
                {
                    withCredentials: true,
                }
            );
        } catch (err) {
            console.log(err);
        }

        localStorage.removeItem(
            "adminAccessToken"
        );

        localStorage.removeItem(
            "ai_blog"
        );

        localStorage.removeItem(
            "ai_tokens"
        );

        localStorage.removeItem(
            "ai_affiliated_link"
        );

        navigate(
            "/xxx-admin-login"
        );
    };

    // =========================
    // TOKEN COST
    // =========================

    const cost =
        (tokens.total / 1000) *
        0.0005;

    // =========================
    // DISPLAY CONTENT
    // =========================

    const displayContent =
        typeof content ===
            "object"
            ? JSON.stringify(
                content,
                null,
                2
            )
            : content;

    // =========================
    // RETURN
    // =========================

    return (
        <>
            {/* =========================
                TOAST
            ========================= */}

            <ToastContainer
                toasts={toasts}
                removeToast={
                    removeToast
                }
            />

            {/* =========================
                NAVBAR
            ========================= */}

            <Navbar>
                <button
                    onClick={
                        toggleTheme
                    }
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium transition"
                >
                    {darkMode
                        ? "☀️ Light"
                        : "🌙 Dark"}
                </button>

                <button
                    onClick={
                        handleLogout
                    }
                    className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                >
                    Logout
                </button>
            </Navbar>

            {/* =========================
                MAIN
            ========================= */}

            <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8">

                    {/* =====================================================
                        LEFT SIDE
                    ===================================================== */}

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-300">

                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                            Generate AI Blog
                        </h2>

                        {/* =========================
                            GENERATE BUTTON
                        ========================= */}

                        <button
                            onClick={
                                handleGenerate
                            }
                            disabled={
                                loading ||
                                publishing
                            }
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            )}

                            {loading
                                ? "Generating..."
                                : "Generate Blog"}
                        </button>

                        {/* =========================
                            AFFILIATE LINK
                        ========================= */}

                        <div className="mt-6">
                            <label
                                htmlFor="affiliateLink"
                                className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100"
                            >
                                Affiliate Product Link
                            </label>

                            <input
                                id="affiliateLink"
                                type="url"
                                value={
                                    affiliatedLink
                                }
                                onChange={
                                    handleAffiliateChange
                                }
                                placeholder="https://www.daraz.com.bd/..."
                                disabled={
                                    loading ||
                                    publishing
                                }
                                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 disabled:opacity-50"
                            />

                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Optional — Affiliate
                                product link থাকলে
                                এখানে paste করুন।
                            </p>
                        </div>

                        {/* =========================
                            ERROR
                        ========================= */}

                        {error && (
                            <div className="mt-5 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {/* =====================================================
                            MAIN THUMBNAIL
                        ===================================================== */}

                        <div className="mt-8">
                            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
                                Thumbnail Image
                            </h3>

                            {!thumbnailPreview ? (
                                <div
                                    onClick={() =>
                                        thumbnailInputRef.current?.click()
                                    }
                                    onDrop={
                                        handleDrop
                                    }
                                    onDragOver={
                                        handleDragOver
                                    }
                                    onDragLeave={
                                        handleDragLeave
                                    }
                                    className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-200 ${isDragging
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                        : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                                        }`}
                                >
                                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                                        ছবি এখানে ড্র্যাগ করুন
                                        অথবা ক্লিক করে
                                        বাছাই করুন
                                    </p>

                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                        JPG, PNG, WEBP —
                                        সর্বোচ্চ{" "}
                                        {
                                            MAX_SIZE_MB
                                        }{" "}
                                        MB
                                    </p>

                                    <input
                                        ref={
                                            thumbnailInputRef
                                        }
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={
                                            handleFileInputChange
                                        }
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <img
                                        src={
                                            thumbnailPreview
                                        }
                                        alt="Thumbnail preview"
                                        className="w-full h-56 object-cover"
                                    />

                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
                                        <button
                                            onClick={() =>
                                                thumbnailInputRef.current?.click()
                                            }
                                            className="px-4 py-2 rounded-lg bg-white/90 text-gray-900 text-sm font-semibold hover:bg-white"
                                        >
                                            Change
                                        </button>

                                        <button
                                            onClick={
                                                handleRemoveImage
                                            }
                                            className="px-4 py-2 rounded-lg bg-red-600/90 text-white text-sm font-semibold hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <input
                                        ref={
                                            thumbnailInputRef
                                        }
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={
                                            handleFileInputChange
                                        }
                                        className="hidden"
                                    />
                                </div>
                            )}

                            {imageError && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    {
                                        imageError
                                    }
                                </p>
                            )}
                        </div>

                        {/* =====================================================
                            AFFILIATE THUMBNAIL
                        ===================================================== */}

                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                    Affiliate Thumbnail
                                </h3>

                                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                                    Optional
                                </span>
                            </div>

                            {!affiliatedThumbnailPreview ? (
                                <div
                                    onClick={() =>
                                        affiliatedThumbnailInputRef.current?.click()
                                    }
                                    className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200"
                                >
                                    <div className="text-3xl mb-3">
                                        🛍️
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                                        Affiliate product
                                        image নির্বাচন করুন
                                    </p>

                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                        JPG, PNG, WEBP —
                                        সর্বোচ্চ{" "}
                                        {
                                            MAX_SIZE_MB
                                        }{" "}
                                        MB
                                    </p>

                                    <input
                                        ref={
                                            affiliatedThumbnailInputRef
                                        }
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={
                                            handleAffiliateFileInputChange
                                        }
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <img
                                        src={
                                            affiliatedThumbnailPreview
                                        }
                                        alt="Affiliate product preview"
                                        className="w-full h-56 object-cover"
                                    />

                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
                                        <button
                                            onClick={() =>
                                                affiliatedThumbnailInputRef.current?.click()
                                            }
                                            className="px-4 py-2 rounded-lg bg-white/90 text-gray-900 text-sm font-semibold hover:bg-white"
                                        >
                                            Change
                                        </button>

                                        <button
                                            onClick={
                                                handleRemoveAffiliateImage
                                            }
                                            className="px-4 py-2 rounded-lg bg-red-600/90 text-white text-sm font-semibold hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <input
                                        ref={
                                            affiliatedThumbnailInputRef
                                        }
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={
                                            handleAffiliateFileInputChange
                                        }
                                        className="hidden"
                                    />
                                </div>
                            )}

                            {affiliatedImageError && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    {
                                        affiliatedImageError
                                    }
                                </p>
                            )}

                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Daraz বা অন্য affiliate
                                product-এর image এখানে
                                দিতে পারেন।
                            </p>
                        </div>

                        {/* =====================================================
                            TOKEN USAGE
                        ===================================================== */}

                        <div className="mt-8 rounded-xl bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 p-5 transition-colors duration-300">
                            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
                                Token Usage
                            </h3>

                            <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                <div className="flex justify-between">
                                    <span>
                                        Prompt
                                    </span>

                                    <span>
                                        {
                                            tokens.prompt
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>
                                        Completion
                                    </span>

                                    <span>
                                        {
                                            tokens.completion
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>
                                        Thoughts
                                    </span>

                                    <span>
                                        {
                                            tokens.thoughts
                                        }
                                    </span>
                                </div>

                                <hr className="dark:border-gray-700" />

                                <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100">
                                    <span>
                                        Total Tokens
                                    </span>

                                    <span>
                                        {
                                            tokens.total
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
                                    <span>
                                        Estimated Cost
                                    </span>

                                    <span>
                                        $
                                        {cost.toFixed(
                                            5
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        RIGHT SIDE
                    ===================================================== */}

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-300">
                        <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
                            Generated Content
                        </h2>

                        <textarea
                            value={
                                displayContent
                            }
                            onChange={
                                handleContentChange
                            }
                            placeholder="No content generated..."
                            className="w-full h-[550px] rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm transition-colors duration-300"
                        />

                        {/* =========================
                            PUBLISH MESSAGE
                        ========================= */}

                        {publishMsg && (
                            <div className="mt-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 text-green-700 dark:text-green-400">
                                {
                                    publishMsg
                                }
                            </div>
                        )}

                        {/* =========================
                            ACTION BUTTONS
                        ========================= */}

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                onClick={
                                    handleClear
                                }
                                className="py-3 rounded-xl bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold transition"
                            >
                                Clear
                            </button>

                            <button
                                onClick={
                                    handlePublish
                                }
                                disabled={
                                    publishing ||
                                    loading ||
                                    !content
                                }
                                className="py-3 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {publishing && (
                                    <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                )}

                                {publishing
                                    ? "Publishing..."
                                    : "Publish Blog"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDash;

