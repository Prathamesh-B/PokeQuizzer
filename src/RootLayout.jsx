import { Outlet } from "@tanstack/react-router";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function RootLayout() {
  return (
    <div className="app-bg">
      <div className="phone-container">
        <Header />
        <div className="flex flex-1 items-center justify-center overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default RootLayout;
