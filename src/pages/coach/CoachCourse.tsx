import { mockCourses } from "../../mocks/courses";
import classes from "./CoachCourse.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import clsx from "clsx";

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
    <div className={classes["course-container"]}>
      <div className={classes["header"]}>
        <div className={classes["header-text"]}>
          我的课程
          <br />
          {getDateRangeString()}
        </div>
      </div>
      <div className={classes["course-list"]}>
        {mockCourses.map((course) => course.instructor === "Ivy Tan" && (
          <div
            className={clsx(
              classes["course-card"],
            )}
            key={course.id}
          >
            <img
              src={course.image}
              alt="课程背景"
              className={classes["course-bg"]}
            />
            <div className={classes["course-overlay"]}>
              <div className={classes["course-time"]}>
                {course.startTime + "-" + course.endTime}
              </div>
              <div className={classes["course-header"]}>
                <div className={classes["course-title"]}>{course.name}</div>
              </div>
              <div className={classes["course-info"]}>
                <span>{course.instructor}</span>
                <span> | </span>
                <span>{course.location}</span>
              </div>
              <div className={classes["course-difficulty"]}>
                课程难度：
                {[1, 2, 3].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= course.difficulty
                        ? clsx(
                            classes["star"],
                            classes["star-filled"]
                          )
                        : classes["star"]
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className={classes["course-attend"]}>
                <span className={classes["attend-count"]}>
                  已预约人数：{course.bookedCount}
                </span>
              </div>
              <div className={classes["course-attend"]}>
                <span className={classes["attend-count"]}>
                  需开班人数：{course.minCapacity}
                </span>
              </div>
              <button
                className={classes["book-button"]}
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

