import React from "react";
import styles from "./AdminAccount.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import clsx from "clsx";

const AdminAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, setSelectedPage } = useAppContext();

  if (user == null) {
    return <div>请先登录</div>;
  }

  return (
    <div className={styles["admin-account-container"]}>
      <h2>我的账号</h2>

      <div className={styles["account-card"]}>
        <p>
          <strong>姓名：</strong>
          {user.name}
        </p>
        <p>
          <strong>手机号：</strong>
          {user.phone}
        </p>
        <p>
          <strong>权限等级：</strong>
          {user.level == 1 ? "最高权限" : "普通权限"}
        </p>

        <div className={clsx(styles["account-actions"])}>
          <button
            className={clsx(styles["btn"], styles["change"])}
            onClick={() => {
              setSelectedPage("change_password");
            }}
          >
            修改密码
          </button>
          <button
            className={clsx(styles["btn"], styles["logout"])}
            onClick={() => {
              logout();
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

