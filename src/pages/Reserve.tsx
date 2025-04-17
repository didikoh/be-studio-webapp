import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../mocks/courses";


const Reserve = () => {
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !date || !time) {
      alert("请填写完整预约信息");
      return;
    }

    alert("预约成功！");
    navigate("/account");
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">预约课程</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border w-full py-3 px-4 rounded"
        >
          <option value="">请选择课程</option>
          {courses.map((item:any) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border w-full py-3 px-4 rounded"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border w-full py-3 px-4 rounded"
        />

        <button type="submit" className="bg-pink-500 text-white w-full py-3 rounded">
          提交预约
        </button>
      </form>
    </div>
  );
};

export default Reserve;
