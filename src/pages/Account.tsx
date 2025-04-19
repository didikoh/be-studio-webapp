import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { reservations } from "../mocks/reservations";
import "./Account.css";

const Account = () => {
  const user = useUserStore((state: any) => state.user);
  const logout = useUserStore((state: any) => state.logout);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="account-container not-logged-in">
        <p>尚未登录</p>
        <Link to="/login" className="login-link">
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h1 className="account-title">我的账户</h1>

      <div className="account-box">
        <p>👤 姓名：{user.name}</p>
        <p>📱 手机号：{user.phone}</p>
        <p>💰 余额：RM 100</p>
        <p>🌟 积分：20</p>
      </div>

      <h2 className="section-title">已预约课程</h2>
      <div className="reservation-list">
        {reservations.map((item) => (
          <div key={item.id} className="reservation-card">
            <p>📘 课程：{item.courseTitle}</p>
            <p>🕓 时间：{item.date}</p>
            <p className={`status ${item.status}`}>状态：{item.status}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="logout-button"
      >
        退出登录
      </button>
    </div>
  );
};

export default Account;
