// src/pages/BookingVenue.tsx
import  { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CoachSite.css";
import { useUserStore } from "../mocks/userStore";

const mockAvailableTimes = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "14:00 - 15:00",
  "16:00 - 17:00",
  "18:00 - 19:00",
];

const CoachSite = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [reason, setReason] = useState("");
  const user = useUserStore((state: any) => state.user);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setPopupVisible(true);
  };

  const handleConfirm = () => {
    alert(
      `✅ ${user} 成功预约了 ${selectedDate?.toLocaleDateString()} ${selectedTime}。\n理由: ${reason}`
    );
    setPopupVisible(false);
    setReason("");
  };

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Cancels the booking process by hiding the popup and clearing the reason input.
   */

  /*******  b70bf8eb-1215-4a08-b887-e3c1fda39586  *******/
  const handleCancel = () => {
    setPopupVisible(false);
    setReason("");
  };

  return (
    <div className="booking-venue-container">
      <h2>预约场地</h2>

      <div className="calendar-section">
        <label>选择日期：</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date as Date)}
          dateFormat="yyyy/MM/dd"
          inline
        />
      </div>

      <div className="time-list-section">
        <h3>可预约时间：</h3>
        <div className="time-list">
          {mockAvailableTimes.map((time) => (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? "selected" : ""}`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>填写预约信息</h3>
            <p>
              <strong>姓名：</strong>
              {user.name}
            </p>
            <p>
              <strong>时间：</strong>
              {selectedDate?.toLocaleDateString()} {selectedTime}
            </p>
            <textarea
              placeholder="请输入预约理由"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="popup-actions">
              <button className="confirm-btn" onClick={handleConfirm}>
                确认预约
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachSite;
