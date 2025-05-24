import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import styles from "./CoachAccount.module.css";
import { PiPen } from "react-icons/pi";
import AccountSetting from "../../components/AccountSetting";
import clsx from "clsx";
import { coach_rules_zh, coach_rules_en } from "../../assets/rules/rule";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CoachAccount = () => {
  const { t, i18n } = useTranslation("account");
  const { user, logout, setPrevPage, setSelectedCourseId, setLoading } =
    useAppContext();
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("0");
  const [ruleOpen, setRuleOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [classCountThisMonth, setClassCountThisMonth] = useState(0);
  const [studentCountThisMonth, setStudentCountThisMonth] = useState(0);

  const filters = [
    { name: t("coach.scheduled"), value: "0" },
    { name: t("coach.paid"), value: "1" },
    { name: t("completed"), value: "2" },
    { name: t("cancelled"), value: "-1" },
  ];

  const handleDetail = (course_id: any) => {
    setPrevPage("/coach_account");
    setSelectedCourseId(course_id);
    navigate("/coach_coursedetail");
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}coach/coach-get-course.php`, {
        user_id: user.id,
      })
      .then((res) => {
        setCourses(res.data.courses);
        setClassCountThisMonth(res.data.classCountThisMonth);
        setStudentCountThisMonth(res.data.studentCountThisMonth);
      })
      .catch((err) => alert("Error： " + err))
      .finally(() => setLoading(false));
  }, [user]);

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
          <div className={styles["stat-label"]}>
            {t("coach.classCountThisMonth")}
          </div>
          <div className={styles["stat-value"]}>{classCountThisMonth}</div>
        </div>
        <div className={clsx(styles["stat-item"], styles["right"])}>
          <div className={styles["stat-label"]}>
            {t("coach.studentCountThisMonth")}
          </div>
          <div className={styles["stat-value"]}>{studentCountThisMonth}</div>
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
            {t("coach.viewCoachRules")}
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
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.filter((item) => item.state == filterValue).length === 0 ? (
              <p style={{ padding: "1rem" }}>{t("noRecord")}</p>
            ) : (
              courses
                .filter((item) => item.state == filterValue)
                .map((item: any) => (
                  <div className={styles["course-card"]} key={item.id}>
                    <img
                      src="/assets/gallery1.jpg"
                      alt="course background"
                      className={styles["course-bg"]}
                    />
                    <div className={styles["course-overlay"]}>
                      <h3 className={styles["course-title"]}>{item.name}</h3>
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
                        {t("bookingHeadCount")}{" "}
                        <strong>{item.booking_count}</strong>
                        {t("peopleUnit")}
                      </p>
                      {/* 根据预约状态渲染按钮或标签 */}
                      <button
                        className={styles["book-button"]}
                        onClick={() => handleDetail(item.id)}
                      >
                        {t("viewCourse")}
                      </button>
                    </div>
                  </div>
                ))
            )
          ) : (
            <p style={{ padding: "1rem" }}>{t("noRecord")}</p>
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
            <span className={styles["rule-text"]}>
              {" "}
              {i18n.language.startsWith("zh") ? coach_rules_zh : coach_rules_en}
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

export default CoachAccount;
