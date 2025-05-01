import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { CgClose } from "react-icons/cg";
import { useRef, useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  // 定义表单状态
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("注册提交：", {
      name,
      phone,
      birthday,
      profilePic,
    });

    // 提交后跳转或发请求
    alert("注册成功（模拟）！");
    navigate("/login");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>账号注册</h3>
          <div
            className={styles.close}
            onClick={() => {
              navigate("/login");
            }}
          >
            <CgClose />
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="名字"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles["form-input"]}
          />

          <input
            type="tel"
            placeholder="电话号码"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles["form-input"]}
          />

          <input
            type="text"
            placeholder="生日"
            value={birthday}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            onChange={(e) => setBirthday(e.target.value)}
            className={styles["form-input"]}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setProfilePic(file);
            }}
            className={styles["hidden-file-input"]}
          />

          <input
            type="text"
            placeholder="上传头像"
            value={profilePic ? profilePic.name : ""}
            onClick={() => fileInputRef.current?.click()}
            className={styles["form-input"]}
          />
          <button type="submit">提交</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
