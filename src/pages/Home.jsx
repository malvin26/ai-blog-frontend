import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
	useSearchParams,
	useNavigate,
} from "react-router";
import { getCategories } from "../api/blogApi";

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import BlogCard from "../component/BlogCard";
import CategoryNav from "../component/CategoryNav";
import Pagination from "../component/Pagination";
import SearchBar from "../component/SearchBar";

const fetchBlogs = async ({ queryKey }) => {
	const [, page, category, subCategory, search] = queryKey;




	const res = await axios.get(
		`${import.meta.env.VITE_API_URL}/blogs`,
		{
			params: {
				page,
				limit: 12,
				category,
				subCategory,
				search,
			},
		}
	);

	return res.data;
};





const Home = () => {

	const navigate = useNavigate();

	const [searchParams] =
		useSearchParams();

	const category =
		searchParams.get("category") || "";

	const subCategory =
		searchParams.get("subCategory") || "";

	const search =
		searchParams.get("search") || "";

	const [page, setPage] =
		useState(1);

	const [
		mobileSidebarOpen,
		setMobileSidebarOpen,
	] = useState(false);


	// ================= React Query =================

	const {
		data,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [
			"blogs",
			page,
			category,
			subCategory,
			search,
		],
		queryFn: fetchBlogs,
		placeholderData: (previousData) => previousData,
	});


	const {
		data: categories = [],
		isLoading: categoryLoading,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	// ================= API Data =================

	const blogs = data?.blogs || [];

	const totalPages =
		data?.totalPages || 1;

	// ================= Search =================

	const handleSearch = (keyword) => {

		const params =
			new URLSearchParams();

		if (category) {
			params.set(
				"category",
				category
			);
		}

		if (subCategory) {
			params.set(
				"subCategory",
				subCategory
			);
		}

		if (keyword) {
			params.set(
				"search",
				keyword
			);
		}

		navigate(
			`/?${params.toString()}`
		);

		setPage(1);

	};

	// ================= Pagination =================

	const handlePage = (
		newPage
	) => {

		setPage(newPage);

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});

	};

	// ================= Category =================
	// ================= Category =================

	const handleCategory = (cat) => {
		navigate(
			`/?category=${encodeURIComponent(cat)}`
		);

		setPage(1);
	};


	// ================= Sub Category =================

	// ================= Sub Category =================

	const handleSubCategory = (cat, sub) => {


		const params = new URLSearchParams();

		params.set("category", cat);
		params.set("subCategory", sub);

		navigate(`/?${params.toString()}`);
	};

	// ===============================================
	// JSX START
	// ===============================================






	return (

		<div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

			{/* ================= NAVBAR ================= */}

			<Navbar categories={categories}
				categoryLoading={categoryLoading} />

			<div
				className="
            lg:hidden
            sticky
            top-16
            z-30
            bg-white
            dark:bg-gray-900
          
            dark:border-gray-800
            p-4
        "
			>


			</div>

			{/* button close ...........  */}

			{/* ================= MAIN CONTAINER ================= */}

			<div
				className="
            max-w-7xl
            mx-auto
            px-4
            py-6
        "
			>

				<div
					className="
				flex
				gap-6
				"
				>


					{/* ================= DESKTOP SIDEBAR ================= */}

					<aside
						className="
                    hidden
                    lg:block
                    w-[280px]
                    shrink-0
                "
					>

						<div
							className="
                        sticky
                        top-24
                    "
						>

							<CategoryNav
								categories={categories}
								selectedCategory={category}
								selectedSubCategory={subCategory}
								onCategorySelect={handleCategory}
								onSubCategorySelect={handleSubCategory}
							/>

						</div>

					</aside>

					{/* ================= MAIN CONTENT ================= */}

					<main className="
						flex-1
						min-w-0
						">



						{/* ================= SEARCH ================= */}

						{/* <SearchBar
							value={search}
							onSearch={handleSearch}
						/>

						{(category || subCategory) && (

							<div
								className="
                            flex
                            flex-wrap
                            gap-2
                            mt-5
                        "
							>

								{category && (

									<span
										className="
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-blue-100
                                    text-blue-700
                                    dark:bg-blue-900/40
                                    dark:text-blue-200
                                    text-sm
                                "
									>

										{category}

									</span>

								)}

								{subCategory && (

									<span
										className="
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-green-100
                                    text-green-700
                                    dark:bg-green-900/40
                                    dark:text-green-200
                                    text-sm
                                "
									>

										{subCategory}

									</span>

								)}

							</div>

						)} */}

						{/* ================= SEARCH ================= */}

						{/* ================= LOADING ================= */}

						{isLoading && (

							<div
								className="
                            mt-8
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-3
                            2xl:grid-cols-4
                            gap-6
                        "
							>

								{[...Array(8)].map((_, i) => (

									<div
										key={i}
										className="
                                    h-80
                                    rounded-2xl
                                    bg-gray-200
                                    dark:bg-gray-800
                                    animate-pulse
                                "
									/>

								))}

							</div>

						)}


						{/* ================= ERROR ================= */}

						{isError && (

							<div
								className="
                            mt-10
                            rounded-xl
                            border
                            border-red-300
                            bg-red-50
                            p-6
                            text-center
                        "
							>

								<h2 className="text-xl font-bold text-red-600">

									Failed to load blogs

								</h2>

								<p className="text-gray-600 mt-2">

									Please refresh the page.

								</p>

							</div>

						)}


						{/* ================= EMPTY ================= */}

						{!isLoading &&
							!isError &&
							blogs.length === 0 && (

								<div
									className="
                                py-24
                                text-center
                            "
								>

									<h2
										className="
                                    text-3xl
                                    font-bold
                                "
									>

										No Blogs Found

									</h2>

									<p
										className="
                                    mt-3
                                    text-gray-500
                                "
									>

										Try another category or search keyword.

									</p>

								</div>

							)}


						{/* ================= BLOG GRID ================= */}

						{!isLoading &&
							!isError &&
							blogs.length > 0 && (

								<div
									className="
mt-6
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"
								>

									{blogs.map((blog) => (

										<BlogCard
											key={blog._id}
											blog={blog}
										/>

									))}

								</div>

							)}



						{/* ================= PAGINATION ================= */}

						{!isLoading &&
							!isError &&
							totalPages > 1 && (

								<div className="mt-10">
									<Pagination
										currentPage={page}
										totalPages={totalPages}
										onPageChange={handlePage}
									/>
								</div>
							)}


					</main>


				</div>
			</div>


			{/* ================= MOBILE CATEGORY DRAWER ================= */}

			{
				mobileSidebarOpen && (

					<>

						<div
							className="
                    fixed
                    inset-0
                    bg-black/50
                    z-40
                    lg:hidden
                "
							onClick={() =>
								setMobileSidebarOpen(false)
							}
						/>

						<aside
							className="
                    fixed
                    left-0
                    top-0
                    h-full
                    w-80
                    bg-white
                    dark:bg-gray-900
                    z-50
                    overflow-y-auto
                    shadow-xl
                    lg:hidden
                "
						>

							<div
								className="
                        p-4
                        border-b
                        dark:border-gray-800
                        flex
                        items-center
                        justify-between
                    "
							>

								<h2 className="text-xl font-bold">

									Categories

								</h2>

								<button
									onClick={() =>
										setMobileSidebarOpen(false)
									}
									className="
                            px-3
                            py-2
                            rounded-lg
                            bg-gray-100
                            dark:bg-gray-800
                        "
								>

									✕

								</button>

							</div>

							<div className="p-4">

								<CategoryNav
									categories={categories}
									selectedCategory={category}
									selectedSubCategory={subCategory}
									onCategorySelect={(cat) => {
										handleCategory(cat);
										setMobileSidebarOpen(false);
									}}
									onSubCategorySelect={(cat, sub) => {
										handleSubCategory(cat, sub);
										setMobileSidebarOpen(false);
									}}
								/>

							</div>

						</aside>

					</>

				)
			}

			{/* ================= FOOTER ================= */}

			<Footer />

		</div >

	)
}


export default Home;