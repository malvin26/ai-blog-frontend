

import { Link } from "react-router";
import {
    MapPin,
    Mail,
    Heart,
    Phone,
    ExternalLink,
    ShieldCheck,
    Copy,
    Check,
} from "lucide-react";

import { FaYoutube, FaFacebook } from "react-icons/fa";

import { useState } from "react";

import AdBox from "./AdBox";
import brandImage from "/image/brand_logo.png";


const Footer = () => {

    const [copied, setCopied] = useState("");

    // Payment Number
    const paymentNumber = "01617370355";

    // Social Media Links
    const socialLinks = [
        {
            name: "YouTube Channel",
            url: "https://www.youtube.com/@WaqiaSobjiGhor",
            icon: FaYoutube,
            color: "text-red-500",
            hover: "hover:text-red-400",
        },
        {
            name: "Facebook Profile",
            url: "https://web.facebook.com/rhRonyHossen01",
            icon: FaFacebook,
            color: "text-blue-500",
            hover: "hover:text-blue-400",
        },
    ];

    // Website Policies
    const policies = [
        { name: "About Us", path: "/about-us" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Ad Policy", path: "/ad-policy" },
        { name: "Terms of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    // Payment Methods
    const paymentMethods = [
        {
            name: "bKash",
            color: "text-pink-400",
            hover: "hover:border-pink-500",
        },
        {
            name: "Nagad",
            color: "text-orange-400",
            hover: "hover:border-orange-500",
        },
        {
            name: "Rocket",
            color: "text-purple-400",
            hover: "hover:border-purple-500",
        },
    ];

    // Copy Payment Number
    const handleCopy = async (service) => {
        try {
            await navigator.clipboard.writeText(paymentNumber);
            setCopied(service);

            setTimeout(() => {
                setCopied((current) =>
                    current === service ? "" : current
                );
            }, 2000);

        } catch (error) {
            console.error("Unable to copy payment number:", error);
        }
    };


    return (

        <footer className="bg-gray-950 text-gray-200 mt-10">

            {/* FOOTER ADVERTISEMENT */}
            <div className="max-w-7xl mx-auto px-4 pt-6">

                <AdBox
                    size="banner"
                    position="footer"
                    isAdEnabled={true}
                />

            </div>


            {/* MAIN FOOTER CONTENT */}
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-9 lg:gap-8">


                    {/* BRAND SECTION */}
                    <div className="flex flex-col items-center sm:items-start">

                        <Link to="/" aria-label="FastBlog Home">

                            <img
                                src={brandImage}
                                alt="FastBlog Logo"
                                className="w-40 sm:w-44 md:w-48 h-auto object-contain"
                                loading="lazy"
                            />

                        </Link>

                        <p className="text-gray-400 text-sm leading-7 mt-4 text-center sm:text-left">

                            FastBlog is your trusted source for technology,
                            Artificial Intelligence, business, education,
                            productivity, lifestyle and more.

                        </p>

                        <p className="text-gray-500 text-xs mt-4">

                            Learn. Explore. Grow with FastBlog.

                        </p>

                    </div>


                    {/* ABOUT SECTION */}
                    <div>

                        <h3 className="text-white font-bold text-base mb-4">

                            About FastBlog

                        </h3>

                        <p className="text-gray-400 text-sm leading-7">

                            FastBlog is an information platform dedicated
                            to delivering high-quality, accurate and
                            easy-to-understand articles.

                            Our mission is to help readers stay informed
                            about the latest technology and AI trends.

                        </p>

                    </div>


                    {/* CONTACT & SOCIAL SECTION */}
                    <div>

                        <h3 className="text-white font-bold text-base mb-4">

                            Contact Us

                        </h3>


                        <div className="space-y-4">

                            {/* EMAIL */}
                            <a
                                href="mailto:malvinjack26@gmail.com"
                                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition min-w-0"
                            >

                                <Mail
                                    size={18}
                                    className="text-blue-400 shrink-0"
                                />

                                <span className="text-sm break-all">

                                    malvinjack26@gmail.com

                                </span>

                            </a>


                            {/* LOCATION */}
                            <a
                                href="https://maps.app.goo.gl/mL7786j8Snisdk6k8"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View FastBlog location on Google Maps"
                                className="flex items-start gap-3 text-gray-400 hover:text-blue-400 transition"
                            >

                                <MapPin
                                    size={19}
                                    className="text-red-400 shrink-0"
                                />

                                <span className="text-sm">

                                    Savar, Bangladesh

                                    <span className="block text-xs text-blue-400 mt-1">

                                        View on Google Maps

                                    </span>

                                </span>

                                <ExternalLink
                                    size={13}
                                    className="shrink-0 mt-1"
                                />

                            </a>

                        </div>


                        {/* SOCIAL MEDIA */}
                        <div className="mt-7">

                            <h3 className="text-white font-bold text-base mb-4">

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
                                            aria-label={social.name}
                                            className={`flex items-center gap-3 text-gray-400 ${social.hover} transition`}
                                        >

                                            <Icon
                                                size={21}
                                                className={`${social.color} shrink-0`}
                                                aria-hidden="true"
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


                    {/* POLICIES SECTION */}
                    <div>

                        <h3 className="text-white font-bold text-base mb-4">

                            Important Links

                        </h3>

                        <ul className="space-y-3">

                            {policies.map((item) => (

                                <li key={item.path}>

                                    <Link
                                        to={item.path}
                                        className="text-gray-400 text-sm hover:text-blue-400 hover:translate-x-1 inline-block transition-all"
                                    >

                                        {item.name}

                                    </Link>

                                </li>

                            ))}

                        </ul>

                    </div>


                    {/* DONATION SECTION */}
                    <div>

                        <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">

                            <Heart
                                size={18}
                                className="text-pink-500"
                            />

                            Support / Donate

                        </h3>


                        <p className="text-gray-400 text-sm leading-6 mb-4">

                            Support FastBlog to help us maintain,
                            improve and develop our website.

                        </p>


                        {/* PAYMENT CARD */}
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-4">

                            {paymentMethods.map((method) => (

                                <div
                                    key={method.name}
                                    className={`border border-gray-800 rounded-lg p-3 transition ${method.hover}`}
                                >

                                    <div className="flex items-center justify-between gap-2">

                                        <div className="min-w-0">

                                            <p className={`font-bold text-sm ${method.color}`}>

                                                {method.name}

                                            </p>

                                            <p className="text-white font-semibold text-sm mt-1">

                                                {paymentNumber}

                                            </p>

                                        </div>


                                        {/* COPY BUTTON */}
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(method.name)}
                                            aria-label={`Copy ${method.name} payment number`}
                                            title={`Copy ${method.name} number`}
                                            className="flex items-center justify-center gap-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg px-2 py-2 text-xs transition shrink-0"
                                        >

                                            {copied === method.name ? (

                                                <>
                                                    <Check size={15} />
                                                    Copied
                                                </>

                                            ) : (

                                                <>
                                                    <Copy size={15} />
                                                    Copy
                                                </>

                                            )}

                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>


                        <p className="text-gray-500 text-xs leading-5 mt-3">

                            Please support us for website maintenance
                            and development.

                        </p>

                        <p className="text-yellow-500 text-xs mt-2">

                            Personal number – No phone calls.

                        </p>

                    </div>

                </div>

            </div>


            {/* TRUST SECTION */}
            <div className="border-t border-gray-800">

                <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">

                    <ShieldCheck
                        size={17}
                        className="text-green-400 shrink-0"
                    />

                    <p className="text-gray-500 text-xs leading-5">

                        Thank you for supporting FastBlog.
                        Your support helps us grow.

                    </p>

                </div>

            </div>


            {/* COPYRIGHT */}
            <div className="border-t border-gray-800 bg-black/30">

                <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-gray-500 text-xs text-center">

                        © {new Date().getFullYear()}{" "}

                        <Link
                            to="/"
                            className="text-blue-400 font-semibold hover:text-blue-300 transition"
                        >

                            FastBlog

                        </Link>

                        . All rights reserved.

                    </p>


                    <p className="text-gray-500 text-xs text-center">

                        Made with{" "}

                        <Heart
                            size={12}
                            className="inline text-red-500"
                            fill="currentColor"
                        />

                        {" "}for readers worldwide.

                    </p>

                </div>

            </div>

        </footer>

    );

};

export default Footer;
