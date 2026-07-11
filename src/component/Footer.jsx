import { Link } from "react-router";
import AdBox from "./AdBox";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 mt-10">

            {/* FOOTER AD */}
            <div className="p-4">
                <AdBox
                    size="banner"
                    position="footer"
                    isAdEnabled={false}
                />
            </div>

            {/* FOOTER CONTENT */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 p-6 text-sm">

                {/* About */}
                <div>
                    <h3 className="font-bold mb-2">
                        About Us
                    </h3>

                    <p>
                        We publish informative articles covering
                        technology, education, business,
                        lifestyle and other topics. Some content
                        may be assisted by AI tools and reviewed
                        before publication.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold mb-2">
                        Contact
                    </h3>

                    <p>Email: support@yourwebsite.com</p>
                    <p>Location: Bangladesh</p>
                </div>

                {/* Policies */}
                <div>
                    <h3 className="font-bold mb-2">
                        Policies
                    </h3>

                    <ul className="space-y-1">

                        <li>
                            <Link
                                to="/privacy-policy"
                                className="text-blue-400 hover:underline"
                            >
                                Privacy Policy
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/ad-policy"
                                className="text-blue-400 hover:underline"
                            >
                                Ad Policy
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/terms"
                                className="text-blue-400 hover:underline"
                            >
                                Terms of Use
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contact"
                                className="text-blue-400 hover:underline"
                            >
                                Contact Us
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Donate */}
                <div>
                    <h3 className="font-bold mb-2">
                        Support / Donate
                    </h3>

                    <p className="text-pink-400 font-semibold">
                        bKash: 01741416807 (WhatsApp)
                    </p>

                    <p className="text-xs mt-2 text-gray-400">
                        Please donate for website management
                        (personal number, no phone calls)
                    </p>
                </div>

            </div>

            {/* COPYRIGHT */}
            <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-700">
                © {new Date().getFullYear()} Your Website.
                All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;