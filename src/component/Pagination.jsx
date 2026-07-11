import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  let start = Math.max(currentPage - 2, 1);
  let end = Math.min(currentPage + 2, totalPages);

  if (currentPage <= 3) {
    end = Math.min(5, totalPages);
  }

  if (currentPage >= totalPages - 2) {
    start = Math.max(totalPages - 4, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap mt-10">

      {/* First */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className="
                    h-10
                    w-10
                    rounded-lg
                    border
                    flex
                    items-center
                    justify-center
                    disabled:opacity-40
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                "
      >
        <ChevronsLeft size={18} />
      </button>

      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="
                    h-10
                    w-10
                    rounded-lg
                    border
                    flex
                    items-center
                    justify-center
                    disabled:opacity-40
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                "
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 h-10 rounded-lg border"
          >
            1
          </button>

          {start > 2 && (
            <span className="px-2">
              ...
            </span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() =>
            onPageChange(page)
          }
          className={`
                        h-10
                        min-w-[40px]
                        px-3
                        rounded-lg
                        border
                        transition
                        ${currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }
                    `}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2">
              ...
            </span>
          )}

          <button
            onClick={() =>
              onPageChange(totalPages)
            }
            className="px-4 h-10 rounded-lg border"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="
                    h-10
                    w-10
                    rounded-lg
                    border
                    flex
                    items-center
                    justify-center
                    disabled:opacity-40
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                "
      >
        <ChevronRight size={18} />
      </button>

      {/* Last */}
      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(totalPages)
        }
        className="
                    h-10
                    w-10
                    rounded-lg
                    border
                    flex
                    items-center
                    justify-center
                    disabled:opacity-40
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                "
      >
        <ChevronsRight size={18} />
      </button>

    </div>
  );
};

export default Pagination;