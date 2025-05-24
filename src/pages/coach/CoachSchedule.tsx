import classes from "./CoachSchedule.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CoachSchedule = () => {
  const { t } = useTranslation("schedule");
  const navigate = useNavigate();
  const { setSelectedCourseId, user, setPrevPage } = useAppContext();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}coach/coach-get-course.php`, {
        user_id: user.id,
      })
      .then((response) => {
        // console.log(response.data);
        setCourses(response.data.courses);
      });
  }, [user]);

  const handleDetail = (course: any) => {
    setPrevPage("/coach_schedule");
    setSelectedCourseId(course.id);
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
          {t("coach.title")}
          <br />
          {getDateRangeString()}
        </div>
      </div>
      <div className={classes["course-list"]}>
        {courses &&
          courses.map((course) => (
            <div className={classes["course-card"]} key={course.id}>
              <img
                src={course.image || "./assets/gallery4.jpg"}
                alt="coach banner"
                className={classes["course-bg"]}
              />
              <div className={classes["course-overlay"]}>
                <div className={classes["course-time"]}>
                  {course.start_time}
                </div>
                <div className={classes["course-header"]}>
                  <div className={classes["course-title"]}>{course.name}</div>
                </div>
                <div className={classes["course-info"]}>
                  <span>{course.coach}</span>
                  <span> | </span>
                  <span>{course.location || t("locationDefault")}</span>
                </div>
                <div className={classes["course-attend"]}>
                  <span className={classes["attend-count"]}>
                    {t("bookedCount")}：{course.booking_count}
                  </span>
                </div>
                <div className={classes["course-attend"]}>
                  <span className={classes["attend-count"]}>
                    {t("regularPrice")}：RM{" " + course.price}
                  </span>
                </div>
                <div className={classes["course-attend"]}>
                  <span className={classes["attend-count"]}>
                    {t("memberPrice")}：RM
                    {" " + course.price_m}
                  </span>
                </div>
                <div className={classes["course-difficulty"]}>
                  {t("difficulty")}：
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= course.difficulty
                          ? classes["star-filled"]
                          : classes["star"]
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className={classes["course-attend"]}>
                  <span className={classes["attend-count"]}>
                    {t("minBook")}：{course.min_book}
                  </span>
                </div>
                <button
                  className={classes["book-button"]}
                  onClick={() => {
                    handleDetail(course);
                  }}
                >
                  {t("view")}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CoachSchedule;
