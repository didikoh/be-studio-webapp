import React, { useEffect, useState } from "react";
import styles from "./AdminMember.module.css";
import axios from "axios";
import clsx from "clsx";
import EditingUser from "../../components/admin/EditingUser";

const filter = [
  { name: "名字", value: "name" },
  { name: "手机", value: "phone" },
  { name: "积分", value: "points" },
  { name: "余额", value: "balance" },
  { name: "生日", value: "birthday" },
  { name: "注册日期", value: "joinDate" },
  { name: "截止日期", value: "expireDate" },
];

const AdminMember = () => {
  const [selectedRole, setSelectedRole] = useState<any>("student");
  const [allUsers, setAllUsers] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [chargingMember, setChargingMember] = useState<any>(null);
  const [chargeAmount, setChargeAmount] = useState<number>(0);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setAllUsers(null);
    if (selectedRole === "student") {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}admin/get-student.php`, {})
        .then((res) => {
          console.log(res.data.data);
          setAllUsers(res.data.data);
        })
        .catch(() => {
          alert("获取学生列表失败");
        });
    } else if (selectedRole === "coach") {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}admin/get-coach.php`, {})
        .then((res) => {
          console.log(res.data.data);
          setAllUsers(res.data.data);
        })
        .catch(() => {
          alert("获取教师列表失败");
        });
    }
  }, [selectedRole,refresh]);

  const handleCharge = (member: any) => {
    setChargingMember(member);
    setChargeAmount(0); // 重置
  };
  const handleClosePopup = () => {
    setEditingUser(null);
    setChargingMember(null);
  };

  const handleChargeConfirm = () => {};

  const handleAddNew = () => {
    setEditingUser({
      name: "",
      phone: "",
      birthday: "",
      id: -1,
      role: selectedRole,
    });
  };

  return (
    <div className={styles["admin-member-container"]}>
      <div className={styles["admin-member-header"]}>
        <h2>会员管理</h2>
        <div className={styles["admin-member-header-btns"]}>
          <button
            className={selectedRole === "student" ? styles["active"] : ""}
            onClick={() => setSelectedRole("student")}
          >
            学生
          </button>
          <button
            className={selectedRole === "coach" ? styles["active"] : ""}
            onClick={() => setSelectedRole("coach")}
          >
            教师
          </button>
        </div>
      </div>

      <div className={styles["admin-member-filter"]}>
        <div className={styles["member-filter-left"]}>
          <select className={styles["member-type-dropdown"]}>
            {filter.map((f) => (
              <option key={f.value} value={f.value}>
                {f.name}
              </option>
            ))}
          </select>

          <input type="text" placeholder="搜索" />
        </div>

        <button
          className={styles["add-new-member"]}
          onClick={() => handleAddNew()}
        >
          新增
        </button>
      </div>

      <table className={styles["member-table"]}>
        {selectedRole === "student" ? (
          <>
            <thead>
              <tr>
                <th>姓名</th>
                <th>电话</th>
                <th>点数</th>
                <th>余额 (RM)</th>
                <th>配套</th>
                <th>生日</th>
                <th>启动日期</th>
                <th>截止日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.point || "-"}</td>
                    <td>{user.balance}</td>
                    <td>{user.member || "-"}</td>
                    <td>{user.birthday}</td>
                    <td>{user.active_date || "-"}</td>
                    <td>{user.expireDate || "-"}</td>
                    <td style={{ display: "flex" }}>
                      <button
                        className={clsx(styles.btn, styles.edit)}
                        onClick={() => setEditingUser(user)}
                      >
                        编辑
                      </button>
                      <button
                        className={clsx(styles.btn, styles.charge)}
                        onClick={() => handleCharge(user)}
                      >
                        会员
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        ) : (
          <>
            <thead>
              <tr>
                <th>姓名</th>
                <th>电话</th>
                <th>生日</th>
                <th>该月学生</th>
                <th>该月课堂</th>
                <th>注册日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.birthday}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{user.join_date || "-"}</td>
                    <td style={{ display: "flex" }}>
                      <button
                        className={clsx(styles.btn, styles.edit)}
                        onClick={() => setEditingUser(user)}
                      >
                        编辑
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </table>

      {/* 编辑弹窗 */}
      {editingUser && (
        <EditingUser
          editingUser={editingUser}
          handleClosePopup={handleClosePopup}
          selectedRole={selectedRole}
          setRefresh={setRefresh}
          setEditingUser={setEditingUser}
        />
      )}

      {/* 充值弹窗 */}
      {chargingMember && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-card-topup"]}>
            <h3>充值余额</h3>
            <p>
              <strong>会员：</strong>
              {chargingMember.name}
            </p>
            <p>
              <strong>当前余额：</strong>RM {chargingMember.balance}
            </p>
            <input
              type="number"
              placeholder="输入充值金额"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(Number(e.target.value))}
            />
            <div className={styles["popup-actions"]}>
              <button
                className={clsx(styles.btn, styles.confirm)}
                onClick={handleChargeConfirm}
              >
                确认充值
              </button>
              <button
                className={clsx(styles.btn, styles["close-btn"])}
                onClick={handleClosePopup}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMember;
