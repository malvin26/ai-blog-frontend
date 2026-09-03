
import { Link } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Facebook, Youtube, MessageCircle } from "react-icons";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          {/* About Us */}
          <h1 className="text-4xl font-bold mb-6">
            আমাদের সম্পর্কে
          </h1>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            <strong>FastBlog</strong> হলো প্রযুক্তি, আর্টিফিশিয়াল ইন্টেলিজেন্স,
            ব্যবসা, শিক্ষা, প্রোডাক্টিভিটি ও লাইফস্টাইল নিয়ে বিশ্বাসযোগ্য এবং
            হালনাগাদ কনটেন্টের একটি নির্ভরযোগ্য বাংলা প্ল্যাটফর্ম। আমাদের লক্ষ্য
            হলো পাঠকদের জন্য মানসম্মত, নির্ভুল এবং সহজবোধ্য আর্টিকেল তৈরি করা,
            যা তাদের প্রতিদিন কিছু নতুন শেখা ও আপডেটেড থাকতে সাহায্য করে।
          </p>

          <p className="mb-5 leading-8 text-gray-700 dark:text-gray-300">
            আমরা বিশ্বাস করি, সঠিক তথ্য এবং সহজ ভাষায় লেখা কনটেন্ট যে কাউকে
            নতুন কিছু জানতে এবং নিজের দক্ষতা বাড়াতে সাহায্য করে। এই চিন্তা থেকেই
            FastBlog-এর যাত্রা শুরু, যেখানে প্রতিটি লেখা পাঠকের কথা মাথায় রেখে
            তৈরি করা হয়।
          </p>

          <p className="mb-8 leading-8 text-gray-700 dark:text-gray-300">
            আমাদের সাথে থাকার জন্য ধন্যবাদ। আপনার যেকোনো মতামত বা পরামর্শ
            আমাদের কাছে গুরুত্বপূর্ণ, কারণ আপনাদের সহযোগিতাই আমাদের এগিয়ে যাওয়ার
            মূল শক্তি।
          </p>

          <hr className="border-gray-200 dark:border-gray-700 mb-6" />

          {/* Related Pages */}
          <h2 className="text-xl font-semibold mb-4">
            সংশ্লিষ্ট পেজ
          </h2>

          <div className="flex flex-col gap-3 mb-8">

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

          <hr className="border-gray-200 dark:border-gray-700 mb-6" />

          {/* Support / Donate Section */}
          <div className="mb-8 rounded-xl border border-pink-200 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-950/20 p-6">

            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              💖 সাপোর্ট / ডোনেট করুন
            </h2>

            <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
              FastBlog সম্পূর্ণভাবে একজন ব্যক্তির প্রচেষ্টায় পরিচালিত হয়।
              ওয়েবসাইট চালু রাখা, নতুন কনটেন্ট তৈরি করা এবং সার্ভার খরচ বহন করার
              জন্য আপনার সামান্য সহযোগিতা আমাদের জন্য অনেক বড় অনুপ্রেরণা হতে
              পারে। আপনি চাইলে নিচের bKash নাম্বারে ডোনেট করতে পারেন।
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-3">

              <span className="inline-flex items-center rounded-lg bg-pink-600 text-white text-sm font-semibold px-3 py-1.5">
                bKash
              </span>

              <span className="text-lg font-bold tracking-wide">
                01741416807
              </span>

            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-6">

              এটি একটি ব্যক্তিগত নাম্বার — ওয়েবসাইট মেইনটেনেন্সের জন্য ব্যবহৃত
              হয়। যোগাযোগের প্রয়োজনে দয়া করে ফোন কল না করে শুধুমাত্র{" "}

              {/* WhatsApp Link */}
              <a
                href="https://wa.me/8801741416807"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              {" "}-এ মেসেজ দিন।

            </p>

          </div>

          <hr className="border-gray-200 dark:border-gray-700 mb-6" />

          {/* Developer & Sponsor */}
          <div className="flex flex-col gap-4">

            {/* Developed By - Facebook */}
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">

              <Facebook
                size={18}
                className="text-blue-600 dark:text-blue-400"
              />

              <span>
                Developed by{" "}

                <a
                  href="https://web.facebook.com/rhRonyHossen01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Rony Hossen
                </a>

              </span>

            </p>

            {/* Sponsored By - YouTube */}
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">

              <Youtube
                size={20}
                className="text-red-600 dark:text-red-400"
              />

              <span>
                Sponsored by{" "}

                <a
                  href="https://www.youtube.com/@WaqiaSobjiGhor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold hover:underline"
                >
                  Waqia Sobji Ghor
                </a>

              </span>

            </p>

          </div>

          {/* Social Links */}
          <div className="mt-6 flex flex-wrap gap-3">

            {/* Facebook Button */}
            <a
              href="https://web.facebook.com/rhRonyHossen01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
            >
              <Facebook size={18} />
              Facebook
            </a>

            {/* YouTube Button */}
            <a
              href="https://www.youtube.com/@WaqiaSobjiGhor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-md"
            >
              <Youtube size={18} />
              YouTube
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/8801741416807"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

          </div>

          {/* Last Updated */}
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

export default AboutUs;

