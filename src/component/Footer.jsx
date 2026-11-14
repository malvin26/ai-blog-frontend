


import { Link } from "react-router";
import {
    MapPin,
    Mail,
    Youtube,
    Facebook,
    Heart,
    Phone,
    ExternalLink,
    ShieldCheck,
} from "lucide-react";

import AdBox from "./AdBox";
import brandImage from "/image/brand_logo.png";

const Footer = () => {
    const paymentNumber = "01617370355";

    const socialLinks = [
        {
            name: "YouTube Channel",
            url: "https://www.youtube.com/@WaqiaSobjiGhor",
            icon: Youtube,
            color: "text-red-500",
            hover: "hover:text-red-400",
        },
        {
            name: "Facebook Profile",
            url: "https://web.facebook.com/rhRonyHossen01",
            icon: Facebook,
            color: "text-blue-500",
            hover: "hover:text-blue-400",
        },
    ];

    const policies = [
        { name: "About Us", path: "/about-us" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Ad Policy", path: "/ad-policy" },
        { name: "Terms of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <footer className="bg-gray-950 text-gray-200 mt-10">

            {/* FOOTER AD */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
                <AdBox
                    size="banner"
                    position="footer"
                    isAdEnabled={true}
                />
            </div>

            {/* MAIN FOOTER */}
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

                        <p className="text-gray-400 text-sm leading-6 mt-4 text-center sm:text-left">
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

                    {/* CONTACT SECTION */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4">
                            Contact Us
                        </h3>

                        <div className="space-y-4">

                            {/* EMAIL */}
                            <a
                                href="mailto:malvinjack26@gmail.com"
                                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition break-all"
                            >
                                <Mail
                                    size={18}
                                    className="text-blue-400 shrink-0"
                                />
                                <span className="text-sm">
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

                            <div className="space-y-3">

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
                                                size={20}
                                                className={`${social.color} shrink-0`}
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

                    {/* DONATE SECTION */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                            <Heart
                                size={18}
                                className="text-pink-500"
                            />
                            Support / Donate
                        </h3>

                        <p className="text-gray-400 text-sm leading-6 mb-4">
                            Support FastBlog to help us maintain and
                            improve our website.
                        </p>

                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-4">

                            {/* BKASH */}
                            <div>
                                <p className="text-pink-400 font-bold text-sm mb-1">
                                    bKash
                                </p>

                                <a
                                    href={`tel:${paymentNumber}`}
                                    className="flex items-center gap-2 text-white font-semibold text-sm hover:text-pink-400 transition"
                                >
                                    <Phone size={14} />
                                    {paymentNumber}
                                </a>
                            </div>

                            <div className="border-t border-gray-800" />

                            {/* NAGAD */}
                            <div>
                                <p className="text-orange-400 font-bold text-sm mb-1">
                                    Nagad
                                </p>

                                <a
                                    href={`tel:${paymentNumber}`}
                                    className="flex items-center gap-2 text-white font-semibold text-sm hover:text-orange-400 transition"
                                >
                                    <Phone size={14} />
                                    {paymentNumber}
                                </a>
                            </div>

                            <div className="border-t border-gray-800" />

                            {/* ROCKET */}
                            <div>
                                <p className="text-purple-400 font-bold text-sm mb-1">
                                    Rocket
                                </p>

                                <a
                                    href={`tel:${paymentNumber}`}
                                    className="flex items-center gap-2 text-white font-semibold text-sm hover:text-purple-400 transition"
                                >
                                    <Phone size={14} />
                                    {paymentNumber}
                                </a>
                            </div>

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
                <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">

                    <ShieldCheck
                        size={16}
                        className="text-green-400"
                    />

                    <p className="text-gray-500 text-xs">
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
                            className="text-blue-400 font-semibold hover:text-blue-300"
                        >
                            FastBlog
                        </Link>
                        . All rights reserved.
                    </p>

                    <p className="text-gray-500 text-xs">
                        Made with <Heart
                            size={12}
                            className="inline text-red-500"
                        /> for readers worldwide.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;


