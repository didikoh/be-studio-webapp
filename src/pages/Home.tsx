import { FaPhone } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="student-homepage">
      <div className="home-card studio-intro-card">
        <div className="studio-header">
          <img
            src="./assets/logo/logo.jpg"
            alt="logo"
            className="studio-logo"
          />
          <div className="studio-info">
            <div className="studio-name">Be Studio</div>
            <div className="studio-contact">联系人：xiaohann</div>
          </div>
        </div>

        <div className="studio-status">
          <span className="badge closed">休息中</span>
          <span className="studio-time">周一至周日 08:00-21:00</span>
        </div>

        <div className="studio-detail">
          <div className="studio-detail-left">
            <div className="studio-phone">
              联系方式：<span>0123456789</span>{" "}
            </div>
            <div className="studio-address">
              场馆地址：<span>Batu Pahat</span>
            </div>
          </div>
          <div className="studio-detail-right">
            <button
              className="phone-icon-btn"
              onClick={() => window.open("https://wa.me/0123456789", "_blank")}
            >
              <FaPhone className="phone-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* mybalance */}
      <div className="home-card balance-card">
        <div className="balance-header">我的余额</div>
        <div className="balance-amount">RM 100.00</div>
      </div>
      {/* my appointment */}
      <div className="home-card appointment-card">
        <div className="appointment-header">我的预约</div>
        <div className="appointment-list">
          <div className="course-card">
            <img
              src="/assets/gallery1.jpg"
              alt="课程背景"
              className="course-bg"
            />
            <div className="course-overlay">
              <h3 className="course-title">Aerial Music Flow</h3>
              <p className="course-info">Rui老师 ｜ 空中教室</p>
              <p className="course-duration">
                课程时长 <strong>60</strong> 分钟
              </p>
              <p className="course-difficulty">
                课程难度
                <span className="stars">⭐ ⭐</span>
              </p>
              <button className="book-button">立即预约</button>
              <div className="course-tag">团课</div>
            </div>
          </div>
        </div>
      </div>
      {/* courses recommend */}
      <div className="home-card courses-card">
        <div className="courses-header">推荐课程</div>
        <div className="courses-list">
          <div className="course-card">
            <img
              src="/assets/gallery1.jpg"
              alt="课程背景"
              className="course-bg"
            />
            <div className="course-overlay">
              <h3 className="course-title">Aerial Music Flow</h3>
              <p className="course-info">Rui老师 ｜ 空中教室</p>
              <p className="course-duration">
                课程时长 <strong>60</strong> 分钟
              </p>
              <p className="course-difficulty">
                课程难度
                <span className="stars">⭐ ⭐</span>
              </p>
              <button className="book-button">立即预约</button>
              <div className="course-tag">团课</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
