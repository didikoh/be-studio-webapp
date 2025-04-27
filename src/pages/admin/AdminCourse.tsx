import { useState } from "react";
import { Course, mockCourses } from "../../mocks/courses";

const AdminCourse = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [chargingCourse, setChargingCourse] = useState<Course | null>(null);

  const handleEdit = (member: Course) => setEditingCourse(member);
//   const handleCharge = (member: Course) => {
//     setChargingCourse(member);
//   };

  const handleClosePopup = () => {
    setEditingCourse(null);
    setChargingCourse(null);
    console.log(chargingCourse,setCourses)
  };

//   const handleChargeConfirm = () => {

//   };
  return (
    <div className="admin-member-container">
      <div className="admin-member-header">
        <h2>课程管理</h2>
        {/* <div className="admin-member-header-btns">
          <button className="active">学生</button>
          <button>教师</button>
        </div> */}
      </div>

      {/* <div className="admin-member-filter">
        <select className="member-type-dropdown">
          {filter.map((f) => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
          <option value="all">全部成员</option>
        </select>

        <input type="text" placeholder="搜索" />
      </div> */}

      <table className="member-table">
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
              <td style={{ display: "flex" }}>
                <button className="btn edit" onClick={() => handleEdit(c)}>
                  编辑
                </button>
                {/* <button className="btn charge" onClick={() => handleCharge(c)}>
                  
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 编辑弹窗 */}
      {editingCourse && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>编辑课程资料</h3>
            <div className="edit-row">
              <label>课名:</label>
              <input type="text" value={editingCourse.name} readOnly />
            </div>

            <div className="popup-actions">
              <button className="btn delete">删除会员</button>
              <button className="btn confirm">保存</button>
              <button className="btn close-btn" onClick={handleClosePopup}>
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
