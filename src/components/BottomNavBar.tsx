// src/components/BottomNavBar/BottomNavBar.tsx
import { FaHome, FaClock, FaShoppingBag, FaUser } from "react-icons/fa";
import "./BottomNavBar.css";
import { useState } from "react";

const navItems = [
  { label: "首页", icon: <FaHome />, value : "home" },
  { label: "预约", icon: <FaClock />, value: "appointment" },
  { label: "活动", icon: <FaShoppingBag />, value:"event"},
  { label: "我的", icon: <FaUser />,  value:"profile" },
];

const BottomNavBar = () => {
  const [selectedPage, setSelectedPage] = useState("Home");
  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`nav-item ${item.value == selectedPage ? "active" : ""}`}
          onClick={() => {
            // Handle navigation logic here
            console.log(`Navigating to ${item.label}`);
            setSelectedPage(item.value);
          }}
        >
          {item.icon}
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BottomNavBar;
