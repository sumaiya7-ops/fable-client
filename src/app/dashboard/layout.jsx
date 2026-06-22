import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="bg-indigo-100 min-h-screen py-10">
      <div className="w-10/12 mx-auto">

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {children}
          </div>

        </div>

      </div>
    </section>
  );
}