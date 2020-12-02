import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';



class MoneyBook extends Component { // ■関数コンポーネントからクラスコンポーネントに変更

  constructor(props) {
    super(props);
    this.state = { books: [] }; // ■小遣い帳のデータをStateでもたせる
  }

  componentDidMount() { // ■小遣い帳のデータをこのメソッドで設定→最初に空の小遣い帳が表示され、その後にこのメソッドのデータが追加される形式に変更
    this.setState(
      {
        books: [
          { date: "1/1", item: "お年玉", amount: 10000 },
          { date: "1/3", item: "ケーキ", amount: -500 },
          { date: "2/1", item: "小遣い", amount: 3000 },
          { date: "2/5", item: "漫画", amount: -600 }
        ]
      }
    );
  }

  addBook(date, item, amount) { // ■小遣い帳にデータを追加するメソッド
    const book = { date: date, item: item, amount: amount };
    this.setState({ books: this.state.books.concat(book) }); // ■配列の最後に連結する事でStateを更新
  }

  render() { // ■表示処理を<MoneyBookList>に集約、<MoneyEntry>のadd属性にはaddBookメソッドを呼び出す無名関数を渡している
    return (
      <div>
        <Title>小遣い帳</Title>
        <MoneyBookList books={this.state.books} />
        <MoneyEntry add={(date, item, amount) => this.addBook(date, item, amount)} />
      </div>
    )
  }

}

class MoneyEntry extends Component { // ■小遣い帳のデータ追加入力フォームのコンポーネント

  constructor(props) {
    super(props);
    this.date = null; // ■値を取得する為のインスタンス変数を設定、※ここは無くてもいいが、可読性・理解度upの為に記述を推奨
    this.item = null;
    this.amount = null;
    this.payingIn = null;
  }

  onClickSubmit() { // ■追加ボタンを押した時の処理
    this.props.add(this.date.value, this.item.value, this.amount.value * (this.payingIn.checked ? 1 : -1)); // ■ラジオボタン、テキストフィールド、追加ボタンの属性は、value又はcheckedで参照出来る
    this.date.value = ""; // ■追加ボタンを押したので、いった初期化
    this.item.value = "";
    this.amount.value = "";
    this.payingIn.checked = true;
  }


  render() { // ■無名関数の引数nodeにはこのタグを参照するための情報が入っている、defaultChecked属性はReact独自のもので最初に表示した時にdefaultでチェック表示する
    return (
      <div className="entry">
        <fieldset>
          <legend>記帳</legend>
          <div>
            <input type="radio" defaultChecked name="payingInOut" ref={(node) => this.payingIn = node} />入金
          <input type="radio" name="payingInOut" />出金
        </div>
          <div>
            日付：<input type="text" defaultValue="" ref={(node) => this.date = node} placeholder="3/15" />
        項目：<input type="text" defaultValue="" ref={(node) => this.item = node} placeholder="おこづかい" />
        金額：<input type="text" defaultValue="" ref={(node) => this.amount = node} placeholder="1000" />
          </div>
          <div>
            <input type="submit" value="追加" onClick={() => this.onClickSubmit()} />
          </div>
        </fieldset>

      </div>
    )
  }

}
MoneyEntry.propTypes = {
  add: PropTypes.func.isRequired
}

const MoneyBookList = (props) => {
  return (
    <div>
      <table className="book">
        <thead datatype="ok">
          <tr><th>日付</th><th>項目</th><th>入金</th><th>出金</th></tr>
        </thead>
        <tbody>
          {
            props.books.map((book, idx) => {
              return <MoneyBookItem book={book} key={idx + book.date + book.item} />
            })
          }
        </tbody>
      </table>
    </div>
  )
}
MoneyBookList.propTypes = {
  books: PropTypes.array.isRequired
}


const MoneyBookItem = (props) => {
  const { date, item, amount } = props.book;
  return (
    <tr><td>{date}</td>
      <td>{item}</td>
      <td>{amount >= 0 ? amount : null}</td>
      <td>{amount < 0 ? -amount : null}</td>
    </tr>
  )
};

MoneyBookItem.propTypes = {
  book: PropTypes.object.isRequired
};

// 子要素のコンポーネント
const Title = (props) => {
  return (<h1>{props.children}</h1>)
}

Title.propTypes = {
  children: PropTypes.object.string
}

ReactDOM.render(
  <MoneyBook />,
  document.getElementById('root')
);
