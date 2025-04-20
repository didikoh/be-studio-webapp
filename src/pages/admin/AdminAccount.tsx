import React from "react";
import "./AdminAccount.css";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const AdminAccount: React.FC = () => {
  const logout = useUserStore((state: any) => state.logout);
  const navigate = useNavigate();
  const { setSelectedPage, setUser } = useAppContext();

  const mockAdmin = {
    name: "Admin 用户",
    email: "admin@example.com",
    role: "管理员",
    joinDate: "2024-12-01",
  };

  return (
    <div className="admin-account-container">
      <h2>我的账号</h2>

      <div className="account-card">
        <p>
          <strong>姓名：</strong>
          {mockAdmin.name}
        </p>
        <p>
          <strong>登录账号：</strong>
          {mockAdmin.email}
        </p>
        <p>
          <strong>权限等级：</strong>
          {mockAdmin.role}
        </p>
        <p>
          <strong>加入时间：</strong>
          {mockAdmin.joinDate}
        </p>

        <div className="account-actions">
          <button className="btn change">修改密码</button>
          <button
            className="btn logout"
            onClick={() => {
              logout();
              navigate("/");
              setSelectedPage("home");
              setUser("user");
            }}
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
