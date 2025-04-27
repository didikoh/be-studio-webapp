import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../../mocks/userStore";
import { reservations } from "../../mocks/reservations";
import { useAppContext } from "../../contexts/AppContext";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { CgClose } from "react-icons/cg";

const CoachAccount = () => {
  const user = useUserStore((state: any) => state.user);
  const logout = useUserStore((state: any) => state.logout);
  const navigate = useNavigate();
  const { setSelectedPage } = useAppContext();
  const [filterValue, setFilterValue] = useState("Booked");
  const [ruleOpen, setRuleOpen] = useState(false);

  const filters = [
    { name: "已预约", value: "Booked" },
    { name: "已收款", value: "Paid" },
    { name: "进行中", value: "Ongoing" },
    { name: "已完成", value: "Completed" },
  ];

  if (!user) {
    return (
      <div className="account-container not-logged-in">
        <div className="account-box">
          <p>尚未登录</p>
          <Link to="/login" className="login-link">
            去登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="avatar"></div>
          <div className="login-text">
            {user.name}
            <br />
            <span>{user.phone}</span>
          </div>
        </div>

        <div className="account-dashboard-btns">
          <button
            className="account-dashboard-btn"
            onClick={() => navigate("/account")}
          >
            <FiSettings className="logout-icon" />
          </button>
          <button
            className="account-dashboard-btn"
            onClick={() => {
              logout();
              navigate("/");
              setSelectedPage("home");
            }}
          >
            <LuLogOut className="logout-icon" />
          </button>
        </div>
      </div>

      <div className="account-stats-section">
        <div className="stat-item">
          <div className="stat-label">本月学生人数</div>
          <div className="stat-value">200</div>
        </div>
        <div className="stat-item right">
          <div className="stat-label">本月课堂数</div>
          <div className="stat-value">5</div>
        </div>
      </div>

      <div className="account-stats-section rule">
        <div className="stat-item rule">
          <div
            className="stat-value rule"
            onClick={() => {
              setRuleOpen(true);
            }}
          >
            查看教练规则
          </div>
        </div>
      </div>

      <div className="account-couses-section">
        <div className="account-couses-strip">
          {filters.map((item, index) => (
            <button
              className={
                "account-couses-filter" +
                (filterValue === item.value ? " active" : "")
              }
              key={index}
              onClick={() => setFilterValue(item.value)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="account-couses-list">
          {reservations.map(
            (item, index) =>
              item.status === filterValue && (
                <div className="course-card" key={index}>
                  <img
                    src="/assets/gallery1.jpg"
                    alt="课程背景"
                    className="course-bg"
                  />
                  <div className="course-overlay">
                    <h3 className="course-title">Aerial Music Flow</h3>
                    <p className="course-info">R*-ui老师 ｜ 空中教室</p>
                    <p className="course-duration">
                      课程时长 <strong>60</strong> 分钟
                    </p>
                    <p className="course-difficulty">
                      课程难度
                      <span className="stars">⭐ ⭐</span>
                    </p>
                    <button className="book-button">立即预约</button>
                    <div className="course-tag">团课</div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      <div className="footer-text">
        Be Studio 2025 All Rights Reserved
        <br />
      </div>

      {ruleOpen && (
        <div className="rule-overlay">
          <div className="rule-container">
            <span className="rule-text">
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,{" "}
            </span>
            <button
              className="close-rule-button"
              onClick={() => setRuleOpen(false)}
            >
              <CgClose className="close-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachAccount;
