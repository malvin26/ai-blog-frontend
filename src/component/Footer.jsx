
import { Link } from "react-router";
import { MapPin, Mail, Map } from "lucide-react";
import AdBox from "./AdBox";
import brandImage from "/image/brand_logo.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 mt-10">

            {/* FOOTER AD */}
            <div className="p-4">
                <AdBox
                    size="banner"
                    position="footer"
                    isAdEnabled={true}
                />
            </div>

            {/* FOOTER CONTENT */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-7 p-6 text-sm">

                {/* BRAND */}
                <div className="flex items-center justify-center md:justify-start">
                    <Link to="/">
                        <img
                            src={brandImage}
                            alt="FastBlog"
                            className="w-40 sm:w-48 md:w-52 lg:w-60 h-auto object-contain"
                            loading="lazy"
                        />
                    </Link>
                </div>

                {/* ABOUT */}
                <div>
                    <h3 className="font-bold mb-2">
                        About FastBlog
                    </h3>

                    <p className="text-gray-400 leading-6">
                        <strong>FastBlog</strong> is your trusted source for insightful and
                        up-to-date content on technology, AI, business, education,
                        productivity, lifestyle, and more. Our mission is to deliver
                        high-quality, accurate, and easy-to-understand articles that help
                        readers stay informed and grow every day.
                    </p>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="font-bold mb-3">
                        Contact
                    </h3>

                    <p className="flex items-center gap-2 mb-3">
                        <Mail size={16} className="text-blue-400 shrink-0" />
                        <a
                            href="mailto:malvinjack26@gmail.com"
                            className="hover:text-blue-400 transition"
                        >
                            malvinjack26@gmail.com
                        </a>
                    </p>

                    <a
                        href="https://maps.app.goo.gl/mL7786j8Snisdk6k8"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View FastBlog location on Google Maps"
                        className="flex items-start gap-2 text-gray-300 hover:text-blue-400 transition"
                    >
                        <MapPin
                            size={17}
                            className="text-red-400 shrink-0 mt-0.5"
                        />
                        <span>
                            Savar, Bangladesh
                            <span className="block text-xs text-blue-400 mt-1">
                                View on Google Maps →
                            </span>
                        </span>
                    </a>
                </div>

                {/* POLICIES */}
                <div>
                    <h3 className="font-bold mb-2">
                        Policies
                    </h3>

                    <ul className="space-y-1">
                        <li><Link to="/about-us" className="text-blue-400 hover:underline">About Us</Link></li>
                        <li><Link to="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link></li>
                        <li><Link to="/ad-policy" className="text-blue-400 hover:underline">Ad Policy</Link></li>
                        <li><Link to="/terms" className="text-blue-400 hover:underline">Terms of Use</Link></li>
                        <li><Link to="/contact" className="text-blue-400 hover:underline">Contact Us</Link></li>
                    </ul>
                </div>

                {/* DONATE */}
                <div>
                    <h3 className="font-bold mb-2">
                        Support / Donate
                    </h3>

                    <p className="text-pink-400 font-semibold">
                        bKash: 01617370355 (WhatsApp)
                    </p>

                    <p className="text-xs mt-2 text-gray-400">
                        Please donate for website management
                        (personal number, no phone calls)
                    </p>
                </div>

            </div>

            {/* COPYRIGHT */}
            <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-700">
                © {new Date().getFullYear()} FastBlog.
                All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;
