import { MdArrowBack } from "react-icons/md";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";
import styles from "./CoachCourseDetail.module.css";

const CoachCourseDetail = () => {
  const { user, selectedCourseId, prevPage } = useAppContext();
  const navigate = useNavigate();
  const [bookPopupVisible, setBookPopupVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [booked, setBooked] = useState<any[]>([]);
  const [cancelStudents, setCancelStudents] = useState<any>(null);
  const [totalBooked, setTotalBooked] = useState(0);
  const [cancelCoursePopupVisible, setCancelCoursePopupVisible] =
    useState(false);

  const handleBackButtonClick = () => {
    navigate(prevPage);
  };

  useEffect(() => {
    if (!selectedCourseId) {
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/coach/coach-course-detail.php`,
        {
          course_id: selectedCourseId,
        }
      )
      .then((res) => {
        console.log(res.data);
        setSelectedCourse(res.data.course);
        setBooked(res.data.bookings);
        const sum = res.data.bookings.reduce(
          (acc: any, cur: any) => acc + cur.head_count,
          0
        );
        setTotalBooked(sum);
        // if (res.data.isBooked) {
        //   setIsBooked(res.data.isBooked);
        // }
        // if (res.data.headCount) {
        //   setHeadCount(res.data.headCount);
        // }
      });
  }, [selectedCourseId]);

  const handleStartCourse = async () => {
    if (!selectedCourseId) return;
    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}admin/start-course.php`, {
        course_id: selectedCourseId,
      })
      .then((res) => {
        console.log(res.data);
      });
    // setBookPopupVisible(false);
    // 你可以显示“扣款完成”或刷新页面
    // 建议重新请求当前课程详情数据
    // window.location.reload(); // 或用 setRefresh
  };

  const handleCancel = async () => {
    if (!cancelStudents) return;
    console.log("cancelStudents", cancelStudents);
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}admin/cancel-booking.php`,
      {
        booking_id: cancelStudents.id,
      }
    );
    console.log(res.data);
    if (res.data.success) {
      console.log("取消预约成功" + cancelStudents.id);
    }
    setCancelStudents(null);
    // 重新加载
    setBooked(booked.filter((b) => b.id !== cancelStudents.id));
    // 你可以改为重新请求接口，或局部刷新
  };

  const handleRemoveCourse = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}admin/remove-course.php`,
      {
        course_id: selectedCourseId,
      }
    );
  };

  if (!selectedCourse) {
    return (
      <div className={styles.detailLoadingContainer}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <MdArrowBack className={styles.backIcon} />
        </button>
        <div>课程加载中...</div>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailHeader}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <MdArrowBack className={styles.backIcon} />
        </button>
        <div className={styles.detailHeaderText}>课程详情</div>
      </div>
      <div className={styles.detailBanner}>
        <img
          src={selectedCourse.image || "./assets/gallery1.jpg"}
          alt="课程背景"
          className={styles.detailBg}
        />
      </div>
      <div className={styles.detailContent}>
        <div className={clsx(styles.detailCard, styles.title)}>
          <div className={styles.courseTitleRow}>
            {/* <span className="course-tag">团课</span> */}
            <h2>{selectedCourse.name}</h2>
            {/* <span className={styles.courseShare}>🔗 分享</span> */}
          </div>
          <div className={styles.courseMeta}>
            <div>
              时长
              <br />
              <strong>{selectedCourse.duration} min</strong>
            </div>
            <div>
              容纳人数
              <br />
              <strong>{selectedCourse.min_book} 人</strong>
            </div>
            <div>
              难度
              <br />
              <strong>{selectedCourse.difficulty} ★</strong>
            </div>
          </div>
        </div>
        <div className={clsx(styles.detailCard, styles.description)}>
          <div className={styles.instructorInfo}>
            <img
              src="./assets/Avatar/Default.webp"
              className={styles.avatar}
              alt="教练头像"
            />
            <div>
              <strong>{selectedCourse.coach}</strong>
              <br />
              教师简介
            </div>
          </div>
          <div className={styles.descRow}>
            教室 <span>{selectedCourse.location}</span>
          </div>
          <div className={styles.descRow}>
            简介 <span>暂无课程简介</span>
          </div>
        </div>
        <div className={clsx(styles.detailCard, styles.details)}>
          <div className={styles.infoRow}>
            上课时间：
            <span>{selectedCourse.start_time}</span>
          </div>
          <div className={styles.infoRow}>
            地点：<span>Be Studio</span>
          </div>
          <div className={styles.infoRow}>
            非会员价：
            <span>RM{selectedCourse.price}</span>
          </div>
          <div className={styles.infoRow}>
            会员价：
            <span>RM{selectedCourse.price_m}</span>
          </div>
          <div className={styles.infoRow}>
            预约人数：
            <div className={styles.peopleCount}>
              <span>{totalBooked}</span>
            </div>
          </div>
          {/* <div className="info-row">
              预约备注：
              <input placeholder="请填写备注" maxLength={200} />
            </div> */}
        </div>

        <div className={clsx(styles.detailCard, styles.bookedStudents)}>
          <h3>已预约学生</h3>
          {booked.filter((student) => student.status !== "cancelled").length ===
          0 ? (
            <p>暂无预约</p>
          ) : (
            <ul className={styles.studentList}>
              {booked
                .filter((student) => student.status !== "cancelled")
                .map((student) => (
                  <li key={student.id} className={styles.studentRow}>
                    <div>
                      <strong>{student.student_name}</strong>（
                      {student.student_phone}） {student.head_count}人
                    </div>
                    {student.status === "booked" && (
                      <button
                        className={styles.cancelBtn}
                        onClick={() => setCancelStudents(student)}
                      >
                        取消预约
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.detailFooter}>
        {user && user.role == "admin" && (
          <>
            {totalBooked < selectedCourse.min_book ? (
              <button
                className={clsx(
                  styles.detailBookButton,
                  styles.cancelCourseButton
                )}
                onClick={() => setCancelCoursePopupVisible(true)}
              >
                取消课程
              </button>
            ) : (
              <button
                className={styles.detailBookButton}
                onClick={() => setBookPopupVisible(true)}
              >
                开始课程
              </button>
            )}
          </>
        )}
        {user && user.role == "coach" && (
          <button
            className={styles.detailBookButton}
            onClick={() => {
              navigate("/coach_course");
            }}
          >
            返回课程表
          </button>
        )}
      </div>

      {bookPopupVisible && (
        <div className={styles.bookPopup}>
          <div className={styles.popupContent}>
            <h2>开始课程</h2>
            <p>课程名称: {selectedCourse.name}</p>
            <p>时间: {selectedCourse.start_time}</p>
            <p>人数: {totalBooked} 人</p>
            <div className={styles.popupBtns}>
              <button
                onClick={() => {
                  handleStartCourse();
                }}
              >
                确认
              </button>
              <button onClick={() => setBookPopupVisible(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}

      {cancelStudents && (
        <div className={styles.cancelPopup}>
          <div className={styles.popupContent}>
            <h2>取消预约</h2>
            <p>学生姓名: {cancelStudents.student_name}</p>
            <p>预约人数: {cancelStudents.head_count} 人</p>
            <div className={styles.popupBtns}>
              <button
                onClick={() => {
                  handleCancel();
                }}
              >
                确认
              </button>
              <button onClick={() => setCancelStudents(null)}>关闭</button>
            </div>
          </div>
        </div>
      )}
      {cancelCoursePopupVisible && (
        <div className={styles.bookPopup}>
          <div className={styles.popupContent}>
            <h2>预约人数不足</h2>
            <p>课程名称: {selectedCourse.name}</p>
            <p>时间: {selectedCourse.start_time}</p>
            <p>
              当前预约: <span style={{ color: "red" }}>{totalBooked}</span> /
              最低开课人数: {selectedCourse.min_book}
            </p>
            <div className={styles.popupBtns}>
              <button
                style={{ background: "#f33" }}
                onClick={async () => {
                  // 调用后端 remove-course.php 或 cancel-course.php
                  if (!window.confirm("确认移除课程及所有预约？")) return;
                  await handleRemoveCourse();
                  setCancelCoursePopupVisible(false);
                  navigate("/admin_course"); // 返回课程表或刷新
                }}
              >
                移除排程
              </button>
              <button
                style={{ background: "#fe9" }}
                onClick={async () => {
                  // 强制调用 start-course.php（无视人数）
                  if (!window.confirm("确认强制开始课程并自动扣款吗？")) return;
                  await handleStartCourse();
                  setCancelCoursePopupVisible(false);
                }}
              >
                强制开始
              </button>
              <button onClick={() => setCancelCoursePopupVisible(false)}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachCourseDetail;
