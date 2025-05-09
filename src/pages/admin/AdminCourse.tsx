import { useEffect, useState } from "react";
import { Course, mockCourses } from "../../mocks/courses";
import styles from "./AdminCourse.module.css";
import clsx from "clsx";
import axios from "axios";

const formatStartTime = (start_time: string) => {
  const dateObj = new Date(start_time); // 自动解析 "2025-05-15 06:23:00"

  // 获取日期
  const day = dateObj.getDate(); // 15
  const month = dateObj.getMonth() + 1; // 月份从 0 开始，所以要 +1

  // 获取时间（格式为 12 小时制）
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // 0 点变成 12 点
  const timeStr = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  const dateStr = `${day}/${month}`; // 不需要年份

  return { dateStr, timeStr };
};

const AdminCourse = () => {
  const [courses, setCourses] = useState<any>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [courseForm, setCourseForm] = useState({
    name: "",
    price: 0,
    price_m: 0,
    difficulty: 0,
    min_book: 0,
    coach: "",
    start_time: "",
  });

  const [coachList, setCoachList] = useState<any>([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // 根据 id 获取课程
  const fetchCourseById = async (id: number) => {
    const res = await axios.get(`/api/get-course.php?id=${id}`);
    if (res.data.success) {
      setCourseForm(res.data.course);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}get-course.php`
      );
      console.log(res);
      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (err) {
      console.error("获取课程失败", err);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}admin/get-coach.php`)
      .then((res) => {
        setCoachList(res.data.data);
      });
    fetchCourses();
  }, []);

  const handleEdit = (course: any) => {
    setEditingId(course.id);
    setCourseForm({
      name: course.name,
      price: course.price,
      price_m: course.price_m,
      difficulty: course.difficulty,
      min_book: course.min_book,
      coach: course.coach,
      start_time: course.start_time,
    });
  };

  const handleClosePopup = () => {
    setEditingId(null);
  };

  const handleAddNew = () => {
    setEditingId(-1); // 用 null 表示是新增
    setCourseForm({
      name: "",
      price: 0,
      price_m: 0,
      difficulty: 0,
      min_book: 0,
      coach: "",
      start_time: "",
    });
  };

  const handleDelete = async () => {
    const formData = new FormData();

    if (editingId !== -1 && editingId) {
      formData.append("id", editingId.toString());
      formData.append("delete", "true");
    }

    const res = await axios.post(
      import.meta.env.VITE_API_BASE_URL + `admin/edit-course.php`,
      formData
    );

    if (res.data.success) {
      fetchCourses();
      setDeleteConfirm(false);
      handleClosePopup();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const keys = Object.keys(courseForm) as (keyof typeof courseForm)[];

    if (editingId !== -1 && editingId)
      formData.append("id", editingId.toString());
    for (const key of keys) {
      formData.append(key, String(courseForm[key]));
    }

    console.log(formData);

    const res = await axios.post(
      import.meta.env.VITE_API_BASE_URL + `admin/edit-course.php`,
      formData
    );
    console.log(res.data);
    if (res.data.success) {
      fetchCourses();
      handleClosePopup();
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h2>课程管理</h2>
      </div>

      <div className={styles["filter"]}>
        <div className={styles["filter-left"]}>
          <input
            type="text"
            placeholder="课程名称"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <button
          className={styles["add-new-btn"]}
          onClick={() => handleAddNew()}
        >
          新增
        </button>
      </div>

      <table className={styles["table"]}>
        <thead>
          <tr>
            <th>课名</th>
            <th>价格</th>
            <th>开课人数</th>
            <th>预约人数</th>
            <th>老师</th>
            <th>日期</th>
            <th>时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
              courses
              .filter((c: any) => {
                const matchKeyword = c.name.toLowerCase().includes(keyword.toLowerCase());
          
                const matchDate = filterDate
                  ? c.start_time.startsWith(filterDate) // "2025-05-15 06:23:00".startsWith("2025-05-15")
                  : true;
          
                return matchKeyword && matchDate;
              })
              .map((c: any) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  {c.price}/{c.price_m}
                </td>
                <td>{c.min_book}</td>
                <td>100</td>
                <td>{c.coach}</td>
                <td>{formatStartTime(c.start_time).dateStr}</td>
                <td>{formatStartTime(c.start_time).timeStr}</td>
                <td className={styles["action-buttons"]}>
                  <button
                    className={clsx(styles.btn, styles.edit)}
                    onClick={() => handleEdit(c)}
                  >
                    编辑
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingId && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-card"]}>
            <h3>编辑课程资料</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className={styles["edit-row"]}>
                <label>课名:</label>
                <input
                  name="name"
                  className={styles["form-input"]}
                  type="text"
                  value={courseForm.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles["edit-row"]}>
                <label>价格:</label>
                <input
                  name="price"
                  className={styles["form-input"]}
                  type="text"
                  value={courseForm.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles["edit-row"]}>
                <label>会员价:</label>
                <input
                  name="price_m"
                  className={styles["form-input"]}
                  type="text"
                  value={courseForm.price_m}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles["edit-row"]}>
                <label>难度:</label>
                <select
                  name="difficulty"
                  className={styles["form-input"]}
                  value={courseForm.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={styles["edit-row"]}>
                <label>开课人数:</label>
                <input
                  name="min_book"
                  className={styles["form-input"]}
                  type="text"
                  value={courseForm.min_book}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles["edit-row"]}>
                <label>教练:</label>
                <select
                  name="coach"
                  className={styles["form-input"]}
                  value={courseForm.coach}
                  onChange={handleChange}
                  required
                >
                  {coachList.map((c: any) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles["edit-row"]}>
                <label>开课时间:</label>
                <input
                  name="start_time"
                  className={styles["form-input"]}
                  type="datetime-local"
                  value={courseForm.start_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles["popup-actions"]}>
                {editingId !== -1 && (
                  <button
                    type="button"
                    className={clsx(styles.btn, styles.delete)}
                    onClick={() => setDeleteConfirm(true)}
                  >
                    删除课程
                  </button>
                )}
                <button
                  className={clsx(styles.btn, styles.confirm)}
                  type="submit"
                >
                  保存
                </button>
                <button
                  type="button"
                  className={clsx(styles.btn, styles["close-btn"])}
                  onClick={handleClosePopup}
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className={styles["popup-overlay"]}>
          <div className={clsx(styles["popup-card"], styles["delete-confirm"])}>
            <h3>确认删除该课程?</h3>
            <div className={styles["popup-actions"]}>
              <button
                className={clsx(styles.btn, styles.delete)}
                onClick={handleDelete}
              >
                确定
              </button>
              <button
                type="button"
                className={clsx(styles.btn, styles["close-btn"])}
                onClick={() => setDeleteConfirm(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourse;
