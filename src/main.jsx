import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import "./index.css"; 

// পেজ এবং লেআউট ইমপোর্ট
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

// 🟢 আপনার তৈরি করা বাকি সাব-পেজগুলো এখানে ইমপোর্ট করে রাউটারে যুক্ত করে দেওয়া হলো
import ManageAllEbooks from "./pages/ManageAllEbooks";
import ManageUsers from "./pages/ManageUsers";
import TransactionsPage from "./pages/TransactionsPage";
import PurchasesPage from "./pages/PurchasesPage";
import SalesHistoryPage from "./pages/SalesHistoryPage";
import ProfilePage from "./pages/ProfilePage";

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
      { path: "user", element: <UserDashboard /> },
      { path: "writer", element: <WriterDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
      
      { path: "manage-all-ebooks", element: <ManageAllEbooks /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "purchases", element: <PurchasesPage /> },
      { path: "sales-history", element: <SalesHistoryPage /> },
      { path: "profile", element: <ProfilePage /> },
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
