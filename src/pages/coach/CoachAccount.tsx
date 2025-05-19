import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import styles from "./CoachAccount.module.css";
import { PiPen } from "react-icons/pi";
import AccountSetting from "../../components/AccountSetting";
import clsx from "clsx";
import { coach_rules } from "../../assets/rules/rule";
import axios from "axios";

const CoachAccount = () => {
  const { user, logout, setPrevPage, setSelectedCourseId } = useAppContext();
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("0");
  const [ruleOpen, setRuleOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);

  const filters = [
    { name: "已排程", value: "0" },
    { name: "已收款", value: "1" },
    { name: "进行中", value: "2" },
    { name: "已完成", value: "3" },
  ];

  const handleDetail = (course_id: any) => {
    setPrevPage("/coach_account");
    setSelectedCourseId(course_id);
    navigate("/coach_coursedetail");
  };

  useEffect(() => {
    console.log(user);
    if (!user) {
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}coach/coach-get-course.php`, {
        user_id: user.id,
      })
      .then((res) => {
        setCourses(res.data.courses);
        console.log(res.data);
      });
  }, [user]);

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
              console.log(settingOpen);
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
          <div className={styles["stat-label"]}>本月课堂数</div>
          <div className={styles["stat-value"]}>10</div>
        </div>
        <div className={clsx(styles["stat-item"], styles["right"])}>
          <div className={styles["stat-label"]}>本月学生人数</div>
          <div className={styles["stat-value"]}>200</div>
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
            查看教师规则
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
          {courses.filter((item) => item.state == filterValue).length === 0 ? (
            <p style={{ padding: "1rem" }}>暂无记录</p>
          ) : (
            courses
              .filter((item) => item.state == filterValue)
              .map((item: any) => (
                <div className={styles["course-card"]} key={item.id}>
                  <img
                    src="/assets/gallery1.jpg"
                    alt="课程背景"
                    className={styles["course-bg"]}
                  />
                  <div className={styles["course-overlay"]}>
                    <h3 className={styles["course-title"]}>{item.name}</h3>
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
                      预约人数 <strong>{item.booking_count}</strong> 人
                    </p>
                    {/* 根据预约状态渲染按钮或标签 */}
                    <button
                      className={styles["book-button"]}
                      onClick={() => handleDetail(item.id)}
                    >
                      查看课程
                    </button>
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
            <span className={styles["rule-text"]}>{coach_rules}</span>
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

export default CoachAccount;
