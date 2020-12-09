import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
// import { Tabs, Tab } from 'material-ui/Tabs';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Jyanken from './jyanken';
import { FlatButton } from 'material-ui';
// import './index.css';
// material-uiコンポーネントの説明ページからコピー

class JyankenGamePage extends Component {
  constructor(props) {
    super(props);
    this.jyanken = new Jyanken();
    this.state = { scores: [], status: {}, tabIndex: 0 };
  }

  componentDidMount() {
    this.getResult();
  }

  tabChange(ix) {
    this.setState({ tabIndex: ix });
    this.getResult();
  }

  getResult() {
    this.setState({ scores: this.jyanken.getScores() });
    this.setState({ status: this.jyanken.getStatuses() });
  }

  /**
   * 人間の手を受け取り、ジャンケンを行う
   * @param { number } te
   */
  pon(te) {
    this.jyanken.pon(te);
    this.getResult();
  }

  render() {
    const tabStyle = { width: 200, height: 50, textAlign: 'center', color: '#fff', backgroundColor: '#01bcd4', borderRadius: 0 };
    const activeStyle = (path) => Object.assign({ borderBottom: `solid 2px ${this.props.location.pathname.match(path) ? '#f00' : '#01bcd4'}` }, tabStyle);
    // ■Linkコンポーネントは<a>タグに相当
    // ■Routeコンポーネントは、pathで指定したURLにアクセスすると、componentで指定したコンポーネントを実行する
    // ■Reddiretコンポーネントが実行されると、toで指定したURLにリダイレクトする
    return (
      <MuiThemeProvider>
        <div style={{ marginLeft: 30 }}>
          <Header>ジャンケンぽん！</Header>
          <JyankenBox actionPon={(te) => this.pon(te)} />
          <Paper style={{ width: 400 }} zDepth={2}>
            <Link id="tab-scores" to="/scores" style={{ textDecoration: 'none' }}><FlatButton style={activeStyle('scores')}>対戦結果</FlatButton></Link>
            <Link id="tab-status" to="/status" style={{ textDecoration: 'none' }}><FlatButton style={activeStyle('status')}>対戦成績</FlatButton></Link>
            <Route path="/scores" component={() => <ScoreList scores={this.state.scores} />} />
            <Route path="/status" component={() => <StatusBox status={this.state.status} />} />
            <Route exact path="/" component={() => <Redirect to="/scores" />} />
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }

}
JyankenGamePage.propTypes = {
  location: PropTypes.object // ESLintでエラーが出ないように定義
}

const Header = (props) => (<h1>{props.children}</h1>);
Header.propTypes = {
  children: PropTypes.string
};

const StatusBox = (props) => (
  <Table>
    <TableBody displayRowCheckbox={false}>

      <TableRow displayBorder={false}>
        <TableHeaderColumn>勝ち</TableHeaderColumn>
        <TableRowColumn style={judgementStyle(1)}>{props.status.win}</TableRowColumn>
      </TableRow>

      <TableRow displayBorder={false}>
        <TableHeaderColumn>負け</TableHeaderColumn>
        <TableRowColumn style={judgementStyle(2)}>{props.status.lose}</TableRowColumn>
      </TableRow>

      <TableRow displayBorder={false}>
        <TableHeaderColumn>引き分け</TableHeaderColumn>
        <TableRowColumn style={judgementStyle(0)}>{props.status.draw}</TableRowColumn>
      </TableRow>

    </TableBody>
  </Table>
);
StatusBox.propTypes = {
  status: PropTypes.object
};

const JyankenBox = (props) => {
  const style = { marginLeft: 20 };
  return (
    <div style={{ marginTop: 40, marginBottom: 30, marginLeft: 30 }}>
      <RaisedButton label="グー" onClick={() => props.actionPon(0)} style={style} />
      <RaisedButton label="チョキ" onClick={() => props.actionPon(1)} style={style} />
      <RaisedButton label="パー" onClick={() => props.actionPon(2)} style={style} />
    </div>
  )
};
JyankenBox.propTypes = {
  actionPon: PropTypes.func
}

const ScoreList = (props) => (
  <Table>
    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>時間</TableHeaderColumn>
        <TableHeaderColumn>人間</TableHeaderColumn>
        <TableHeaderColumn>コンピューター</TableHeaderColumn>
        <TableHeaderColumn>結果</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.scores.map((score, ix) => <ScoreListItem key={ix} score={score} />)}
    </TableBody>
  </Table>
);
ScoreList.propTypes = {
  scores: PropTypes.array
}

/**
 * 人間の手、CPUの手、勝敗を表示する
 * @param { object } props 
 */
const ScoreListItem = (props) => {
  const teString = ["グー", "チョキ", "パー"];
  const judgementString = ["引き分け", "勝ち", "負け"];
  const dateHHMMSS = (d) => d.toTimeString().substr(0, 8);
  return (
    <TableRow style={judgementStyle(props.score.judgement)}>
      <TableRowColumn>{dateHHMMSS(props.score.created_at)}</TableRowColumn>
      <TableRowColumn>{teString[props.score.human]}</TableRowColumn>
      <TableRowColumn>{teString[props.score.computer]}</TableRowColumn>
      <TableRowColumn>{judgementString[props.score.judgement]}</TableRowColumn>
    </TableRow>
  )
};
ScoreListItem.propTypes = {
  score: PropTypes.object
}

const judgementStyle = (judgement) => ({ color: ["#000", "#2979FF", "#FF1744"][judgement] });

// ■React Routerを使用するためには、<BrowserRouter>で囲む
ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={JyankenGamePage} />s
  </BrowserRouter>,
  document.getElementById('root')
);

// 本とGitHubのサンプルが違うので注意、差し替えてもエラーで動かない
// <Link to="/scores"><FlatButton label="対戦結果" style={activeStyle('scores')} /></Link>
// <Link to="/status"><FlatButton label="対戦成績" style={activeStyle('status')} /></Link>
// <Route path="/scores" component={() => <ScoreList scores={this.state.scores} />} />
// <Route path="/status" component={() => <StatusBox scores={this.state.status} />} />
// <Route exact path="/" component={() => <Redirect to="/scores" />} />