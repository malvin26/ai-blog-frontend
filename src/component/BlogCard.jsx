import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  return (
    <div
      className="
        group
        bg-white
        dark:bg-gray-900
        rounded-2xl
        overflow-hidden
        border
        border-gray-200
        dark:border-gray-800
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        {blog?.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog?.title}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-52 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        )}

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow">
            {blog?.category}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3">

        {/* Sub Category */}
        {blog?.subCategory && (
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {blog.subCategory}
          </p>
        )}

        {/* Title */}
        <h2
          className="
            text-xl
            font-bold
            line-clamp-2
            text-gray-900
            dark:text-white
            group-hover:text-blue-600
            dark:group-hover:text-blue-400
            transition
          "
        >
          {blog?.title}
        </h2>

        {/* Description */}
        <p
          className="
            text-sm
            leading-7
            line-clamp-3
            text-gray-600
            dark:text-gray-400
          "
        >
          {blog?.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {blog?.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString()
              : "Draft"}
          </span>

          <Link
            to={`/blog/${blog?.slug}`}
            className="
              px-4
              py-2
              rounded-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              text-sm
              font-semibold
              transition
            "
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;