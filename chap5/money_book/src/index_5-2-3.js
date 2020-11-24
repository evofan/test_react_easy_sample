import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MoneyBook = () => {
  const books = [
    { data: "1/1", item: "お年玉", amount: 10000 },
    { data: "1/3", item: "ケーキ", amount: -500 },
    { data: "2/1", item: "小遣い", amount: 3000 },
    { data: "2/5", item: "漫画", amount: -600 },
  ]
  return (
    <div>
      <h1>小遣い帳</h1>
      <table className="book">
        <thead>
          <tr><th>日付</th><th>項目</th><th>入金</th><th>出金</th></tr>
        </thead>
        <tbody>
          <tr><td>{books[0].data}</td><td>{books[0].item}</td><td>{books[0].amount}</td><td></td></tr>
          <tr><td>{books[1].data}</td><td>{books[1].item}</td><td></td><td>{-books[1].amount}</td></tr>
          <tr><td>{books[2].data}</td><td>{books[2].item}</td><td>{books[2].amount}</td><td></td></tr>
          <tr><td>{books[3].data}</td><td>{books[3].item}</td><td></td><td>{-books[3].amount}</td></tr>
        </tbody>
      </table>
    </div>
  )
};

ReactDOM.render(
  <MoneyBook />,
  document.getElementById('root')
);
