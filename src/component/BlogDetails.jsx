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
        Loading...
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex items-center justify-center">
        Blog Not Found
      </div>
    );
  }

  const thumbnail =
    blog?.thumbnail?.url ||
    blog?.featuredImage ||
    blog?.image ||
    "";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Category */}
        <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 text-sm font-semibold">
          {blog.category}
        </span>

        {/* Blog Thumbnail */}
        {thumbnail && (
          <div className="mt-8 mb-8 overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900 shadow-xl">

            {imageLoading && (
              <div className="flex h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] items-center justify-center">
                <ClipLoader
                  size={45}
                  color="#2563eb"
                />
              </div>
            )}

            <img
              src={thumbnail}
              alt={blog.title}
              loading="lazy"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              className={`
                w-full
                h-[220px]
                sm:h-[320px]
                md:h-[420px]
                lg:h-[500px]
                object-cover
                transition-all
                duration-500
                hover:scale-105
                ${imageLoading ? "hidden" : "block"}
              `}
            />
          </div>
        )}


        {/* Title */}
        <h1 className="mt-5 text-4xl font-bold leading-tight">
          {blog.title}
        </h1>

        {/* Date */}
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString()
            : ""}
        </p>

        {/* Top Ad */}
        <div className="my-8">
          <AdBox
            size="banner"
            position="top"
            isAdEnabled={false}
          />
        </div>


        {/* Intro */}
        <div className="text-lg leading-8 text-gray-700 dark:text-gray-300 mb-10">
          {blog.intro}
        </div>

        {/* Ad */}
        <div className="my-8">
          <AdBox
            size="banner"
            position="after-intro"
            isAdEnabled={false}
          />
        </div>

        {/* Sections */}
        {blog.sections?.map((section, index) => (
          <div key={index}>

            <section className="mb-12">

              <h2 className="text-2xl font-bold mb-5">
                {section.heading}
              </h2>

              <p className="leading-8 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {section.content}
              </p>

              {section.example && (
                <div className="mt-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/40 p-5">

                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    উদাহরণ
                  </h4>

                  <p className="text-gray-700 dark:text-gray-300">
                    {section.example}
                  </p>

                </div>
              )}

              {section.importantPoints?.length > 0 && (

                <div className="mt-6">

                  <h3 className="font-semibold mb-3">
                    গুরুত্বপূর্ণ পয়েন্ট
                  </h3>

                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">

                    {section.importantPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}

                  </ul>

                </div>

              )}

            </section>

            {(index + 1) % 2 === 0 && (

              <div className="my-10">
                <AdBox
                  size="banner"
                  position={`section-${index + 1}`}
                  isAdEnabled={false}
                />
              </div>

            )}

          </div>
        ))}

        {/* Expert Tips */}
        {blog.expertTips?.length > 0 && (

          <section className="mt-12 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-6">

            <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-5">
              Expert Tips
            </h2>

            <ul className="space-y-3">

              {blog.expertTips.map((tip, i) => (
                <li
                  key={i}
                  className="text-gray-700 dark:text-gray-300"
                >
                  ✅ {tip}
                </li>
              ))}

            </ul>

          </section>

        )}

        {/* FAQ */}
        {blog.faq?.length > 0 && (
          <>
            <div className="my-10">
              <AdBox
                size="banner"
                position="before-faq"
                isAdEnabled={false}
              />
            </div>

            <section className="mt-10">

              <h2 className="text-3xl font-bold mb-8">
                FAQ
              </h2>

              {blog.faq.map((item, i) => (

                <div
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-800 py-5"
                >

                  <h3 className="font-semibold text-lg">
                    {item.question}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
                    {item.answer}
                  </p>

                </div>

              ))}

            </section>
          </>
        )}

        {/* Conclusion */}

        <section className="mt-14 rounded-2xl bg-gray-100 dark:bg-gray-900 border dark:border-gray-800 p-8">

          <h2 className="text-2xl font-bold mb-4">
            উপসংহার
          </h2>

          <p className="leading-8 text-gray-700 dark:text-gray-300">
            {blog.conclusion}
          </p>

        </section>

      </main>

      <Footer />

    </div>
  );
};

export default BlogDetails;