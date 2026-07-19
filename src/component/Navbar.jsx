import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

const Navbar = ({
  categories = [],
  categoryLoading = false,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (name) => {
    setOpenCategory((prev) =>
      prev === name ? null : name
    );
  };

  return (
    <>
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold"
          >
            AI Blog
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-8 lg:flex">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "font-medium hover:text-blue-600"
              }
            >
              Home
            </NavLink>



            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "font-medium hover:text-blue-600"
              }
            >
              Contact
            </NavLink>

          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">

            <ThemeToggle />

            {/* Custom children (e.g. Logout button) rendered here for desktop */}
            {children}

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            >
              <Menu size={22} />
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-white
          dark:bg-gray-900
          border-r
          dark:border-gray-800
          transform
          transition-transform
          duration-300
          lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Drawer Header */}

        <div className="flex h-16 items-center justify-between border-b px-5 dark:border-gray-800">

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-bold"
          >
            AI Blog
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={22} />
          </button>

        </div>

        {/* Drawer Menu */}

        <nav className="h-[calc(100vh-64px)] overflow-y-auto py-3">

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block px-5 py-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Home
          </Link>

          {categoryLoading ? (
            <div className="px-5 py-4 text-sm text-gray-500">
              Loading...
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.name}>

                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex w-full items-center justify-between px-5 py-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {category.name}

                  {category.topics?.length > 0 &&
                    (openCategory === category.name ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    ))}
                </button>

                {openCategory === category.name &&
                  category.topics?.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800">

                      {category.topics.map((topic) => {
                        const params = new URLSearchParams();

                        params.set("category", category.name);
                        params.set("subCategory", topic);

                        return (
                          <Link
                            key={topic}
                            to={`/?${params.toString()}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-3 pl-10 pr-5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {topic}
                          </Link>
                        );
                      })}


                    </div>
                  )}

              </div>
            ))
          )}

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block px-5 py-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Contact
          </Link>

          {/* Custom children (e.g. Logout button) rendered here for mobile drawer */}
          {children && (
            <div className="px-5 py-4">
              {children}
            </div>
          )}

        </nav>

      </aside>
    </>
  );
};

export default Navbar;