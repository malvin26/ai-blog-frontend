import {
  Routes, Route
} from "react-router";
import { useState } from 'react'
import Login from "./pages/Login"
import Home from "./pages/Home"
import AdminProtectedRoute from "./component/AdminProtectedRoute";
import AdminDash from "./pages/AdminDash";
import BlogDetails from "./component/BlogDetails";
import PrivacyPolicy from "./pages/PrivecyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdPolicy from "./pages/AdPolicy";
import Contact from "./pages/Contact";



function App() {

  return <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/ad-policy" element={<AdPolicy />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/xxx-admin-login" element={<Login />} />

      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDash />}
        />
      </Route>

    </Routes>


  </>

}

export default App




