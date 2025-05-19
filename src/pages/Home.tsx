import { FaFacebook, FaPhone } from "react-icons/fa";
import clsx from "clsx";
import homeStyle from "./Home.module.css";
import { ImInstagram } from "react-icons/im";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { user, setSelectedCourseId, setPrevPage } = useAppContext();
  const [booked, SetBooked] = useState<any[]>([]);
  const [recommended, SetRecommended] = useState<any[]>([]);
  // const { t, i18n } = useTranslation();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}home-courses.php`, {
        phone: user ? user.phone : null,
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
      alert("请先登录");
      navigate("/login");
      return;
    }

    const phone = "60177615676"; // 改成你自己的手机号（马来西亚手机号前面加60）
    const message = "你好，我想加入会员";
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
            <div className={homeStyle["studio-contact"]}>联系人：xiaohann</div>
          </div>
        </div>

        <div className={homeStyle["studio-status"]}>
          <span className={clsx(homeStyle["badge"], homeStyle["closed"])}>
            休息中
          </span>
          <span className={homeStyle["studio-time"]}>
            周一至周日 08:00-21:00
          </span>
        </div>

        <div className={homeStyle["studio-detail"]}>
          <div className={homeStyle["studio-detail-left"]}>
            <div className={homeStyle["studio-phone"]}>
              联系方式：<span>0123456789</span>
            </div>
            <div className={homeStyle["studio-address"]}>
              场馆地址：<span>Batu Pahat</span>
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
            <div className={homeStyle["balance-header"]}>余额</div>
            <div className={homeStyle["balance-amount"]}>RM {user.balance}{" {"}{user.frozen_balance}{"}"} </div>
          </div>
          <div className={clsx(homeStyle["balance-box"], homeStyle["right"])}>
            <div className={homeStyle["balance-header"]}>积分</div>
            <div className={homeStyle["balance-amount"]}>{user.point}</div>
          </div>
        </div>
      ) : (
        <div
          className={clsx(homeStyle["home-card"], homeStyle["balance-card"])}
        >
          <div className={homeStyle["balance-box"]}>
            <div className={homeStyle["balance-header"]}>变得更好?</div>
            <button className={homeStyle["join-us"]} onClick={joinUs}>
              加入我们!
            </button>
          </div>
        </div>
      )}
      {/* my appointment */}
      <div
        className={clsx(homeStyle["home-card"], homeStyle["appointment-card"])}
      >
        <div className={homeStyle["appointment-header"]}>我的预约</div>
        <div className={homeStyle["appointment-list"]}>
          {booked && booked.length === 0 ? (
            <p style={{ padding: "1rem" }}>暂无预约记录</p>
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
                    课程时长 <strong>{course.duration}</strong> 分钟
                  </p>
                  <p className={homeStyle["course-difficulty"]}>
                    课程难度{" "}
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
                    预约人数 <strong>{course.head_count}</strong> 人
                  </p>
                  <button
                    className={homeStyle["book-btn"]}
                    onClick={() => handleDetail(course.course_id)}
                  >
                    查看课程
                  </button>
                  {/* 如果你要允许取消预约，可以放一个按钮 */}
                  {/* <div className={homeStyle["course-tag"]}>已预约</div> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* courses recommend */}
      <div className={clsx(homeStyle["home-card"], homeStyle["courses-card"])}>
        <div className={homeStyle["courses-header"]}>推荐课程</div>
        <div className={homeStyle["courses-list"]}>
          {recommended.length === 0 ? (
            <p style={{ padding: "1rem" }}>暂无推荐课程</p>
          ) : (
            recommended.map((course, index) => (
              <div className={homeStyle["course-card"]} key={index}>
                <img
                  src="/assets/gallery1.jpg" // 可按 course.name 动态选择图
                  alt="课程背景"
                  className={homeStyle["course-bg"]}
                />
                <div className={homeStyle["course-overlay"]}>
                  <h3 className={homeStyle["course-title"]}>{course.name}</h3>
                  <p className={homeStyle["course-info"]}>
                    {course.coach}老师 ｜ {course.location}
                  </p>
                  <p className={homeStyle["course-duration"]}>
                    课程时长 <strong>{course.duration}</strong> 分钟
                  </p>
                  <p className={homeStyle["course-difficulty"]}>
                    课程难度{" "}
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
                    当前预约 <strong>{course.booking_count}</strong> 人
                  </p>
                  <button
                    className={homeStyle["book-btn"]}
                    onClick={() => handleDetail(course.id)}
                  >
                    立即预约
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
