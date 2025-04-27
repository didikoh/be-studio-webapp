// src/components/BottomNavBar/BottomNavBar.tsx
import {
  FaHome,
  FaClock,
  FaShoppingBag,
  FaUser,
  FaCalendar,
  FaWallet,
} from "react-icons/fa";
import "./BottomNavBar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { GrYoga } from "react-icons/gr";

const navItems = [
  { label: "首页", icon: <FaHome />, value: "home", role: "user" },
  { label: "预约", icon: <FaClock />, value: "schedule", role: "user" },
  {
    label: "活动",
    icon: <FaShoppingBag />,
    value: "event",
    role: "user",
  },
  { label: "账号", icon: <FaUser />, value: "account", role: "user" },
  { label: "课程", icon: <GrYoga />, value: "coach_course", role: "coach" },
  { label: "场地", icon: <FaCalendar />, value: "coach_site", role: "coach" },
  { label: "账号", icon: <FaUser />, value: "coach_account", role: "coach" },

  { label: "首页", icon: <FaHome />, value: "admin_home", role: "admin" },
  { label: "会员", icon: <FaCalendar />, value: "admin_member", role: "admin" },
  {
    label: "交易",
    icon: <FaWallet />,
    value: "admin_transaction",
    role: "admin",
  },
  {
    label: "场地",
    icon: <GrYoga />,
    value: "admin_site",
    role: "admin",
  },
  { label: "账号", icon: <FaUser />, value: "admin_account", role: "admin" },

];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { selectedPage, setSelectedPage } = useAppContext();

  return (
    <div className="bottom-nav">
      {navItems.map(
        (item, index) =>
          item.role === user && (
            <div
              key={index}
              className={`nav-item ${
                item.value === selectedPage ? "active" : ""
              }`}
              onClick={() => {
                console.log(`Navigating to ${item.label}`);
                setSelectedPage(item.value);
                navigate("/" + item.value);
              }}
            >
              {item.icon}
              <div>{item.label}</div>
            </div>
          )
      )}
    </div>
  );
};

export default BottomNavBar;
