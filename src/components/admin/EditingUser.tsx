import axios from "axios";
import styles from "./EditingUser.module.css";
import clsx from "clsx";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import { useEffect, useState } from "react";
const EditingUser = ({
  setEditingUser,
  editingUser,
  handleClosePopup,
  selectedRole,
  setRefresh,
}: any) => {
  const [name, setName] = useState<any>(editingUser.name);
  const [phone, setPhone] = useState<any>(editingUser.phone);
  const [birthday, setBirthday] = useState<any>(editingUser.birthday);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    console.log(editingUser);
  }, [])
  

  const handleSave = () => {
    if (editingUser.id) {
      if (name == "" || phone == "" || birthday == "") {
        console.log(name, phone, birthday);
        alert("请填写完整信息");
        return;
      }
      if (!isValidPhoneNumber(phone)) {
        alert("请输入正确的电话号码！");
        return;
      }

      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}admin/edit-user.php`, {
          name: name,
          phone: phone,
          birthday: birthday,
          role: selectedRole,
          id: editingUser.id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setRefresh((prev: any) => prev + 1);
            setEditingUser(null);
          }
        })
        .catch((err) => alert(err));
    }
  };

  const handleDelete = () => {};

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles["popup-card"]}>
        <h3>编辑{selectedRole == "student" ? "学生" : "教师"}资料</h3>
        <form>
          <div className={styles["edit-row"]}>
            <label>姓名:</label>
            <input
              className={styles["form-input"]}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles["edit-row"]}>
            <label>电话:</label>
            <PhoneInput
              placeholder=""
              defaultCountry="MY"
              value={phone}
              onChange={setPhone}
              className={styles["form-input"]}
              required
            />{" "}
          </div>

          <div className={styles["edit-row"]}>
            <label>生日:</label>
            <input
              type="date"
              className={styles["form-input"]}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>

          <div className={styles["popup-actions"]}>
            {editingUser.id != -1 && (
              <button
                type="button"
                className={clsx(styles.btn, styles.delete)}
                onClick={() => setDeleteConfirm(true)}
              >
                删除用户
              </button>
            )}
            <button
              type="button"
              className={clsx(styles.btn, styles.confirm)}
              onClick={() => handleSave()}
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

      {deleteConfirm && (
        <div className={styles["popup-overlay"]}>
          <div className={clsx(styles["popup-card"], styles["delete-confirm"])}>
            <h3>确认删除该用户?</h3>
            <span>名字:{editingUser.name}</span>
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

export default EditingUser;
