import React, { useState } from "react";
import "./AdminMember.css";

interface Member {
  id: number;
  name: string;
  phone: string;
  points: number;
  balance: number;
  birthday: string;
  joinDate: string;
  expireDate: string;
}

const mockMembers: Member[] = [
  {
    id: 1,
    name: "李小美",
    phone: "012-3456789",
    points: 5,
    balance: 80,
    birthday: "1998-05-20",
    joinDate: "2024-08-01",
    expireDate: "2025-08-01",
  },
  {
    id: 2,
    name: "陈大强",
    phone: "013-9876543",
    points: 2,
    balance: 120,
    birthday: "1989-03-15",
    joinDate: "2024-09-12",
    expireDate: "2025-03-12",
  },
];

const filter = [
  { name: "名字", value: "name" },
  { name: "手机", value: "phone" },
  { name: "积分", value: "points" },
  { name: "余额", value: "balance" },
  { name: "生日", value: "birthday" },
  { name: "注册日期", value: "joinDate" },
  { name: "截止日期", value: "expireDate" },
];

const AdminMember: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [chargingMember, setChargingMember] = useState<Member | null>(null);
  const [chargeAmount, setChargeAmount] = useState<number>(0);

  const handleEdit = (member: Member) => setEditingMember(member);
  const handleCharge = (member: Member) => {
    setChargingMember(member);
    setChargeAmount(0); // 重置
  };
  const handleClosePopup = () => {
    setEditingMember(null);
    setChargingMember(null);
  };

  const handleChargeConfirm = () => {
    if (chargingMember) {
      const updatedMembers = members.map((m) =>
        m.id === chargingMember.id
          ? { ...m, balance: m.balance + chargeAmount }
          : m
      );
      setMembers(updatedMembers);
      handleClosePopup();
    }
  };

  return (
    <div className="admin-member-container">
      <div className="admin-member-header">
        <h2>会员管理</h2>
        <div className="admin-member-header-btns">
          <button className="active">学生</button>
          <button>教师</button>
        </div>
      </div>

      <div className="admin-member-filter">
        <select className="member-type-dropdown">
          {filter.map((f) => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
          <option value="all">全部成员</option>
        </select>

        <input type="text" placeholder="搜索" />
      </div>

      <table className="member-table">
        <thead>
          <tr>
            <th>姓名</th>
            <th>电话</th>
            <th>点数</th>
            <th>余额 (RM)</th>
            <th>生日</th>
            <th>注册日期</th>
            <th>截止日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.points}</td>
              <td>{m.balance}</td>
              <td>{m.birthday}</td>
              <td>{m.joinDate}</td>
              <td>{m.expireDate}</td>
              <td style={{ display: "flex" }}>
                <button className="btn edit" onClick={() => handleEdit(m)}>
                  编辑
                </button>
                <button className="btn charge" onClick={() => handleCharge(m)}>
                  充值
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 编辑弹窗 */}
      {editingMember && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>编辑会员资料</h3>
            <div className="edit-row">
              <label>姓名:</label>
              <input type="text" value={editingMember.name} readOnly />
            </div>

            <div className="edit-row">
              <label>电话:</label>
              <input type="text" value={editingMember.phone} readOnly />
            </div>
            <div className="edit-row">
              <label>点数:</label>
              <input
                type="number"
                placeholder="点数"
                defaultValue={editingMember.points}
              />
            </div>
            <div className="edit-row">
              <label>余额:</label>
              <input
                type="number"
                placeholder="余额"
                defaultValue={editingMember.balance}
              />
            </div>
            <div className="edit-row">
              <label>生日:</label>
              <input type="date" defaultValue={editingMember.birthday} />
            </div>
            <div className="edit-row">
              <label>注册日期:</label>
              <input type="date" defaultValue={editingMember.joinDate} />
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

      {/* 充值弹窗 */}
      {chargingMember && (
        <div className="popup-overlay">
          <div className="popup-card topup">
            <h3>充值余额</h3>
            <p>
              <strong>会员：</strong>
              {chargingMember.name}
            </p>
            <p>
              <strong>当前余额：</strong>RM {chargingMember.balance}
            </p>
            <input
              type="number"
              placeholder="输入充值金额"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(Number(e.target.value))}
            />
            <div className="popup-actions">
              <button className="btn confirm" onClick={handleChargeConfirm}>
                确认充值
              </button>
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

export default AdminMember;
