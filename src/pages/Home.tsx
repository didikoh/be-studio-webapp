import { FaFacebook, FaPhone } from "react-icons/fa";
import clsx from "clsx";
import homeStyle from "./Home.module.css";
import { ImInstagram } from "react-icons/im";

const Home = () => {
  return (
    <div className={homeStyle["student-homepage"]}>
      <div className={clsx(homeStyle["home-card"], homeStyle["studio-intro-card"])}>
        <div className={homeStyle["studio-header"]}>
          <img
            src="./assets/logo/logo.jpg"
            alt="logo"
            className={homeStyle["studio-logo"]}
          />
          <div className={homeStyle["studio-info"]}>
            <div className={homeStyle["studio-name"]}>
              Be Studio
            </div>
            <div className={homeStyle["studio-contact"]}>
              联系人：xiaohann
            </div>
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
            className={clsx(
              homeStyle["social-icon-btn"],
              homeStyle["insta"]
            )}
            onClick={() => window.open("https://wa.me/0123456789", "_blank")}
          >
            <ImInstagram className={homeStyle["social-icon"]} />
          </button>
          <button
            className={clsx(
              homeStyle["social-icon-btn"],
              homeStyle["facebook"]
            )}
            onClick={() => window.open("https://wa.me/0123456789", "_blank")}
          >
            <FaFacebook className={homeStyle["social-icon"]} />
          </button>
        </div>
      </div>

      {/* mybalance */}
      <div className={clsx(homeStyle["home-card"], homeStyle["balance-card"])}>
        <div className={homeStyle["balance-box"]}>
          <div className={homeStyle["balance-header"]}>
            余额
          </div>
          <div className={homeStyle["balance-amount"]}>
            RM 100.00
          </div>
        </div>
        <div className={clsx(homeStyle["balance-box"], homeStyle["right"])}>
          <div className={homeStyle["balance-header"]}>
            积分
          </div>
          <div className={homeStyle["balance-amount"]}>
            2
          </div>
        </div>
      </div>
      {/* my appointment */}
      <div className={clsx(homeStyle["home-card"], homeStyle["appointment-card"])}>
        <div className={homeStyle["appointment-header"]}>
          我的预约
        </div>
        <div className={homeStyle["appointment-list"]}>
          <div className={homeStyle["course-card"]}>
            <img
              src="/assets/gallery1.jpg"
              alt="课程背景"
              className={homeStyle["course-bg"]}
            />
            <div className={homeStyle["course-overlay"]}>
              <h3 className={homeStyle["course-title"]}>
                Aerial Music Flow
              </h3>
              <p className={homeStyle["course-info"]}>
                Rui老师 ｜ 空中教室
              </p>
              <p className={homeStyle["course-duration"]}>
                课程时长 <strong>60</strong> 分钟
              </p>
              <p className={homeStyle["course-difficulty"]}>
                课程难度
                <span className={homeStyle["stars"]}>
                  ⭐ ⭐
                </span>
              </p>
              <button className={homeStyle["book-button"]}>
                立即预约
              </button>
              <div className={homeStyle["course-tag"]}>
                团课
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* courses recommend */}
      <div className={clsx(homeStyle["home-card"], homeStyle["courses-card"])}>
        <div className={homeStyle["courses-header"]}>
          推荐课程
        </div>
        <div className={homeStyle["courses-list"]}>
          <div className={homeStyle["course-card"]}>
            <img
              src="/assets/gallery1.jpg"
              alt="课程背景"
              className={homeStyle["course-bg"]}
            />
            <div className={homeStyle["course-overlay"]}>
              <h3 className={homeStyle["course-title"]}>
                Aerial Music Flow
              </h3>
              <p className={homeStyle["course-info"]}>
                Rui老师 ｜ 空中教室
              </p>
              <p className={homeStyle["course-duration"]}>
                课程时长 <strong>60</strong> 分钟
              </p>
              <p className={homeStyle["course-difficulty"]}>
                课程难度
                <span className={homeStyle["stars"]}>
                  ⭐ ⭐
                </span>
              </p>
              <button className={homeStyle["book-button"]}>
                立即预约
              </button>
              <div className={homeStyle["course-tag"]}>
                团课
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

