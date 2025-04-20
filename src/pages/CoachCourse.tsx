import React from 'react'
import { mockCourses } from '../mocks/courses'
import "./CoachCourse.css"
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'

const CoachCourse = () => {
   const navigate = useNavigate()
    const { setSelectedCourse } = useAppContext()

   const handleDetail = (course: any) => {
    setSelectedCourse(course);
    navigate("/coach_coursedetail")
   }
  return (
    <div className="c_course-container">
      <div className="c_course-list">
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
              <button className="book-button" onClick={() => {handleDetail(course)}}>课程详细</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoachCourse