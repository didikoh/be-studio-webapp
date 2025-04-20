// src/pages/AdminHome.tsx
import './AdminHome.css';
import { FaUser, FaCalendarCheck, FaWallet, FaPlus, FaBook, FaUsers } from 'react-icons/fa';

const AdminHome = () => {
  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="admin-home-container">
      <h2 className="welcome">👋 欢迎回来，管理员！</h2>
      <p className="date">今天是 {today}</p>

      <div className="stats-section">
        <div className="stat-card">
          <FaUser className="icon" />
          <div>
            <h3>会员人数</h3>
            <p>128人</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCalendarCheck className="icon" />
          <div>
            <h3>今日预约</h3>
            <p>15项</p>
          </div>
        </div>
        <div className="stat-card">
          <FaWallet className="icon" />
          <div>
            <h3>今日交易额</h3>
            <p>RM 1,620</p>
          </div>
        </div>
      </div>

      <h3 className="quick-title">📌 快捷操作</h3>
      <div className="quick-actions">
        <button className="quick-btn">
          <FaPlus /> 新增会员
        </button>
        <button className="quick-btn">
          <FaUsers /> 管理会员
        </button>
        <button className="quick-btn">
          <FaBook /> 添加课程
        </button>
        <button className="quick-btn">
          <FaUsers /> 管理教练
        </button>
        <button className="quick-btn">
          <FaWallet /> 会员快速充值
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
