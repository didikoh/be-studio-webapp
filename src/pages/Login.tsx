import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/userStore";

const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore((state:any) => state.login);
  const [phone, setPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return alert("请输入手机号");

    // 模拟登录成功
    login({ name: "测试用户", phone });
    navigate("/account"); // 登录后跳转到账户页面
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">登录 be studio</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="请输入手机号"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border w-full py-3 px-4 rounded"
        />
        <button type="submit" className="bg-pink-500 text-white w-full py-3 rounded">
          登录
        </button>
      </form>
    </div>
  );
};

export default Login;
