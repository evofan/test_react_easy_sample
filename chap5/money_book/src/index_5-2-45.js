import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';// ■コンポーネントに渡す引数をチェックしてくれるモジュール
import './index.css';


const MoneyBook = () => {
  const books = [
    { date: "1/1", item: "お年玉", amount: 10000 },
    { date: "1/3", item: "ケーキ", amount: -500 },
    { date: "2/1", item: "小遣い", amount: 3000 },
    { date: "2/5", item: "漫画", amount: -600 }
  ]
  return (
    <div>
      <h1>小遣い帳</h1>
      <table className="book">
        <thead>
          <tr><th>日付</th><th>項目</th><th>入金</th><th>出金</th></tr>
        </thead>
        <tbody>
          <MoneyBookItem book={books[0]} />
          <MoneyBookItem book={books[1]} />
          <MoneyBookItem book={books[2]} />
          <MoneyBookItem book={books[3]} />
        </tbody>
      </table>
    </div>
  )
};

const MoneyBookItem = (props) => { // ■MoneyBookItemコンポーネントの定義、パラメーターをpropsで受け取る
  const { date, item, amount } = props.book;
  // ■↓と同じ
  // const data = props.book.data;
  // const item = props.book.item;
  // const amount = props.book.amount;
  /*
  if (amount > 0) { // ■入金と出金で表示する列が違うので、条件分岐で表示するJSXを分ける
    return (
      <tr><td>{date}</td><td>{item}</td><td>{amount}</td><td></td></tr>
    )
  } else {
    return (
      <tr><td>{date}</td><td>{item}</td><td></td><td>{-amount}</td></tr>
    )
  }
  */
  return (
    <tr><td>{date}</td>
      <td>{item}</td>
      <td>{amount >= 0 ? amount : null}</td>
      <td>{amount < 0 ? -amount : null}</td>
    </tr>
  )
};

MoneyBookItem.propTypes = { // ■MoneyBookItemコンポーネントに渡すパラメーターの型チェック、コンパイル時のエラー検出の為入れる事を推奨
  book: PropTypes.object.isRequired // ■object型のbookが渡ってくると定義、isRequiredが付いてるのでbookパラメーターが渡って来ない場合はconsole上にエラー表示
};

ReactDOM.render(
  <MoneyBook />,
  document.getElementById('root')
);
