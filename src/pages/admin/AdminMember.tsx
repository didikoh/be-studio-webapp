import { useEffect, useMemo, useState } from "react";
import styles from "./AdminMember.module.css";
import axios from "axios";
import clsx from "clsx";
import EditingUser from "../../components/admin/EditingUser";
import popupStyle from "../../components/admin/EditingUser.module.css";

const filter = [
  { name: "名字", value: "name" },
  { name: "手机", value: "phone" },
  { name: "积分", value: "point" },
  { name: "余额", value: "balance" },
  { name: "生日", value: "birthday" },
  { name: "注册日期", value: "active_date" },
  { name: "截止日期", value: "expire_date" },
];

const packages = [
  { name: "promotion", price: 30 },
  { name: "basic", price: 50 },
  { name: "none", price: 0 },
];

const AdminMember = () => {
  const [selectedRole, setSelectedRole] = useState<any>("student");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [chargingMember, setChargingMember] = useState<any>(null);
  const [chargeAmount, setChargeAmount] = useState<number>(0);
  const [chargePackage, setChargePackage] = useState<string>("");
  const [refresh, setRefresh] = useState(0);
  const [filterBy, setFilterBy] = useState<string>("name");
  const [search, setSearch] = useState<string>("");
  const [viewCoachCourse, setViewCoachCourse] = useState<null | {
    name: string;
    year: number;
    month: number;
  }>(null);

  const [coachCourses, setCoachCourses] = useState<any[]>([]);
  const [loadingCoachCourse, setLoadingCoachCourse] = useState(false);

  const openCoachCoursePopup = (coachName: string) => {
    const now = new Date();
    setViewCoachCourse({
      name: coachName,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    });
  };

  useEffect(() => {
    if (!viewCoachCourse) return;
    setLoadingCoachCourse(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}admin/get-coach-courses.php`, {
        params: {
          coach_name: viewCoachCourse.name,
          year: viewCoachCourse.year,
          month: viewCoachCourse.month,
        },
      })
      .then((res) => {
        setCoachCourses(res.data.data.courses || []);
      })
      .catch(() => {
        setCoachCourses([]);
      })
      .finally(() => setLoadingCoachCourse(false));
  }, [viewCoachCourse]);

  // 过滤成员
  const filteredMembers = useMemo(() => {
    if (!allUsers) return [];
    return allUsers.filter((m: any) => {
      if (!search) return true;
      const value = m[filterBy as keyof typeof m];
      return value?.toString().toLowerCase().includes(search.toLowerCase());
    });
  }, [allUsers, filterBy, search]);

  useEffect(() => {
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
  }, [selectedRole, refresh]);

  const handleClosePopup = () => {
    setEditingUser(null);
    setChargingMember(null);
  };

  const handleAddNew = () => {
    setEditingUser({
      name: "",
      phone: "",
      birthday: "",
      id: -1,
      role: selectedRole,
    });
  };

  const handleCharge = (member: any) => {
    setChargingMember(member);
    setChargePackage(member.package ? member.package : "none");
    setChargeAmount(0); // 重置
  };

  const handleChargeConfirm = () => {
    console.log(chargePackage);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}admin/topup.php`, {
        id: chargingMember.id,
        amount: chargeAmount,
        package: chargePackage,
      })
      .then((res) => {
        console.log(res.data);
        setRefresh((prev) => prev + 1);
        setChargingMember(null);
      })
      .catch(() => {
        alert("充值失败");
      });
  };

  const handleSetSelectedRole = (role: string) => {
    setSelectedRole(role);
    setAllUsers([]);
  };
  return (
    <div className={styles["admin-member-container"]}>
      <div className={styles["admin-member-header"]}>
        <h2>会员管理</h2>
        <div className={styles["admin-member-header-btns"]}>
          <button
            className={selectedRole === "student" ? styles["active"] : ""}
            onClick={() => handleSetSelectedRole("student")}
          >
            学生
          </button>
          <button
            className={selectedRole === "coach" ? styles["active"] : ""}
            onClick={() => handleSetSelectedRole("coach")}
          >
            教师
          </button>
        </div>
      </div>

      <div className={styles["admin-member-filter"]}>
        <div className={styles["member-filter-left"]}>
          <select
            className={styles["member-type-dropdown"]}
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            {filter.map((f: any) => (
              <option key={f.value} value={f.value}>
                {f.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="搜索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className={styles["add-new-member"]} onClick={handleAddNew}>
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
              {filteredMembers &&
                filteredMembers.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.point || "-"}</td>
                    <td>
                      {user.balance + " ("}
                      {user.frozen_balance + ")"}
                    </td>
                    <td>{user.package || "-"}</td>
                    <td>{user.birthday}</td>
                    <td>{user.active_date || "-"}</td>
                    <td>{user.expire_date || "-"}</td>
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
              {filteredMembers &&
                filteredMembers.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.birthday}</td>
                    <td>{user.month_student_count}</td>
                    <td>{user.month_course_count}</td>
                    <td>{user.join_date || "-"}</td>
                    <td style={{ display: "flex" }}>
                      <button
                        className={clsx(styles.btn, styles.edit)}
                        onClick={() => setEditingUser(user)}
                      >
                        编辑
                      </button>{" "}
                      <button
                        className={clsx(styles.btn, styles.edit)}
                        onClick={() => {
                          openCoachCoursePopup(user.name);
                        }} //查看该月的课程和对应人数
                      >
                        查看
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
        <div className={popupStyle["popup-overlay"]}>
          <div className={popupStyle["popup-card"]}>
            <h3>充值/会员</h3>
            <form>
              <div className={popupStyle["edit-row"]}>
                <span className={popupStyle["labelOnly"]}>
                  名字： {chargingMember.name}
                </span>
              </div>

              <div className={popupStyle["edit-row"]}>
                <label>配套:</label>
                <select
                  name="package"
                  className={popupStyle["form-input"]}
                  value={chargePackage}
                  onChange={(e) => setChargePackage(e.target.value)}
                  required
                >
                  {packages.map((p: any) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={popupStyle["edit-row"]}>
                <label>充值:</label>
                <input
                  type="number"
                  className={popupStyle["form-input"]}
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(Number(e.target.value))}
                  required
                />
              </div>

              <div className={popupStyle["popup-actions"]}>
                <button
                  type="button"
                  className={clsx(popupStyle.btn, popupStyle.confirm)}
                  onClick={() => handleChargeConfirm()}
                >
                  确认
                </button>
                <button
                  type="button"
                  className={clsx(popupStyle.btn, popupStyle["close-btn"])}
                  onClick={() => setChargingMember(null)}
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewCoachCourse && (
        <div className={popupStyle["popup-overlay"]}>
          <div className={popupStyle["popup-card"]} style={{ minWidth: 420 }}>
            <h3>{viewCoachCourse.name} - 课堂明细</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <select
                className={popupStyle["select-year-month"]}
                value={viewCoachCourse.year}
                onChange={(e) =>
                  setViewCoachCourse((v) =>
                    v ? { ...v, year: Number(e.target.value) } : v
                  )
                }
              >
                {/* 只展示近3年，可根据需要扩展 */}
                {[2023, 2024, 2025].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                className={popupStyle["select-year-month"]}
                value={viewCoachCourse.month}
                onChange={(e) =>
                  setViewCoachCourse((v) =>
                    v ? { ...v, month: Number(e.target.value) } : v
                  )
                }
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} 月
                  </option>
                ))}
              </select>
              <button
                type="button"
                className={clsx(popupStyle.btn, popupStyle.confirm)}
                onClick={() => {
                  // 触发 useEffect
                  setViewCoachCourse((v) => (v ? { ...v } : v));
                }}
              >
                查询
              </button>
            </div>
            <div style={{ minHeight: 160 }}>
              {loadingCoachCourse ? (
                <div>加载中...</div>
              ) : coachCourses.length === 0 ? (
                <div style={{ color: "#aaa" }}>本月没有课程</div>
              ) : (
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>课程名</th>
                      <th>开课时间</th>
                      <th>学生人数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coachCourses.map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>
                          {c.start_time &&
                            c.start_time.slice(0, 16).replace("T", " ")}
                        </td>
                        <td>{c.student_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className={popupStyle["popup-actions"]}>
              <button
                type="button"
                className={clsx(popupStyle.btn, popupStyle["close-btn"])}
                onClick={() => setViewCoachCourse(null)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMember;
