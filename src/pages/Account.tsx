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
import { useTranslation } from "react-i18next";

const Account = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("account");
  const { user, logout, setPrevPage, setSelectedCourseId } = useAppContext();
  const [filterValue, setFilterValue] = useState("booked");
  const [ruleOpen, setRuleOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const filters = [
    { name: t("booked"), value: "booked" },
    { name: t("paid"), value: "paid" },
    { name: t("cancelled"), value: "cancelled" },
    { name: t("completed"), value: "completed" },
  ];

  const joinUs = () => {
    const phone = "60177615676"; // 改成你自己的手机号（马来西亚手机号前面加60）
    const message = t("joinUsWhatsapp");
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
        setTotalMinutes(res.data.total_minutes);
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
          <p>{t("notLoggedIn")}</p>
          <Link to="/login" className={styles["login-link"]}>
            {t("login")}
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
          <div className={styles["stat-label"]}>{t("myBalance")}</div>
          <div className={styles["stat-value"]}>
            RM {user.balance}
            <span className={styles["frozenBalance"]}>
              {" ("}
              {user.frozen_balance}
              {")"}{" "}
            </span>
          </div>
        </div>
        <div className={clsx(styles["stat-item"], styles["right"])}>
          <div className={styles["stat-label"]}>{t("myPoint")}</div>
          <div className={styles["stat-value"]}>{user.point}</div>
        </div>
      </div>

      <div className={styles["account-stats-section"]}>
        <div className={styles["stat-item"]}>
          {user.package != null ? (
            <>
              <div className={styles["stat-label"]}>{t("memberUntil")}</div>
              <div className={styles["stat-value"]}>{user.expire_date}</div>
            </>
          ) : (
            <>
              <div className={styles["stat-label"]}>{t("notMember")}</div>
              <div
                className={clsx(styles["stat-value"], styles["join-us"])}
                onClick={joinUs}
              >
                {t("joinUs")}
              </div>
            </>
          )}
        </div>
        <div className={clsx(styles["stat-item"], styles["right"])}>
          <div className={styles["stat-label"]}>{t("studyThisWeek")}</div>
          <div className={styles["stat-value"]}>
            {Math.floor(totalMinutes / 60) > 0
              ? `${Math.floor(totalMinutes / 60)} ${t("hours")}`
              : ""}
            {totalMinutes % 60 > 0
              ? `${totalMinutes % 60} ${t("minutes")}`
              : Math.floor(totalMinutes / 60) === 0
              ? `0 ${t("minutes")}`
              : ""}
            {}
          </div>
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
            {t("viewRules")}
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
            <p style={{ padding: "1rem" }}>{t("noRecord")}</p>
          ) : (
            courses
              .filter((item) => item.status === filterValue)
              .map((item: any) => (
                <div className={styles["course-card"]} key={item.booking_id}>
                  <img
                    src="/assets/gallery1.jpg"
                    alt="course background"
                    className={styles["course-bg"]}
                  />
                  <div className={styles["course-overlay"]}>
                    <h3 className={styles["course-title"]}>
                      {item.course_name}
                    </h3>
                    <p className={styles["course-info"]}>
                      {item.coach} ｜ {item.location}
                    </p>
                    <p className={styles["course-duration"]}>
                      {t("courseDuration")} <strong>{item.duration}</strong>{" "}
                      {t("minutesUnit")}
                    </p>
                    <p className={styles["course-difficulty"]}>
                      {t("courseDifficulty")}{" "}
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
                      {t("bookingHeadCount")} <strong>{item.head_count}</strong>{" "}
                      {t("peopleUnit")}
                    </p>
                    {/* 根据预约状态渲染按钮或标签 */}
                    <button
                      className={styles["book-button"]}
                      onClick={() => handleDetail(item.course_id)}
                    >
                      {t("viewCourse")}
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
        <a
          href="https://bestudiobp.com/be-rule/tnc.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", marginRight: 12 }}
          className={styles["footer-text"]}
        >
          Privacy Policy
        </a>
        <a
          href="https://bestudiobp.com/be-rule/privacy.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
          className={styles["footer-text"]}
        >
          T&amp;C
        </a>
      </div>

      {ruleOpen && (
        <div className={styles["rule-overlay"]}>
          <div className={styles["rule-container"]}>
            <span className={styles["rule-text"]}>{t("rulesContent")} </span>
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
