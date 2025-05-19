import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./Schedule.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import clsx from "clsx";

const Schedule = () => {
  const navigate = useNavigate();
  const { user, setSelectedCourseId, setPrevPage } = useAppContext();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const weekDates = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day"));
  const filteredCourses = () => {
    if (courses.length === 0) return [];
    return courses.filter((course) =>
      dayjs(course.start_time).isSame(selectedDate, "day")
    );
  };

  useEffect(() => {
    const phone = user ? user.phone : null;
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}get-course.php`, {
        phone: phone,
      })
      .then((res) => {
        console.log(res);
        if (res.data.courses) {
          setCourses(res.data.courses);
        }

        // console.log(res.data);
      });
  }, [user]);

  const bookBtnClickHandler = (course: any) => {
    setPrevPage("/schedule");
    setSelectedCourseId(course.id);
    navigate("/coursedetail");
  };

  useEffect(() => {}, [selectedDate]);

  return (
    <div className={styles["schedule-container"]}>
      <div className={styles["schedule-card"]}>
        <div className={styles["date-strip"]}>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={clsx(styles["date-item"], {
                [styles["active"]]: selectedDate.isSame(date, "date"),
              })}
              onClick={() => setSelectedDate(date)}
            >
              <div className={styles["day-number"]}>{date.date()}</div>
              <div className={styles["day-week"]}>{date.format("dd")}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles["course-list"]}>
        {filteredCourses().length > 0 ? (
          filteredCourses().map((course) => (
            <div className={styles["course-card"]} key={course.id}>
              <img
                src={course.image || "./assets/gallery1.jpg"}
                alt="课程背景"
                className={styles["course-bg"]}
              />
              <div className={styles["course-overlay"]}>
                <div className={styles["course-time"]}>{course.start_time}</div>
                <div className={styles["course-header"]}>
                  <div className={styles["course-title"]}>{course.name}</div>
                </div>
                <div className={styles["course-info"]}>
                  <span>{course.coach}</span>
                  <span> | </span>
                  <span>{course.location || "暂无课室"}</span>
                </div>
                <div className={styles["course-attend"]}>
                  <span className={styles["attend-count"]}>
                    已预约人数：{course.booking_count}
                  </span>
                </div>
                <div className={styles["course-attend"]}>
                  <span className={styles["attend-count"]}>
                    普通价：RM{" " + course.price}
                  </span>
                </div>
                <div className={styles["course-attend"]}>
                  <span className={styles["attend-count"]}>
                    会员价：RM
                    {" " + course.price_m}
                  </span>
                </div>
                <div className={styles["course-difficulty"]}>
                  课程难度：
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= course.difficulty
                          ? styles["star-filled"]
                          : styles["star"]
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className={styles["course-attend"]}>
                  <span className={styles["attend-count"]}>
                    需开班人数：{course.min_book}
                  </span>
                </div>
                <button
                  className={styles["book-button"]}
                  onClick={() => {
                    bookBtnClickHandler(course);
                  }}
                >
                  {course.is_booked ? "已预约" : "立即预约"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>当天没有课程</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
