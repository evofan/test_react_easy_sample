import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MoneyBook = () => {
  return(
    <div>
      <h1>小遣い帳</h1>
      <table className="book">
        <thead>
          <tr><th>日付</th><th>項目</th><th>入金</th><th>出金</th></tr>
        </thead>
        <tbody>
          <tr><td>1/1</td><td>お年玉</td><td>10000</td><td></td></tr>
          <tr><td>1/3</td><td>ケーキ</td><td></td><td>500</td></tr>
          <tr><td>2/1</td><td>小遣い</td><td>3000</td><td></td></tr>
          <tr><td>2/5</td><td>漫画</td><td></td><td>600</td></tr>
        </tbody>
      </table>
    </div>
  )
};

ReactDOM.render(
  <MoneyBook />,
  document.getElementById('root')
);
