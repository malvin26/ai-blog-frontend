import { Link } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          <h1 className="text-4xl font-bold mb-6">
            Terms of Service
          </h1>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            By accessing and using this website, you agree to comply with these
            Terms of Service and all applicable laws and regulations.
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            Some content on this website may be generated or assisted by
            Artificial Intelligence (AI). While we strive for accuracy, we do
            not guarantee that all information is complete, current, or free
            from errors.
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            You agree not to misuse this website, attempt unauthorized access,
            distribute harmful content, or engage in activities that could
            disrupt the service.
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            We reserve the right to modify, update, or remove any content,
            features, or services at any time without prior notice.
          </p>

          <p className="mb-8 leading-8 text-gray-700 dark:text-gray-300">
            Continued use of this website after changes are published
            constitutes your acceptance of the updated Terms of Service.
          </p>

          <hr className="border-gray-200 dark:border-gray-700 mb-6" />

          <h2 className="text-xl font-semibold mb-4">
            Related Pages
          </h2>

          <div className="flex flex-col gap-3">

            <Link
              to="/privacy-policy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
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

export default TermsOfService;