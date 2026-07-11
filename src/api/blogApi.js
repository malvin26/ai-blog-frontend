import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/* ================================
   BLOGS
================================ */

export const getBlogs = async ({
  page = 1,
  limit = 12,
  category = "",
  subCategory = "",
  search = "",
}) => {
  const res = await API.get("/blogs", {
    params: {
      page,
      limit,
      category,
      subCategory,
      search,
    },
  });

  return res.data;
};

/* ================================
   SINGLE BLOG
================================ */

export const getBlog = async (slug) => {
  const res = await API.get(`/blogs/${slug}`);
  return res.data.blog;
};

/* ================================
   CATEGORIES
================================ */

export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data.categories;
};

export default API;