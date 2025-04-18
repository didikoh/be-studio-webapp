import { useAppContext } from "../contexts/AppContext";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";
import "./CourseDetail.css";

const CourseDetail = () => {
  const { selectedCourse } = useAppContext();
  const [bookpopupVisible, setBookPopupVisible] = useState(false);
  const [bookPeopleCount, setBookPeopleCount] = useState(0);

  if (!selectedCourse) {
    return <div className="detail-loading-container">课程加载中...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <button className="back-button" onClick={() => {}}>
          <MdArrowBack className="back-icon" />
        </button>
        <div className="detail-header-text">课程详情</div>
      </div>
      <div className="detail-banner">
        <img src={selectedCourse.image} alt="课程背景" className="detail-bg" />
      </div>
      <div className="detail-content">
        <div className="detail-card title">
          {" "}
          <div className="course-title-row">
            <h2>{selectedCourse.name}</h2>
            <span className="course-tag">团课</span>
            <span className="course-share">🔗 分享</span>
          </div>
          <div className="course-meta">
            <div>
              时长
              <br />
              <strong>{selectedCourse.duration} min</strong>
            </div>
            <div>
              容纳人数
              <br />
              <strong>{selectedCourse.capacity} 人</strong>
            </div>
            <div>
              难度
              <br />
              <strong>{selectedCourse.difficulty} ★</strong>
            </div>
          </div>
        </div>
        <div className="detail-card description">
          {" "}
          <div className="instructor-info">
            <img src="/assets/avatar-placeholder.png" className="avatar" />
            <div>
              <strong>{selectedCourse.instructor}</strong>
              <br />
              暂无简介
            </div>
          </div>
          <div className="desc-row">
            教室 <span>{selectedCourse.location}</span>
          </div>
          <div className="desc-row">
            简介 <span>暂无课程简介</span>
          </div>
        </div>
        <div className="detail-card details">
          {" "}
          <div className="info-row">
            上课时间：
            <span>
              今天 {selectedCourse.startTime} - {selectedCourse.endTime}
            </span>
            <button className="edit-button">🕓 修改时间</button>
          </div>
          <div className="info-row">
            地点：<span>一心工作室</span>
            <button className="map-button">📍 出发前往</button>
          </div>
          <div className="info-row">
            支付方式：<span>会员卡预约</span> ✅
          </div>
          <div className="info-row">
            选择会员卡：
            <select>
              <option>选择会员卡</option>
            </select>
          </div>
          <div className="info-row">
            预约人数：
            <button
              onClick={() =>
                setBookPeopleCount(Math.max(0, bookPeopleCount - 1))
              }
            >
              -
            </button>
            <span>{bookPeopleCount}</span>
            <button onClick={() => setBookPeopleCount(bookPeopleCount + 1)}>
              +
            </button>
          </div>
          <div className="info-row">
            预约备注：
            <input placeholder="请填写备注" maxLength={200} />
          </div>
        </div>
      </div>
      <div className="detail-footer">
        <button className="detail-book-button">立即预约</button>
      </div>

      {bookpopupVisible && (
        <div className="book-popup">
          <div className="popup-content">
            <h2>预约课程</h2>
            <p>课程名称: {selectedCourse.name}</p>
            <p>
              时间: {selectedCourse.startTime} - {selectedCourse.endTime}
            </p>
            <p>人数: {bookPeopleCount} 人</p>
            <div className="popup-btns">
              <button onClick={() => {}}>确认</button>
              <button onClick={() => setBookPopupVisible(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
