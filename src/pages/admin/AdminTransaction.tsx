import React, { useEffect, useState } from "react";
import styles from "./AdminTransaction.module.css";
import axios from "axios";

const AdminTransaction: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}admin/get-transaction.php`)
      .then((res) => {
        setTransactions(res.data.data);
        console.log(res);
      });
  }, []);

  const GenerateInvoice = (id: number) => {
    window.open(
      `${
        import.meta.env.VITE_API_BASE_URL
      }admin/generate-invoice.php?transaction_id=${id}`
    );
  };

  return (
    <div className={styles["admin-transaction-container"]}>
      <h2>交易记录</h2>
      <table className={styles["transaction-table"]}>
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
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((t,index) => (
              <tr key={t.transaction_id}>
                <td>{index}</td>
                <td>{t.member_name}</td>
                <td
                  className={(() => {
                    switch (t.type) {
                      case "topup":
                        return styles["income"];
                      case "activate_package":
                        return styles["activate"];
                      case "payment":
                        return styles["expense"];
                      default:
                        return "";
                    }
                  })()}
                >
                  {(() => {
                    switch (t.type) {
                      case "topup":
                        return "充值";
                      case "activate_package":
                        return "购买套餐";
                      case "payment":
                        return "消费";
                      default:
                        return "未知";
                    }
                  })()}
                </td>
                <td>{t.amount}</td>
                <td>{t.point || "-"}</td>
                <td>{t.head_count || "-"}</td>
                <td>
                  {t.course_id ? `${t.course_name}（${t.start_time}）` : "-"}
                </td>
                <td>{t.time}</td>
                <td>
                  {t.type != "payment" && (
                    <button
                      className={styles["btn-action"]}
                      onClick={() => GenerateInvoice(t.transaction_id)}
                    >
                      收据
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransaction;
