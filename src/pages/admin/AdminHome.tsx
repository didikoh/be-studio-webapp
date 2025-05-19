// src/pages/AdminHome.tsx
import axios from "axios";
import "./AdminHome.css";
import {
  FaUser,
  FaCalendarCheck,
  FaWallet,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

const AdminHome = () => {
  const { user } = useAppContext();
  const [homeData, setHomeData] = useState<any>(null);

  const today = new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}admin/home-data.php`)
      .then((res) => {
        console.log(res.data);
        setHomeData(res.data.data);
      });
  }, []);

  return (
    <div className="admin-home-container">
      <h2 className="welcome">👋 欢迎回来，{user?.name}！</h2>
      <p className="date">今天是 {today}</p>

      <div className="stats-section">
        <div className="stat-card">
          <FaUser className="icon" />
          <div>
            <h3>用户人数</h3>
            <p>{homeData?.user_count}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaUser className="icon" />
          <div>
            <h3>会员人数</h3>
            <p>{homeData?.member_count}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaCalendarCheck className="icon" />
          <div>
            <h3>今日预约</h3>
            <p>{homeData?.booking_count}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaWallet className="icon" />
          <div>
            <h3>今日交易额</h3>
            <p>{homeData?.total_amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
