import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const CategoryNav = ({
  categories = [],
  selectedCategory = "",
  selectedSubCategory = "",
  onCategorySelect,
  onSubCategorySelect,
}) => {
  const [openCategory, setOpenCategory] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      setOpenCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const toggleCategory = (categoryName) => {
    setOpenCategory((prev) =>
      prev === categoryName ? "" : categoryName
    );
  };

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <h2 className="text-lg font-bold">
          Categories
        </h2>
      </div>

      {/* Body */}
      <div>

        {categories.length === 0 && (
          <div className="p-5 text-sm text-gray-500">
            No Categories Found
          </div>
        )}

        {categories.map((category) => {


          const isOpen =
            openCategory === category.name;

          const isActive =
            selectedCategory === category.name;

          return (

            <div
              key={category.name}
              className="border-b border-gray-100 last:border-0 dark:border-gray-700"
            >

              {/* Category */}
              <div
                className={`
                  flex
                  items-center
                  justify-between
                  px-5
                  py-3
                  transition
                  ${isActive
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >

                {/* Category Name */}
                <button
                  onClick={() => {
                    // console.log("Category Click:", category.name);
                    onCategorySelect?.(category.name);
                  }}
                  className="flex-1 text-left font-medium"
                >
                  {category.name}
                </button>

                {/* Arrow */}
                {(category.topics ?? []).length > 0 && (
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="ml-3"
                  >
                    {isOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>
                )}

              </div>

              {/* Sub Categories */}
              {isOpen && (

                <div className="bg-gray-50 dark:bg-gray-950">

                  {(category.topics ?? []).length === 0 && (

                    <div className="px-10 py-3 text-sm text-gray-500">
                      No Sub Categories
                    </div>

                  )}

                  {(category.topics ?? []).map((topic) => (

                    <button
                      key={topic}
                      onClick={() => {
                        console.log(
                          "SubCategory Click:",
                          category.name,
                          topic
                        );

                        onSubCategorySelect?.(
                          category.name,
                          topic
                        );
                      }}
                      className={`
                        block
                        w-full
                        px-10
                        py-2.5
                        text-left
                        text-sm
                        transition
                        ${selectedSubCategory === topic
                          ? "bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900/30"
                          : "hover:bg-gray-200 dark:hover:bg-gray-800"
                        }
                      `}
                    >
                      {topic}
                    </button>

                  ))}

                </div>

              )}

            </div>

          );
        })}

      </div>
    </aside>
  );
};

export default CategoryNav;