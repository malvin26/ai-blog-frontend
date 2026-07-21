import { useState } from "react";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";

const BlogCard = ({ blog }) => {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUrl =
    blog?.thumbnail?.url ||
    blog?.featuredImage ||
    blog?.image ||
    "";




  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        dark:border-gray-800
        bg-white
        dark:bg-gray-900
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {imageUrl && !imageError ? (
          <>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/40 z-10">
                <ClipLoader
                  size={35}
                  color="#2563eb"
                />
              </div>
            )}

            <img
              src={imageUrl}
              alt={blog?.title}
              loading="lazy"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setImageError(true);
              }}
              className={`
                w-full
                h-full
                object-cover
                duration-500
                transition-all
                group-hover:scale-105
                ${loading
                  ? "opacity-0"
                  : "opacity-100"
                }
              `}
            />
          </>
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
            "
          >
            <div className="text-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4-4 4 4 6-6 2 2v6H4z"
                />
              </svg>

              <p className="mt-2 text-sm font-semibold">
                No Thumbnail
              </p>
            </div>
          </div>
        )}

        {/* Category */}
        {blog?.category && (
          <span
            className="
              absolute
              top-3
              left-3
              rounded-full
              bg-blue-600
              px-3
              py-1
              text-xs
              font-semibold
              text-white
              shadow
            "
          >
            {blog.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {blog?.subCategory && (
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-blue-600
              dark:text-blue-400
            "
          >
            {blog.subCategory}
          </p>
        )}

        <Link to={`/blog/${blog.slug}`}>
          <h2
            className="
              line-clamp-2
              text-xl
              font-bold
              text-gray-900
              transition
              group-hover:text-blue-600
              dark:text-white
              dark:group-hover:text-blue-400
            "
          >
            {blog.title}
          </h2>
        </Link>

        <p
          className="
            line-clamp-3
            text-sm
            leading-7
            text-gray-600
            dark:text-gray-400
          "
        >
          {blog.description}
        </p>

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
            border-t
            border-gray-200
            pt-4
            dark:border-gray-700
          "
        >
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {blog?.publishedAt
              ? new Date(
                blog.publishedAt
              ).toLocaleDateString()
              : "Draft"}
          </span>

          <Link
            to={`/blog/${blog.slug}`}
            className="
              rounded-full
              bg-blue-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;