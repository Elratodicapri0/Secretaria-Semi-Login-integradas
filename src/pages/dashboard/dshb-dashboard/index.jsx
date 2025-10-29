import DashboardOne from "@/components/dashboard/DashboardOne";
import Sidebar from "@/components/dashboard/Sidebar";
import DshbDashboard from "@/components/dashboard/Dshb-dashboard";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Dashboard-single || Orio-x - Professional LMS Online Education Course ReactJS Template",
  description:
    "Eleve sua experiência de gerenciamento de secretaria integrada com nosso sistema intuitivo e eficiente.",
};
export default function DshbDashboardPage() {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <DshbDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
