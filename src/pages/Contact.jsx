import { Link } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">
            Contact Us
          </h1>

          <p className="mb-8 leading-8 text-gray-700 dark:text-gray-300">
            If you have any questions, suggestions, business inquiries, or
            partnership opportunities, feel free to contact us. We'll do our
            best to respond as soon as possible.
          </p>

          {/* Contact Card */}
          <div className="space-y-5">

            {/* Email */}
            <div className="rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">

              <h3 className="text-lg font-semibold">
                📧 Email
              </h3>

              <p className="mt-2 text-gray-700 dark:text-gray-300">
                support@yourwebsite.com
              </p>

            </div>

            {/* Location */}
            <div className="rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">

              <h3 className="text-lg font-semibold">
                📍 Location
              </h3>

              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Bangladesh
              </p>

            </div>

            {/* bKash */}
            <div className="rounded-xl border border-pink-300 dark:border-pink-700 bg-pink-50 dark:bg-pink-900/20 p-6">

              <h3 className="flex items-center gap-2 text-xl font-bold text-pink-600 dark:text-pink-400">
                💳 bKash Send Money
              </h3>

              <p className="mt-3 text-3xl font-bold tracking-wider text-pink-700 dark:text-pink-300">
                01741416807
              </p>

              <p className="mt-2 text-sm text-pink-600 dark:text-pink-400">
                Personal Number (Please do not call)
              </p>

            </div>

          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          {/* Related Pages */}
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
              to="/ad-policy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ad Policy
            </Link>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Contact;