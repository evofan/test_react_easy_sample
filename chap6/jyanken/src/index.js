import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';// ■コンポーネントに渡す引数をチェックしてくれるモジュール
import './index.css';

class JyankenGamePage extends Component {
  constructor(props) { // ■ES6のコンストラクタ、※ReactコンポーネントではPropsを受け取る
    super(props); // ■最初にスーパークラスのコンストラクタを呼び出す、オブジェクト指向でよくあるパターン
    this.state = { human: null, computer: null } // ■this.stateに初期値を代入、後で他クラスで動的に設定も出来るが、
    // ★可読性を考慮して、コンストラクタで初期値（適切な値が無ければNull）を設定しておく事を推奨
  }

  /**
   * 人間の手を受け取り、ジャンケンを行う
   * @param { number } human_hand 
   */
  pon(human_hand) {
    const computer_hand = Math.floor(Math.random() * 3); // ■乱数を使ってCPU側のてを設定する
    this.setState({ human: human_hand, computer: computer_hand }); // ■人間の手、CPUの手をステートに格納
  }

  /**
   * ジャンケンの勝敗を判定する
   */
  judge() {
    if (this.state.human === null) { // 人間の手が設定されてない場合はnullを返す
      return null;
    } else {
      return (this.state.computer - this.state.human + 3) % 3;// ■引き分けなら0、人間の勝ちなら1、CPU勝ちなら2を返す＝アルゴリズム
    }
  }

  // ライフサイクルメソッドのテスト
  /*
  componentDidMount() {
    setTimeout(() => { this.pon(1) }, 1000);
  }
  */

  render() {
    return (
      <div>
        <h1>ジャンケンぽん</h1>
        <JyankenBox actionPon={(te) => this.pon(te)} />
        <ScoreBox human={this.state.humnan} computer={this.state.computer} judgement={this.judge()} />
      </div>
    )
  }
}

const JyankenBox = (props) => {
  return (
    <div>
      <button onClick={() => props.actionPon(0)}>グー</button>
      <button onClick={() => props.actionPon(1)}>チョキ</button>
      <button onClick={() => props.actionPon(2)}>パー</button>
    </div>
  )
};
JyankenBox.propTypes = {
  actionPon: PropTypes.func
}

/**
 * 人間の手、CPUの手、勝敗を表示する
 * @param { object } props 
 */
const ScoreBox = (props) => {
  const teString = ["グー", "チョキ", "パー"];
  const judgementString = ["引き分け", "勝ち", "負け"];
  // 0-2の手を文字列表示に変換、0-2の勝敗結果を文字列表示に変換、
  return (
    <div>
      <table>
        <tbody>
          <tr><th>あなた</th><td>{teString[props.human]}</td></tr>
          <tr><th>CPU</th><td>{teString[props.computer]}</td></tr>
          <tr><th>勝敗</th><td>{judgementString[props.judgement]}</td></tr>
        </tbody>
      </table>
    </div>
  )
};
ScoreBox.propTypes = {
  human: PropTypes.number,
  computer: PropTypes.number,
  judgement: PropTypes.number
}

ReactDOM.render(
  <JyankenGamePage />,
  document.getElementById('root')
);
