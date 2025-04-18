import React, { useState } from "react";
import dayjs from "dayjs";
import "./Schedule.css";
import { mockCourses } from "../mocks/courses";
import { MdCalendarToday } from "react-icons/md"; // 加在 import 区域
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Schedule = () => {
  const navigate = useNavigate();
  const {setSelectedCourse} = useAppContext();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const weekDates = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day"));

  const bookBtnClickHandler = (course:any) => {
    setSelectedCourse(course);
    navigate("/coursedetail");
  }

  return (
    <div className="schedule-container">
      <div className="schedule-card">
        {/* <div className="schedule-header">
          <button className="schedule-calendar-button">
            <MdCalendarToday className="schedule-calendar-icon" />
          </button>
        </div> */}
        <div className="date-strip">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`date-item ${
                selectedDate.isSame(date, "date") ? "active" : ""
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="day-number">{date.date()}</div>
              <div className="day-week">{date.format("dd")}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="course-list">
        {mockCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <img
              src={course.image}
              alt="课程背景"
              className="course-bg"
            />
            <div className="course-overlay">
              <div className="course-time">
                {course.startTime + "-" + course.endTime}
              </div>
              <div className="course-header">
                <div className="course-title">{course.name}</div>
              </div>
              <div className="course-info">
                <span>{course.instructor}</span>
                <span> | </span>
                <span>{course.location}</span>
              </div>
              <div className="course-difficulty">
                课程难度：
                {[1, 2, 3].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= course.difficulty ? "star filled" : "star"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="course-attend">
                <span className="attend-count">
                  已预约人数：{course.bookedCount}
                </span>
              </div>
              <button className="book-button" onClick={() => {bookBtnClickHandler(course)}}>立即预约</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
