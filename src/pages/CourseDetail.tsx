import clsx from "clsx";
import { useAppContext } from "../contexts/AppContext";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import styles from "./CourseDetail.module.css";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";

const CourseDetail = () => {
  const { selectedCourseId, user, prevPage, setRefreshKey } = useAppContext();
  const navigate = useNavigate();
  const [bookpopupVisible, setBookPopupVisible] = useState(false);
  const [bookPeopleCount, setBookPeopleCount] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isbooked, setIsbooked] = useState(false);
  const [headCount, setHeadCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!selectedCourse) return;

    console.log("计算总价");
    const total_price =
      user && user.package == null
        ? selectedCourse.price * bookPeopleCount
        : selectedCourse.price_m * bookPeopleCount;
    setTotalPrice(total_price);
  }, [bookPeopleCount, user, selectedCourse]);

  useEffect(() => {
    console.log(selectedCourseId);
    if (!selectedCourseId) {
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}get-course-detail.php`, {
        course_id: selectedCourseId,
        student_id: user ? user.id : null, // 如果用户未登录，传 null 或不传
      })
      .then((res) => {
        console.log(res.data);
        setSelectedCourse(res.data.course);
        if (res.data.is_booked) {
          setIsbooked(res.data.is_booked);
        }
        if (res.data.head_count) {
          setHeadCount(res.data.head_count);
        }
      });
  }, [selectedCourseId, user]);

  const handleBackButtonClick = () => {
    navigate(prevPage);
  };

  const handleBook = async () => {
    if (!user) {
      alert("请先登录");
      navigate("/login");
      return;
    }

    const availableBalance = user.balance - user.frozen_balance;
    console.log("用户:", user);
    console.log(
      "可用余额:",
      availableBalance,
      "=",
      user.balance,
      user.frozen_balance
    );

    if (availableBalance < totalPrice) {
      alert("余额不足，请充值");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}book.php`,
        {
          student_id: user.id,
          course_id: selectedCourse.id,
          head_count: bookPeopleCount,
          frozen_price: totalPrice,
        }
      );

      if (response.data.success) {
        alert("预约成功");
        setRefreshKey((prev: any) => prev + 1);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("预约出错:", error);
      alert("预约失败");
    }
  };

  if (!selectedCourse) {
    return (
      <div className={styles.detailLoadingContainer}>
        <button
          className={styles.backButton}
          onClick={() => {
            handleBackButtonClick();
          }}
        >
          <MdArrowBack className={styles.backIcon} />
        </button>
        <div>课程加载中...</div>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailHeader}>
        <button
          className={styles.backButton}
          onClick={() => {
            handleBackButtonClick();
          }}
        >
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
          {" "}
          <div className={styles.courseTitleRow}>
            <h2>{selectedCourse.name}</h2>
            {/* <span className={styles.courseTag}>团课</span> */}
            {/* <span className={styles.courseShare}>分享</span> */}
          </div>
          <div className={styles.courseMeta}>
            <div className={styles.courseMetaItem}>
              时长
              <br />
              <strong>{selectedCourse.duration} min</strong>
            </div>
            <div className={styles.courseMetaItem}>
              开课人数
              <br />
              <strong>{selectedCourse.min_book}</strong>
            </div>
            <div className={styles.courseMetaItem}>
              难度
              <br />
              <strong>{selectedCourse.difficulty} </strong>
            </div>
          </div>
        </div>
        <div className={clsx(styles.detailCard, styles.description)}>
          {" "}
          <div className={styles.instructorInfo}>
            <img src="/assets/Avatar/Default.webp" className={styles.avatar} />
            <div>
              <strong>{selectedCourse.coach}</strong>
              <br />
              教师简介
            </div>
          </div>
          <div className={styles.descRow}>
            教室 <span>{selectedCourse.location || "暂无决定地点"}</span>
          </div>
          <div className={styles.descRow}>
            简介 <span>暂无课程简介</span>
          </div>
        </div>
        <div className={clsx(styles.detailCard, styles.details)}>
          {" "}
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
          {!isbooked && (
            <div className={styles.infoRow}>
              预约人数：
              <div className={styles.peopleCount}>
                {user && user.package != "promotion" && (
                  <button
                    onClick={() =>
                      setBookPeopleCount(Math.max(1, bookPeopleCount - 1))
                    }
                  >
                    <FaMinus />
                  </button>
                )}
                <span>{bookPeopleCount}</span>
                {user && user.package != "promotion" && (
                  <button
                    onClick={() => setBookPeopleCount(bookPeopleCount + 1)}
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            </div>
          )}
          {isbooked && (
            <div className={styles.infoRow}>
              已预约人数：
              <div className={styles.peopleCount}>
                <span>{headCount}</span>
              </div>
            </div>
          )}
          {/* <div className={styles.infoRow}>
            预约备注：
            <input placeholder="请填写备注" maxLength={200} />
          </div> */}
        </div>
      </div>
      <div className={styles.detailFooter}>
        <button
          className={styles.detailBookButton}
          onClick={() => setBookPopupVisible(true)}
          disabled={isbooked}
        >
          {isbooked ? "已预约" : "立即预约"}{" "}
        </button>
      </div>

      {bookpopupVisible && (
        <div className={styles.bookPopup}>
          <div className={styles.popupContent}>
            <h2>预约课程</h2>
            <p>课程名称: {selectedCourse.name}</p>
            <p>时间: {selectedCourse.start_time}</p>
            <p>人数: {bookPeopleCount} 人</p>
            <p>
              单价: RM{" "}
              {user?.package == null
                ? selectedCourse.price
                : selectedCourse.price_m}
            </p>
            <p>总价: RM {totalPrice}</p>
            <div className={styles.popupBtns}>
              <button
                onClick={() => {
                  handleBook();
                }}
              >
                确认
              </button>
              <button onClick={() => setBookPopupVisible(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
