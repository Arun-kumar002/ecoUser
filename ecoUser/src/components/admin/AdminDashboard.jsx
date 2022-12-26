import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Alluser from "./Alluser";
import "./admin.css";
import BarChart from "../charts/BarChart";

const AdminDashboard = () => {
  return (
    <>
      <div className="dashboardSection">
        <Sidebar />
        <Alluser />
      </div>
      <div>
        {/* <BarChart /> */}
      </div>
    </>
  );
};

export default AdminDashboard;
