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
    this.state = { date: '', item: '', amount: '', payingIn: true }; // ■date、item、amountの各入力値、payingIn（入金/出金の状態）を持つ
  }

  /*
  onChangeDate(event) { // ■inputタグのonChange属性で呼び出される、引数のeventはEventオブジェクトでイベントに関する情報を含んでいる
    this.setState({ date: event.target.value }) // ■event.target.valueは、イベントを起こしたHTMLのvalueの値、それをStateに設定している
  }

  onChangeItem(event) {
    this.setState({ item: event.target.value })
  }

  onChangeAmount(event) {
    this.setState({ amount: event.target.value })
  }
  */
  onChangeValue(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onChangePayingIn(event) {
    this.setState({ payingIn: event.target.value === "on" }) // ■ラジオボタンのvalueの値がonならpayingInにtrueを設定
  }

  onClickSubmit() { // ■追加ボタンを押した時の処理
    this.props.add(this.state.date, this.state.item, this.state.amount * (this.state.payingIn ? 1 : -1)); // ■propsで渡されたadd関数を呼び出し、payingInがfalseの時はamountを-に
    this.setState({ date: '', item: '', amount: '', payingIn: false }); // ■add呼び出し後はStateの値を初期値にリセット
  }

  /*
  render() { // ■ラジオボタン、テキストフィールド、追加ボタン
    return (
      <div className="entry">
        <fieldset>
          <legend>記帳</legend>
          <div>
            <input type="radio" value="on" checked={this.state.payingIn} onChange={(event) => this.onChangePayingIn(event)} />入金
            <input type="radio" value="off" checked={!this.state.payingIn} onChange={(event) => this.onChangePayingIn(event)} />出金
          </div>
          <div>
            日付：<input type="text" value={this.state.date} onChange={(event) => this.onChangeDate(event)} placeholder="3/15" />
          項目：<input type="text" value={this.state.item} onChange={(event) => this.onChangeItem(event)} placeholder="おこづかい" />
          金額：<input type="text" value={this.state.amount} onChange={(event) => this.onChangeAmount(event)} placeholder="1000" />
          </div>
          <div>
            <input type="submit" value="追加" onClick={() => this.onClickSubmit()} />
          </div>
        </fieldset>

      </div>
    )
  }
  */
  render() { // ■ラジオボタン、テキストフィールド、追加ボタン
    return (
      <div className="entry">
        <fieldset>
          <legend>記帳</legend>
          <div>
            <input type="radio" value="on" checked={this.state.payingIn} onChange={(event) => this.onChangePayingIn(event)} />入金
          <input type="radio" value="off" checked={!this.state.payingIn} onChange={(event) => this.onChangePayingIn(event)} />出金
        </div>
          <div>
            日付：<input type="text" name="date" value={this.state.date} onChange={(event) => this.onChangeValue(event)} placeholder="3/15" />
        項目：<input type="text" name="item" value={this.state.item} onChange={(event) => this.onChangeValue(event)} placeholder="おこづかい" />
        金額：<input type="text" name="amount" value={this.state.amount} onChange={(event) => this.onChangeValue(event)} placeholder="1000" />
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

const MoneyBookList = (props) => { // ■表示処理を<MoneyBookList>に集約
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
