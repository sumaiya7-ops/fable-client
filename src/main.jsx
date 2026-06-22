import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import "./index.css"; // নিশ্চিত করুন আপনার টেইলউইন্ড সিএসএস এখানে ইমপোর্ট করা আছে

// পেজ এবং লেআউট ইমপোর্ট (ফাইলগুলো আমরা পরের ধাপে তৈরি করব)
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import BrowseEbooks from "./pages/BrowseEbooks";
import EbookDetails from "./pages/EbookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";

// ড্যাশবোর্ড পেজসমূহ
import DashboardLayout from "./layouts/DashboardLayout";
import UserDashboard from "./pages/UserDashboard";
import WriterDashboard from "./pages/WriterDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/browse", element: <BrowseEbooks /> },
      { path: "/ebooks/:id", element: <EbookDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // রোল অনুযায়ী কন্ডিশনাল ড্যাশবোর্ড ভিউ ফ্রন্টএন্ডে হ্যান্ডেল করা হবে
      { path: "user", element: <UserDashboard /> },
      { path: "writer", element: <WriterDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
