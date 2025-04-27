import { mockCourses } from "../../mocks/courses";
import "./CoachCourse.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const CoachCourse = () => {
  const navigate = useNavigate();
  const { setSelectedCourse } = useAppContext();

  const handleDetail = (course: any) => {
    setSelectedCourse(course);
    navigate("/coach_coursedetail");
  };

  const getDateRangeString = (): string => {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    const format = (date: Date) => {
      const month = date.getMonth() + 1; // 月份从0开始所以要+1
      const day = date.getDate();
      return `${month}/${day}`;
    };

    return `${format(today)} ~ ${format(sevenDaysLater)}`;
  };
  return (
    <div className="c_course-container">
      <div className="event-header">
        <div className="event-header-text">
          我的课程
          <br />
          {getDateRangeString()}
        </div>
      </div>
      <div className="c_course-list">
        {mockCourses.map((course) => course.instructor === "Ivy Tan" && (
          <div className="course-card" key={course.id}>
            <img src={course.image} alt="课程背景" className="course-bg" />
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
              <div className="course-attend">
                <span className="attend-count">
                  需开班人数：{course.minCapacity}
                </span>
              </div>
              <button
                className="book-button"
                onClick={() => {
                  handleDetail(course);
                }}
              >
                课程详细
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachCourse;
