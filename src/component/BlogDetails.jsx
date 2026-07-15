
// import { useParams } from "react-router";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import AdBox from "../component/AdBox";
// import Footer from "./Footer";
// import Navbar from "./Navbar";

// const fetchBlog = async (slug) => {
//   const res = await axios.get(
//     `http://localhost:3000/blogs/${slug}`
//   );
//   return res.data.blog;
// };

// const BlogDetails = () => {
//   const { slug } = useParams();

//   const {
//     data: blog,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["blog", slug],
//     queryFn: () => fetchBlog(slug),

//     staleTime: 1000 * 60 * 10,
//     gcTime: 1000 * 60 * 30,
//     retry: 1,
//   });

//   if (isLoading) {
//     return (
//       <div className="text-center py-20">
//         Loading...
//       </div>
//     );
//   }

//   if (isError || !blog) {
//     return (
//       <div className="text-center py-20">
//         Blog Not Found
//       </div>
//     );
//   }

//   return (

//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 py-10">

//         {/* Category */}
//         <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
//           {blog.category}
//         </span>

//         {/* Title */}
//         <h1 className="text-4xl font-bold mt-4 leading-tight">
//           {blog.title}
//         </h1>

//         {/* Top Ad */}
//         <AdBox
//           size="banner"
//           position="top"
//           isAdEnabled={false}
//         />

//         {/* Date */}
//         <p className="text-gray-500 mt-3">
//           {blog.publishedAt
//             ? new Date(blog.publishedAt).toLocaleDateString()
//             : ""}
//         </p>

//         {/* Featured Image */}
//         {blog.featuredImage && (
//           <img
//             src={blog.featuredImage}
//             alt={blog.title}
//             className="w-full rounded-xl my-8"
//           />
//         )}

//         {/* Intro */}
//         <div className="text-lg text-gray-700 leading-8 mb-10">
//           {blog.intro}
//         </div>

//         {/* Ad After Intro */}
//         <AdBox
//           size="banner"
//           position="after-intro"
//           isAdEnabled={false}
//         />

//         {/* Sections */}
//         {blog.sections?.map((section, index) => (
//           <div key={index}>
//             <div className="mb-10">
//               <h2 className="text-2xl font-bold mb-4">
//                 {section.heading}
//               </h2>

//               <p className="text-gray-700 leading-8">
//                 {section.content}
//               </p>

//               {section.example && (
//                 <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 rounded">
//                   <strong>উদাহরণ:</strong>
//                   <p>{section.example}</p>
//                 </div>
//               )}

//               {section.importantPoints?.length > 0 && (
//                 <div className="mt-4">
//                   <h4 className="font-semibold mb-2">
//                     গুরুত্বপূর্ণ পয়েন্ট:
//                   </h4>

//                   <ul className="list-disc pl-5 space-y-1">
//                     {section.importantPoints.map(
//                       (point, idx) => (
//                         <li key={idx}>{point}</li>
//                       )
//                     )}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Ad every 2 sections */}
//             {(index + 1) % 2 === 0 && (
//               <AdBox
//                 size="banner"
//                 position={`section-${index + 1}`}
//                 isAdEnabled={false}
//               />
//             )}
//           </div>
//         ))}

//         {/* Expert Tips */}
//         {blog.expertTips?.length > 0 && (
//           <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-10">
//             <h3 className="font-bold text-xl mb-4">
//               Expert Tips
//             </h3>

//             <ul className="space-y-2">
//               {blog.expertTips.map((tip, i) => (
//                 <li key={i}>✅ {tip}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* FAQ Ad */}
//         {blog.faq?.length > 0 && (
//           <>
//             <AdBox
//               size="banner"
//               position="before-faq"
//               isAdEnabled={false}
//             />

//             <div className="mt-12">
//               <h2 className="text-3xl font-bold mb-6">
//                 FAQ
//               </h2>

//               {blog.faq.map((item, i) => (
//                 <div
//                   key={i}
//                   className="border-b py-4"
//                 >
//                   <h3 className="font-semibold">
//                     {item.question}
//                   </h3>

//                   <p className="text-gray-600 mt-2">
//                     {item.answer}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Conclusion */}
//         <div className="mt-12 bg-gray-50 p-6 rounded-xl">
//           <h2 className="text-2xl font-bold mb-3">
//             উপসংহার
//           </h2>

//           <p className="leading-8 text-gray-700">
//             {blog.conclusion}
//           </p>
//         </div>


//       </div>


//       <Footer />


//     </>

//   );
// };

// export default BlogDetails;



import { useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Category */}
        <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 text-sm font-semibold">
          {blog.category}
        </span>

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

        {/* Featured Image */}
        {blog.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full rounded-2xl my-8"
          />
        )}

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
                    গুরুত্বপূর্ণ পয়েন্ট
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



