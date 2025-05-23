import { FaFacebook, FaPhone } from "react-icons/fa";
import clsx from "clsx";
import homeStyle from "./Home.module.css";
import { ImInstagram } from "react-icons/im";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";

function isStudioOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (day >= 1 && day <= 5) {
    if (
      (hour > 17 || (hour === 17 && minute >= 0)) &&
      (hour < 21 || (hour === 21 && minute < 30))
    ) {
      return true;
    }
  }
  return false;
}

const Home = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const { user, setSelectedCourseId, setPrevPage } = useAppContext();
  const [booked, SetBooked] = useState<any[]>([]);
  const [recommended, SetRecommended] = useState<any[]>([]);
  const studioOpen = isStudioOpen();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}home-courses.php`, {
        id: user ? user.id : null,
      })
      .then((res) => {
        console.log(res.data);
        SetBooked(res.data.my_bookings);
        SetRecommended(res.data.recommended);
      });
  }, [user]);

  const handleDetail = (course_id: any) => {
    setPrevPage("/home");
    console.log(course_id);
    setSelectedCourseId(course_id);
    navigate("/coursedetail");
  };

  const joinUs = () => {
    if (!user) {
      navigate("/register");
      return;
    }

    const phone = "60177615676"; // 改成你自己的手机号（马来西亚手机号前面加60）
    const message = t("joinUsWhatsapp");
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  return (
    <div className={homeStyle["student-homepage"]}>
      <div
        className={clsx(homeStyle["home-card"], homeStyle["studio-intro-card"])}
      >
        <div className={homeStyle["studio-header"]}>
          <img
            src="./assets/logo/logo.jpg"
            alt="logo"
            className={homeStyle["studio-logo"]}
          />
          <div className={homeStyle["studio-info"]}>
            <div className={homeStyle["studio-name"]}>Be Studio</div>
            <div className={homeStyle["studio-contact"]}>
              {t("contactAdmin")}：xiaohann
            </div>
          </div>
        </div>

        <div className={homeStyle["studio-status"]}>
          <span
            className={clsx(
              homeStyle["badge"],
              homeStyle[studioOpen ? "open" : "closed"]
            )}
          >
            {studioOpen ? t("open") : t("rest")}
          </span>
          <span className={homeStyle["studio-time"]}>
            {t("operationDate")} 17:00-21:30
          </span>
        </div>

        <div className={homeStyle["studio-detail"]}>
          <div className={homeStyle["studio-detail-left"]}>
            <div className={homeStyle["studio-phone"]}>
              {t("contact")}：<span>0123456789</span>
            </div>
            <div className={homeStyle["studio-address"]}>
              {t("address")}：<span>Batu Pahat</span>
            </div>
          </div>
        </div>

        <div className={homeStyle["studio-social"]}>
          <button
            className={clsx(
              homeStyle["social-icon-btn"],
              homeStyle["whatsapp"]
            )}
            onClick={() => window.open("https://wa.me/0123456789", "_blank")}
          >
            <FaPhone className={homeStyle["social-icon"]} />
          </button>
          <button
            className={clsx(homeStyle["social-icon-btn"], homeStyle["insta"])}
            onClick={() =>
              window.open("https://www.instagram.com/befitness_bp/", "_blank")
            }
          >
            <ImInstagram className={homeStyle["social-icon"]} />
          </button>
          <button
            className={clsx(
              homeStyle["social-icon-btn"],
              homeStyle["facebook"]
            )}
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=100083076293256",
                "_blank"
              )
            }
          >
            <FaFacebook className={homeStyle["social-icon"]} />
          </button>
        </div>
      </div>

      {/* mybalance */}

      {user && user.package != null ? (
        <div
          className={clsx(homeStyle["home-card"], homeStyle["balance-card"])}
        >
          <div className={homeStyle["balance-box"]}>
            <div className={homeStyle["balance-header"]}>{t("section2.balance")}</div>
            <div className={homeStyle["balance-amount"]}>
              RM{" "}
              {user.balance !== undefined
                ? Number(user.balance).toLocaleString("en-MY")
                : "0"}
              <p style={{ color: "blue" }}>
                {" ("}
                {user.frozen_balance}
                {")"}{" "}
              </p>
            </div>
          </div>
          <div className={clsx(homeStyle["balance-box"], homeStyle["right"])}>
            <div className={homeStyle["balance-header"]}>{t("section2.point")}</div>
            <div className={homeStyle["balance-amount"]}>{user.point}</div>
          </div>
        </div>
      ) : (
        <div
          className={clsx(homeStyle["home-card"], homeStyle["balance-card"])}
        >
          <div className={homeStyle["balance-box"]}>
            <div className={homeStyle["balance-header"]}>{t("section2.title")}</div>
            <button className={homeStyle["join-us"]} onClick={joinUs}>
              {t("section2.joinUs")}
            </button>
          </div>
        </div>
      )}
      {/* my appointment */}
      <div
        className={clsx(homeStyle["home-card"], homeStyle["appointment-card"])}
      >
        <div className={homeStyle["appointment-header"]}>{t("section3/4.title3")}</div>
        <div className={homeStyle["appointment-list"]}>
          {booked && booked.length === 0 ? (
            <p style={{ padding: "1rem" }}>{t("section3/4.noData3")}</p>
          ) : (
            booked.map((course: any, index: number) => (
              <div className={homeStyle["course-card"]} key={index}>
                <img
                  src="/assets/gallery1.jpg" // TODO: 你可以根据课程名加载不同图
                  alt="课程背景"
                  className={homeStyle["course-bg"]}
                />
                <div className={homeStyle["course-overlay"]}>
                  <h3 className={homeStyle["course-title"]}>{course.name}</h3>
                  <p className={homeStyle["course-info"]}>
                    {course.coach} ｜ {course.location}
                  </p>
                  <p className={homeStyle["course-duration"]}>
                    {t("section3/4.duration")}：<strong>{course.duration}</strong> {t("section3/4.minute")}
                  </p>
                  <p className={homeStyle["course-difficulty"]}>
                    {t("section3/4.difficulty")}：{" "}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= course.difficulty
                            ? homeStyle["star-filled"]
                            : homeStyle["star"]
                        }
                      >
                        ★
                      </span>
                    ))}
                  </p>
                  <p className={homeStyle["course-duration"]}>
                    {t("section3/4.headCount3")}： <strong>{course.head_count}</strong>
                  </p>
                  <button
                    className={homeStyle["book-btn"]}
                    onClick={() => handleDetail(course.course_id)}
                  >
                    {t("section3/4.view")}
                  </button>
                  {/* <div className={homeStyle["course-tag"]}>已预约</div> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* courses recommend */}
      <div className={clsx(homeStyle["home-card"], homeStyle["courses-card"])}>
        <div className={homeStyle["courses-header"]}>{t("section3/4.title4")}</div>
        <div className={homeStyle["courses-list"]}>
          {recommended.length === 0 ? (
            <p style={{ padding: "1rem" }}>{t("section3/4.noData4")}</p>
          ) : (
            recommended.map((course, index) => (
              <div className={homeStyle["course-card"]} key={index}>
                <img
                  src="/assets/gallery1.jpg" // 可按 course.name 动态选择图
                  alt="background"
                  className={homeStyle["course-bg"]}
                />
                <div className={homeStyle["course-overlay"]}>
                  <h3 className={homeStyle["course-title"]}>{course.name}</h3>
                  <p className={homeStyle["course-info"]}>
                    {course.coach} ｜ {course.location}
                  </p>
                  <p className={homeStyle["course-duration"]}>
                    {t("section3/4.duration")}： <strong>{course.duration}</strong> {t("section3/4.minute")}
                  </p>
                  <p className={homeStyle["course-difficulty"]}>
                    {t("section3/4.difficulty")}：{" "}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= course.difficulty
                            ? homeStyle["star-filled"]
                            : homeStyle["star"]
                        }
                      >
                        ★
                      </span>
                    ))}
                  </p>
                  <p className={homeStyle["course-duration"]}>
                    {t("section3/4.headCount4")}： <strong>{course.booking_count}</strong>
                  </p>
                  <button
                    className={homeStyle["book-btn"]}
                    onClick={() => handleDetail(course.id)}
                  >
                    {t("section3/4.book")}
                  </button>
                  {/* <div className={homeStyle["course-tag"]}>推荐</div> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
