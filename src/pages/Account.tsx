import { useNavigate, Link } from "react-router-dom";
import styles from "./Account.module.css";
import { useAppContext } from "../contexts/AppContext";
import { LuLogOut } from "react-icons/lu";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import AccountSetting from "../components/AccountSetting";
import { PiPen } from "react-icons/pi";
import clsx from "clsx";
import axios from "axios";

const Account = () => {
  const navigate = useNavigate();
  const { user, logout, setPrevPage, setSelectedCourseId } = useAppContext();
  const [filterValue, setFilterValue] = useState("booked");
  const [ruleOpen, setRuleOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);

  const filters = [
    { name: "已预约", value: "booked" },
    { name: "已付款", value: "paid" },
    { name: "进行中", value: "ongoing" },
    { name: "已完成", value: "completed" },
  ];

  const joinUs = () => {
    const phone = "60177615676"; // 改成你自己的手机号（马来西亚手机号前面加60）
    const message = "你好，我想加入会员";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.role !== "student") {
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}get-course-account.php`, {
        student_id: user.id,
      })
      .then((res) => {
        setCourses(res.data.bookings);
        console.log(res.data);
      });
  }, [user]);

  const handleDetail = (course_id: any) => {
    setPrevPage("/account");
    setSelectedCourseId(course_id);
    navigate("/coursedetail");
  };

  if (!user) {
    return (
      <div
        className={clsx(styles["account-container"], styles["not-logged-in"])}
      >
        <div className={styles["account-box"]}>
          <p>尚未登录</p>
          <Link to="/login" className={styles["login-link"]}>
            去登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["dashboard-header"]}>
        <div className={styles["user-info"]}>
          <div className={styles["avatar"]}>
            <img
              src={
                user.profile_pic
                  ? import.meta.env.VITE_API_BASE_URL + user.profile_pic
                  : "/assets/Avatar/Default.webp"
              }
              alt="avatar"
            />
          </div>
          <div className={styles["login-text"]}>
            {user.name}
            <br />
            <span>{user.phone}</span>
          </div>
        </div>

        <div className={styles["account-dashboard-btns"]}>
          <button
            className={styles["account-dashboard-btn"]}
            onClick={() => {
              setSettingOpen(true);
            }}
          >
            <PiPen />
          </button>
          <button
            className={styles["account-dashboard-btn"]}
            onClick={async () => {
              await logout();
            }}
          >
            <LuLogOut />
          </button>
        </div>
      </div>

      <div className={styles["account-stats-section"]}>
        <div className={styles["stat-item"]}>
          <div className={styles["stat-label"]}>我的余额</div>
          <div className={styles["stat-value"]}>
            RM {user.balance}
            {" {"}
            {user.frozen_balance}
            {"}"}{" "}
          </div>
        </div>
        <div className={clsx(styles["stat-item"], styles["right"])}>
          <div className={styles["stat-label"]}>我的积分</div>
          <div className={styles["stat-value"]}>{user.point}</div>
        </div>
      </div>

      <div className={styles["account-stats-section"]}>
        <div className={styles["stat-item"]}>
          {user.package != null ? (
            <>
              <div className={styles["stat-label"]}>会员截至</div>
              <div className={styles["stat-value"]}>{user.expire_date}</div>
            </>
          ) : (
            <>
              <div className={styles["stat-label"]}>不是会员？</div>
              <div
                className={clsx(styles["stat-value"], styles["join-us"])}
                onClick={joinUs}
              >
                加入我们
              </div>
            </>
          )}
        </div>
        <div className={clsx(styles["stat-item"], styles["right"])}>
          <div className={styles["stat-label"]}>本周学习</div>
          <div className={styles["stat-value"]}>0 分钟</div>
        </div>
      </div>

      <div className={clsx(styles["account-stats-section"], styles["rule"])}>
        <div className={clsx(styles["stat-item"], styles["rule"])}>
          <div
            className={clsx(styles["stat-value"], styles["rule"])}
            onClick={() => {
              setRuleOpen(true);
            }}
          >
            查看会员规则
          </div>
        </div>
      </div>

      <div className={styles["account-couses-section"]}>
        <div className={styles["account-couses-strip"]}>
          {filters.map((item, index) => (
            <button
              className={clsx(
                styles["account-couses-filter"],
                filterValue === item.value && styles["active"]
              )}
              key={index}
              onClick={() => setFilterValue(item.value)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className={styles["account-couses-list"]}>
          {courses.filter((item) => item.status === filterValue).length ===
          0 ? (
            <p style={{ padding: "1rem" }}>暂无记录</p>
          ) : (
            courses
              .filter((item) => item.status === filterValue)
              .map((item: any) => (
                <div className={styles["course-card"]} key={item.booking_id}>
                  <img
                    src="/assets/gallery1.jpg"
                    alt="课程背景"
                    className={styles["course-bg"]}
                  />
                  <div className={styles["course-overlay"]}>
                    <h3 className={styles["course-title"]}>
                      {item.course_name}
                    </h3>
                    <p className={styles["course-info"]}>
                      {item.coach}老师 ｜ {item.location}
                    </p>
                    <p className={styles["course-duration"]}>
                      课程时长 <strong>{item.duration}</strong> 分钟
                    </p>
                    <p className={styles["course-difficulty"]}>
                      课程难度{" "}
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            star <= item.difficulty
                              ? styles["star-filled"]
                              : styles["star"]
                          }
                        >
                          ★
                        </span>
                      ))}
                    </p>
                    <p className={styles["course-duration"]}>
                      预约人数 <strong>{item.head_count}</strong> 人
                    </p>
                    {/* 根据预约状态渲染按钮或标签 */}
                    {item.status === "booked" ? (
                      <button
                        className={styles["book-button"]}
                        onClick={() => handleDetail(item.course_id)}
                      >
                        查看课程
                      </button>
                    ) : (
                      <>
                        {/*  <div className={styles["course-tag"]}>
                         {item.status === "attended"
                           ? "已上课"
                           : item.status === "cancelled"
                           ? "已取消"
                           : "已缺席"}
                       </div> */}
                      </>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      <div className={styles["footer-text"]}>
        Be Studio 2025 All Rights Reserved
        <br />
      </div>

      {ruleOpen && (
        <div className={styles["rule-overlay"]}>
          <div className={styles["rule-container"]}>
            <span className={styles["rule-text"]}>
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,
              会员规则, 会员规则, 会员规则, 会员规则, 会员规则, 会员规则,{" "}
            </span>
            <button
              className={styles["close-rule-button"]}
              onClick={() => setRuleOpen(false)}
            >
              <CgClose className={styles["close-icon"]} />
            </button>
          </div>
        </div>
      )}

      {settingOpen && <AccountSetting setSettingOpen={setSettingOpen} />}
    </div>
  );
};

export default Account;
