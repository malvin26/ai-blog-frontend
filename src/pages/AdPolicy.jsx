import { Link } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const AdPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          <h1 className="text-4xl font-bold mb-6">
            Ad Policy
          </h1>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            This website uses Google AdSense and other advertising networks to
            display advertisements to visitors.
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            Artificially clicking advertisements, using bots, automated traffic,
            or attempting to manipulate ad impressions is strictly prohibited.
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            Advertisements may be personalized using cookies and other
            technologies based on your browsing behavior and interests.
          </p>

          <p className="mb-8 leading-8 text-gray-700 dark:text-gray-300">
            We are not responsible for the content, products, or services
            provided by third-party advertisers or external websites.
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
              to="/terms"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Terms of Service
            </Link>

            <Link
              to="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default AdPolicy;