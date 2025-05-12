import React, { useEffect, useState } from "react";
import "./AdminTransaction.css";
import axios from "axios";

const AdminTransaction: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}admin/get-transaction.php`)
      .then((res) => {
        setTransactions(res.data.data);
        console.log(res)
      });
  }, []);

  return (
    <div className="admin-transaction-container">
      <h2>交易记录</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>会员</th>
            <th>类型</th>
            <th>金额 (RM)</th>
            <th>积分</th>
            <th>人数</th>
            <th>课程</th>
            <th>交易时间</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((t) => (
              <tr key={t.transaction_id}>
                <td>{t.transaction_id}</td>
                <td>{t.member_name}</td>
                <td className={t.type === "topup" ? "income" : "expense"}>
                  {t.type === "topup" ? "充值" : "消费"}
                </td>
                <td>{t.amount}</td>
                <td>{t.point||"-"}</td>
                <td>{t.head_count||"-"}</td>
                <td>
                  {t.course_id
                    ? `${t.course_name}（${t.start_time}）`
                    : "-"}
                </td>
                <td>{t.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransaction;
