import { useState } from "react";
import { Course, mockCourses } from "../../mocks/courses";
import styles from "./AdminCourse.module.css";
import clsx from "clsx";

const AdminCourse = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [chargingCourse, setChargingCourse] = useState<Course | null>(null);

  const handleEdit = (member: Course) => setEditingCourse(member);

  const handleClosePopup = () => {
    setEditingCourse(null);
    setChargingCourse(null);
    console.log(chargingCourse, setCourses);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h2>课程管理</h2>
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
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.price}</td>
              <td>{c.capacity}</td>
              <td>{c.minCapacity}</td>
              <td>{c.instructor}</td>
              <td>{c.startDate}</td>
              <td>{c.startTime}</td>
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

      {editingCourse && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-card"]}>
            <h3>编辑课程资料</h3>
            <div className={styles["edit-row"]}>
              <label>课名:</label>
              <input type="text" value={editingCourse.name} readOnly />
            </div>

            <div className={styles["popup-actions"]}>
              <button className={clsx(styles.btn, styles.delete)}>删除会员</button>
              <button className={clsx(styles.btn, styles.confirm)}>保存</button>
              <button
                className={clsx(styles.btn, styles["close-btn"])}
                onClick={handleClosePopup}
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

