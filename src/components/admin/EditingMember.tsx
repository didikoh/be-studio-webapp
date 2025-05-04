import axios from "axios";
import styles from "./EditingMember.module.css";
import clsx from "clsx";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import { useState } from "react";
const EditingMember = ({
  editingMember,
  handleClosePopup,
  selectedRole,
  setRefresh,
}: any) => {
  const [name, setName] = useState<any>(editingMember.name);
  const [phone, setPhone] = useState<any>(editingMember.phone);
  const [birthday, setBirthday] = useState<any>(editingMember.birthday);

  const handleSave = () => {
    if (editingMember.id == null) {
      if (name == "" || phone == "" || birthday == "") {
        console.log(name, phone, birthday);
        alert("请填写完整信息");
        return;
      }
      if (!isValidPhoneNumber(phone)) {
        alert("请输入正确的电话号码！");
        return;
      }

      if (selectedRole == "coach") {
        axios
          .post(`${import.meta.env.VITE_API_BASE_URL}admin/edit-coach.php`, {
            name: name,
            phone: phone,
            birthday: birthday,
            action: "new",
          })
          .then((res) => {
            if (res.data.success) {
              setRefresh((prev: any) => prev + 1);
            }
          })
          .catch((err) => alert(err));
        console.log("创建教练");
      } else {
        console.log("创建别的");
      }
    } else {
      console.log("更新会员");
    }
  };

  const handleDelete = () => {};

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles["popup-card"]}>
        <h3>编辑会员资料</h3>
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
            <button
              type="button"
              className={clsx(styles.btn, styles.delete)}
              onClick={() => handleDelete()}
            >
              删除会员
            </button>
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
    </div>
  );
};

export default EditingMember;
