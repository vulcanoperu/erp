import React from "react";
import MainMenu from "../components/shared/MainMenu";
import SecondaryMenu from "../components/shared/SecondaryMenu";
import Dashboard from "../components/Home/Dashboard";

export default function Home() {
  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <SecondaryMenu onLogout={handleLogout} />
      <MainMenu />
      <Dashboard />
    </div>
  );
}