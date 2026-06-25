import AnalyticsCards from "../../components/dashboard/AnalyticsCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import RecentTable from "../../components/dashboard/RecentTable";
import GenrePieChart from "../../components/dashboard/GenrePieChart";
import TopSellingEbooks from "../../components/dashboard/TopSellingEbooks";

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0b0c16] text-white font-sans antialiased">
      
      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-hidden">
        
        {/* Header Text */}
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            Welcome back, <span className="text-white font-bold border-b border-dashed border-purple-500">Admin</span> 👑
          </h1>
          <p className="text-xs text-gray-500 mt-1">Here's what's happening on Fable.</p>
        </div>

        {/* Analytics Cards */}
        <AnalyticsCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <GenrePieChart />
          </div>
        </div>

        {/* Table & Top Selling Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentTable />
          </div>
          <div>
            <TopSellingEbooks />
          </div>
        </div>

      </main>
    </div>
  );
}
