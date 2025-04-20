import React, { useState } from 'react';
import './AdminTransaction.css';

interface Transaction {
  id: number;
  memberName: string;
  type: '充值' | '支出'; 
  amount: number;
  points: number;
  peopleCount: number | '-';
  course: {
    name: string;
    date: string;
    time: string;
  } | null;
  transactionTime: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    memberName: '李小美',
    type: '支出',
    amount: 120,
    points: 5,
    peopleCount: 8,
    course: {
      name: '基础瑜伽',
      date: '2025-04-22',
      time: '18:00',
    },
    transactionTime: '2025-04-20 10:15',
  },
  {
    id: 2,
    memberName: '陈大强',
    type: '充值',
    amount: 80,
    points: 0,
    peopleCount: '-',
    course: null,
    transactionTime: '2025-04-19 14:00',
  },
  {
    id: 3,
    memberName: '黄丽娟',
    type: '支出',
    amount: 60,
    points: 2,
    peopleCount: 4,
    course: {
      name: '燃脂有氧',
      date: '2025-04-18',
      time: '20:00',
    },
    transactionTime: '2025-04-18 20:30',
  },
];

const AdminTransaction: React.FC = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);

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
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.memberName}</td>
              <td className={t.type === '充值' ? 'income' : 'expense'}>{t.type}</td>
              <td>{t.amount}</td>
              <td>{t.points}</td>
              <td>{t.peopleCount}</td>
              <td>
                {t.course
                  ? `${t.course.name}（${t.course.date} ${t.course.time}）`
                  : '-'}
              </td>
              <td>{t.transactionTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransaction;
