import AnalyticsCards from "../../components/dashboard/AnalyticsCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import RecentTable from "../../components/dashboard/RecentTable";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <AnalyticsCards />

      <RevenueChart />

      <RecentTable />

    </div>
  );
}