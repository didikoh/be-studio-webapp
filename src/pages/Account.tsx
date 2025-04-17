import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { reservations } from "../mocks/reservations";

const Account = () => {
  const user = useUserStore((state:any) => state.user);
  const logout = useUserStore((state:any) => state.logout);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>尚未登录</p>
        <Link to="/login" className="text-blue-500 underline">
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">我的账户</h1>

      <div className="border p-4 rounded mb-6">
        <p>姓名：{user.name}</p>
        <p>手机号：{user.phone}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">已预约课程</h2>
      {reservations.map((item) => (
        <div key={item.id} className="border p-4 rounded mb-4">
          <p>课程：{item.courseTitle}</p>
          <p>时间：{item.date}</p>
          <p>状态：{item.status}</p>
        </div>
      ))}

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="bg-gray-500 text-white w-full py-3 rounded mt-6"
      >
        退出登录
      </button>
    </div>
  );
};

export default Account;
