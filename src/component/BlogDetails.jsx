import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AdBox from "../component/AdBox";

const fetchBlog = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/blogs/${slug}`
  );

  return res.data.blog;
};

const BlogDetails = () => {
  const { slug } = useParams();

  const [imageLoading, setImageLoading] = useState(true);
  const [affiliateImageLoading, setAffiliateImageLoading] = useState(true);

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlog(slug),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <ClipLoader size={40} color="#2563eb" />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Blog Not Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            The blog you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const thumbnail =
    blog?.thumbnail?.url ||
    blog?.featuredImage ||
    blog?.image ||
    "";

  const affiliateImage =
    blog?.affiliatedThumbnail?.url || "";

  const affiliateLink =
    blog?.affiliatedLink?.trim() || "";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      {/* =========================
          NAVBAR
      ========================= */}
      <Navbar />

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* =========================
            CATEGORY
        ========================= */}
        {blog.category && (
          <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1.5 text-xs sm:text-sm font-semibold">
            {blog.category}
          </span>
        )}

        {/* =========================
            BLOG THUMBNAIL
        ========================= */}
        {thumbnail && (
          <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100 dark:bg-gray-900 shadow-xl">

            {imageLoading && (
              <div className="flex h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] items-center justify-center">
                <ClipLoader
                  size={45}
                  color="#2563eb"
                />
              </div>
            )}

            <img
              src={thumbnail}
              alt={blog.title}
              loading="eager"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              className={`
                w-full
                h-[200px]
                sm:h-[300px]
                md:h-[400px]
                lg:h-[500px]
                object-cover
                transition-all
                duration-500
                hover:scale-[1.02]
                ${imageLoading ? "hidden" : "block"}
              `}
            />
          </div>
        )}

        {/* =========================
            TITLE
        ========================= */}
        <h1 className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {blog.title}
        </h1>

        {/* =========================
            DATE
        ========================= */}
        <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString(
              "en-BD",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )
            : ""}
        </p>

        {/* =========================
            TOP AD
        ========================= */}
        <div className="my-6 sm:my-8">
          <AdBox
            size="banner"
            position="top"
            isAdEnabled={true}
          />
        </div>

        {/* =========================
            INTRO
        ========================= */}
        {blog.intro && (
          <div className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 dark:text-gray-300 mb-8 sm:mb-10">
            {blog.intro}
          </div>
        )}

        {/* =========================
            AD AFTER INTRO
        ========================= */}
        <div className="my-6 sm:my-8">
          <AdBox
            size="banner"
            position="after-intro"
            isAdEnabled={true}
          />
        </div>

        {/* =========================
            SECTIONS
        ========================= */}
        {blog.sections?.map((section, index) => (
          <div key={index}>

            <section className="mb-10 sm:mb-12">

              {section.heading && (
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5">
                  {section.heading}
                </h2>
              )}

              {section.content && (
                <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {section.content}
                </p>
              )}

              {/* Example */}
              {section.example && (
                <div className="mt-5 sm:mt-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/40 p-4 sm:p-5">

                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    উদাহরণ
                  </h4>

                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {section.example}
                  </p>

                </div>
              )}

              {/* Important Points */}
              {section.importantPoints?.length > 0 && (
                <div className="mt-5 sm:mt-6">

                  <h3 className="font-semibold text-base sm:text-lg mb-3">
                    গুরুত্বপূর্ণ পয়েন্ট
                  </h3>

                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">

                    {section.importantPoints.map((point, idx) => (
                      <li key={idx}>
                        {point}
                      </li>
                    ))}

                  </ul>

                </div>
              )}

            </section>

            {/* =========================
                SECTION AD
            ========================= */}
            {(index + 1) % 2 === 0 && (
              <div className="my-8 sm:my-10">
                <AdBox
                  size="banner"
                  position={`section-${index + 1}`}
                  isAdEnabled={true}
                />
              </div>
            )}

          </div>
        ))}

        {/* =========================
            EXPERT TIPS
        ========================= */}
        {blog.expertTips?.length > 0 && (
          <section className="mt-10 sm:mt-12 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-300 mb-4 sm:mb-5">
              Expert Tips
            </h2>

            <ul className="space-y-3">

              {blog.expertTips.map((tip, i) => (
                <li
                  key={i}
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
                >
                  ✅ {tip}
                </li>
              ))}

            </ul>

          </section>
        )}

        {/* =====================================================
            AFFILIATE PRODUCT SECTION
        ===================================================== */}
        {(affiliateImage || affiliateLink) && (
          <section className="mt-12 sm:mt-14">

            {/* Affiliate Heading */}
            <div className="mb-4 sm:mb-5 text-center">

              <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300">
                Affiliate
              </span>

              <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold">
                Recommended Product
              </h2>

            </div>

            {/* Affiliate Card */}
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">

              {/* =========================
                  AFFILIATE IMAGE
                  NO LINK HERE
              ========================= */}
              {affiliateImage && (
                <div className="relative w-full bg-gray-100 dark:bg-gray-950">

                  {/* Image Loading */}
                  {affiliateImageLoading && (
                    <div className="flex h-[220px] sm:h-[300px] md:h-[400px] items-center justify-center">
                      <ClipLoader
                        size={40}
                        color="#2563eb"
                      />
                    </div>
                  )}

                  <img
                    src={affiliateImage}
                    alt="Affiliate product"
                    loading="lazy"
                    onLoad={() =>
                      setAffiliateImageLoading(false)
                    }
                    onError={() =>
                      setAffiliateImageLoading(false)
                    }
                    className={`
                      w-full
                      h-[220px]
                      sm:h-[300px]
                      md:h-[400px]
                      object-contain
                      bg-white
                      dark:bg-gray-950
                      p-3
                      sm:p-5
                      md:p-8
                      ${affiliateImageLoading ? "hidden" : "block"}
                    `}
                  />

                </div>
              )}

              {/* =========================
                  AFFILIATE CONTENT
              ========================= */}
              <div className="p-5 sm:p-6 md:p-8 text-center">

                {/* Sponsored / Affiliate Label */}
                <p className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Affiliate / Sponsored
                </p>

                {/* Disclosure */}
                <p className="mt-2 text-xs sm:text-sm leading-6 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                  এই লিংকের মাধ্যমে কেনাকাটা করলে FastBlog কমিশন পেতে পারে।
                  আপনার জন্য পণ্যের মূল্য অতিরিক্ত পরিবর্তন হবে না।
                </p>

                {/* =========================
                    AFFILIATE LINK
                ========================= */}
                {affiliateLink && (
                  <div className="mt-5 sm:mt-6">

                    <a
                      href={affiliateLink}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="
                        inline-flex
                        w-full
                        sm:w-auto
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-orange-600
                        hover:bg-orange-700
                        px-6
                        sm:px-8
                        py-3
                        sm:py-3.5
                        text-sm
                        sm:text-base
                        font-bold
                        text-white
                        shadow-md
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        active:scale-95
                      "
                    >
                      🛒 View Product / Offer
                    </a>

                  </div>
                )}

              </div>

            </div>

          </section>
        )}

        {/* =========================
            BEFORE FAQ AD
        ========================= */}
        {blog.faq?.length > 0 && (
          <div className="my-8 sm:my-10">
            <AdBox
              size="banner"
              position="before-faq"
              isAdEnabled={true}
            />
          </div>
        )}

        {/* =========================
            FAQ
        ========================= */}
        {blog.faq?.length > 0 && (
          <section className="mt-8 sm:mt-10">

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              FAQ
            </h2>

            {blog.faq.map((item, i) => (
              <div
                key={i}
                className="border-b border-gray-200 dark:border-gray-800 py-4 sm:py-5"
              >

                <h3 className="font-semibold text-base sm:text-lg">
                  {item.question}
                </h3>

                <p className="mt-3 text-sm sm:text-base leading-7 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </p>

              </div>
            ))}

          </section>
        )}

        {/* =========================
            CONCLUSION
        ========================= */}
        {blog.conclusion && (
          <section className="mt-12 sm:mt-14 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-8">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              উপসংহার
            </h2>

            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 dark:text-gray-300">
              {blog.conclusion}
            </p>

          </section>
        )}

      </main>

      {/* =========================
          FOOTER
      ========================= */}
      <Footer />

    </div>
  );
};

export default BlogDetails;