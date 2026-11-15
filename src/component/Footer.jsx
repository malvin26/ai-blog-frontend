

import { useState } from "react";
import { Link } from "react-router";

import {
    MapPin,
    Mail,
    Heart,
    ExternalLink,
    ShieldCheck,
    Copy,
    Check,
} from "lucide-react";

import { FaYoutube, FaFacebook } from "react-icons/fa";

import brandImage from "/image/brand_logo.png";

const Footer = () => {
    const [copied, setCopied] = useState(false);

    const paymentNumber = "01617370355";

    // Payment methods loop
    const paymentMethods = [
        {
            name: "bKash",
            color: "text-pink-400",
            bg: "bg-pink-500/10",
            border: "border-pink-500/30",
        },
        {
            name: "Nagad",
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/30",
        },
        {
            name: "Rocket",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/30",
        },
    ];

    const socialLinks = [
        {
            name: "YouTube Channel",
            url: "https://www.youtube.com/@WaqiaSobjiGhor",
            icon: FaYoutube,
            color: "text-red-500",
        },
        {
            name: "Facebook Profile",
            url: "https://web.facebook.com/rhRonyHossen01",
            icon: FaFacebook,
            color: "text-blue-500",
        },
    ];

    const policies = [
        { name: "About Us", path: "/about-us" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Ad Policy", path: "/ad-policy" },
        { name: "Terms of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    // Copy payment number
    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(paymentNumber);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = paymentNumber;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";

                document.body.appendChild(textarea);
                textarea.select();

                const success = document.execCommand("copy");
                document.body.removeChild(textarea);

                if (!success) throw new Error("Copy failed");
            }

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {
            console.error("Copy failed:", error);
            setCopied(false);
        }
    };

    return (
        <footer className="mt-10 w-full overflow-hidden bg-gray-900 text-gray-300">

            {/* MAIN FOOTER */}
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

                <div className="
                    grid grid-cols-1 gap-x-8 gap-y-10
                    sm:grid-cols-2
                    lg:grid-cols-6
                    xl:grid-cols-12
                ">

                    {/* BRAND SECTION */}
                    <div className="min-w-0 sm:col-span-1 lg:col-span-2 xl:col-span-2">

                        <Link
                            to="/"
                            aria-label="FastBlog Home"
                            className="inline-block w-full sm:w-auto"
                        >
                            <img
                                src={brandImage}
                                alt="FastBlog Logo"
                                loading="lazy"
                                className="mx-auto h-auto w-40 object-contain sm:mx-0 sm:w-44"
                            />
                        </Link>

                        <p className="mt-5 text-center text-sm leading-7 text-gray-400 sm:text-left">
                            FastBlog is your trusted source for technology,
                            Artificial Intelligence, business, education,
                            productivity, lifestyle and more.
                        </p>

                        <p className="mt-4 text-xs leading-6 text-gray-500">
                            Learn. Explore. Grow with FastBlog.
                        </p>

                    </div>

                    {/* ABOUT SECTION */}
                    <div className="min-w-0 lg:col-span-2 xl:col-span-2">

                        <h3 className="mb-5 text-base font-bold text-white">
                            About FastBlog
                        </h3>

                        <p className="text-sm leading-7 text-gray-400">
                            FastBlog is an information platform dedicated
                            to delivering high-quality, accurate and
                            easy-to-understand articles.

                            Our mission is to help readers stay informed
                            about the latest technology and AI trends.
                        </p>

                    </div>

                    {/* CONTACT & SOCIAL SECTION */}
                    <div className="min-w-0 lg:col-span-2 xl:col-span-3">

                        <h3 className="mb-5 text-base font-bold text-white">
                            Contact Us
                        </h3>

                        <div className="space-y-4">

                            {/* EMAIL */}
                            <a
                                href="mailto:malvinjack26@gmail.com"
                                className="
                                    flex min-w-0 items-center gap-2
                                    text-gray-400 transition
                                    hover:text-white
                                "
                            >
                                <Mail
                                    size={18}
                                    className="shrink-0 text-blue-400"
                                />

                                <span className="
                                    whitespace-nowrap
                                    text-[13px] sm:text-sm
                                ">
                                    malvinjack26@gmail.com
                                </span>
                            </a>

                            {/* LOCATION */}
                            <a
                                href="https://maps.app.goo.gl/mL7786j8Snisdk6k8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex min-w-0 items-start gap-3 text-gray-400 transition hover:text-white"
                            >
                                <MapPin
                                    size={19}
                                    className="mt-0.5 shrink-0 text-red-400"
                                />

                                <span className="min-w-0 text-sm">
                                    Savar, Bangladesh

                                    <span className="mt-1 block text-xs text-blue-400">
                                        View on Google Maps
                                    </span>
                                </span>

                                <ExternalLink
                                    size={13}
                                    className="mt-1 shrink-0"
                                />
                            </a>

                        </div>

                        {/* SOCIAL MEDIA */}
                        <div className="mt-7">

                            <h3 className="mb-4 text-base font-bold text-white">
                                Follow Us
                            </h3>

                            <div className="space-y-4">

                                {socialLinks.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-gray-400 transition hover:text-white"
                                        >
                                            <Icon
                                                size={21}
                                                className={`shrink-0 ${social.color}`}
                                            />

                                            <span className="text-sm">
                                                {social.name}
                                            </span>
                                        </a>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                    {/* IMPORTANT LINKS */}
                    <div className="min-w-0 lg:col-span-2 xl:col-span-2">

                        <h3 className="mb-5 text-base font-bold text-white">
                            Important Links
                        </h3>

                        <ul className="space-y-4">

                            {policies.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="
                                            inline-block text-sm
                                            text-gray-400
                                            transition-all duration-200
                                            hover:translate-x-1
                                            hover:text-blue-400
                                        "
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* SUPPORT / DONATION */}
                    <div className="min-w-0 lg:col-span-2 xl:col-span-3">

                        <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-white">

                            <Heart
                                size={19}
                                className="shrink-0 text-pink-500"
                            />

                            Support / Donate

                        </h3>

                        <p className="mb-5 text-sm leading-6 text-gray-400">
                            Support FastBlog to help us maintain,
                            improve and develop our website.
                        </p>

                        {/* PAYMENT CARD */}
                        <div className="
                            w-full min-w-0 rounded-xl
                            border border-gray-700
                            bg-gray-800/70 p-4
                        ">

                            {/* PAYMENT METHODS LOOP */}
                            <div className="grid grid-cols-3 gap-2">

                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.name}
                                        className={`
                                            flex min-w-0 items-center
                                            justify-center rounded-lg
                                            border ${method.border}
                                            ${method.bg}
                                            px-1 py-2.5
                                        `}
                                    >
                                        <span className={`
                                            text-xs font-bold sm:text-sm
                                            ${method.color}
                                        `}>
                                            {method.name}
                                        </span>
                                    </div>
                                ))}

                            </div>

                            {/* SINGLE PAYMENT NUMBER BOX */}
                            <div className="
                                mt-4 flex min-w-0 items-center
                                justify-between gap-2
                                rounded-lg border border-gray-700
                                bg-gray-900/80 p-3 sm:p-4
                            ">

                                <div className="min-w-0">

                                    <p className="mb-1 text-xs text-gray-400">
                                        Payment Number
                                    </p>

                                    <p className="
                                        whitespace-nowrap
                                        text-base font-bold
                                        tracking-wider text-white
                                        sm:text-lg
                                    ">
                                        {paymentNumber}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    aria-label="Copy payment number"
                                    className={`
                                        flex min-h-10 shrink-0
                                        items-center justify-center
                                        gap-1.5 rounded-lg px-3
                                        text-xs font-semibold
                                        transition duration-200
                                        active:scale-95
                                        ${copied
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                        }
                                    `}
                                >

                                    {copied ? (
                                        <>
                                            <Check size={14} />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            Copy
                                        </>
                                    )}

                                </button>

                            </div>

                            <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                                Send your support through any of the
                                payment methods above.
                            </p>

                        </div>

                        <p className="mt-4 text-xs font-medium text-yellow-400">
                            Personal number – No phone calls.
                        </p>

                    </div>

                </div>

            </div>

            {/* TRUST SECTION */}
            <div className="border-t border-gray-800">

                <div className="
                    mx-auto flex max-w-7xl
                    flex-col items-center justify-center
                    gap-3 px-5 py-5 text-center
                    sm:flex-row
                ">

                    <ShieldCheck
                        size={17}
                        className="shrink-0 text-green-400"
                    />

                    <p className="text-xs leading-5 text-gray-500">
                        Thank you for supporting FastBlog.
                        Your support helps us grow.
                    </p>

                </div>

            </div>

            {/* COPYRIGHT SECTION */}
            <div className="border-t border-gray-800 bg-gray-950/40">

                <div className="
                    mx-auto flex max-w-7xl
                    flex-col items-center justify-between
                    gap-3 px-5 py-5
                    sm:flex-row
                ">

                    <p className="text-center text-xs text-gray-500">

                        © {new Date().getFullYear()}{" "}

                        <Link
                            to="/"
                            className="font-semibold text-blue-400 transition hover:text-blue-300"
                        >
                            FastBlog
                        </Link>

                        . All rights reserved.

                    </p>

                    <p className="flex items-center gap-1 text-center text-xs text-gray-500">

                        Made with

                        <Heart
                            size={12}
                            fill="currentColor"
                            className="text-red-500"
                        />

                        for readers worldwide.

                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
