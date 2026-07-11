import { Link } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          <h1 className="text-4xl font-bold mb-6">
            Privacy Policy
          </h1>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            Your privacy is important to us. This website uses cookies and
            third-party services, including Google AdSense, to display
            advertisements and improve your browsing experience.
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            We do not sell, rent, or share your personal information with
            third parties except where required by law or necessary to provide
            our services.
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            Google and its partners may use cookies to display personalized ads
            based on your browsing history and interests. You can control
            cookie settings through your browser preferences.
          </p>

          <p className="mb-8 leading-8 text-gray-700 dark:text-gray-300">
            By continuing to use this website, you agree to our use of cookies
            and data processing practices as described in this Privacy Policy.
          </p>

          <hr className="border-gray-200 dark:border-gray-700 mb-6" />

          <h2 className="text-xl font-semibold mb-4">
            Related Pages
          </h2>

          <div className="flex flex-col gap-3">

            <Link
              to="/terms"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Terms of Service
            </Link>

            <Link
              to="/ad-policy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ad Policy
            </Link>

            <Link
              to="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact Us
            </Link>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default PrivacyPolicy;