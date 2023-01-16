import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button
      className={
        props.className + ' m-1 w-10 h-12 rounded bg-cyan-500 text-white active:bg-cyan-700'
      }
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}
Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.any,
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [null],
      screenContent: [],
      operator: null,
      prev: null,
    };
  }

  History() {
    const history = this.state.history;
    const list = history.map((step, move) => {
      const desc = move
        ? history[move].prevHist +
          ' ' +
          history[move].operatorHist +
          ' ' +
          history[move].current +
          ' = ' +
          history[move].result
        : 'History: ';
      return (
        <li key={move} className='text-white'>
          {desc}
        </li>
      );
    });
    return list;
  }

  Calculate() {
    const current = this.contentToNum();
    if (this.state.operator === '+') {
      const num = this.state.prev + current;
      const content = {
        current: current,
        operatorHist: this.state.operator,
        prevHist: this.state.prev,
        result: num,
      };
      this.setState({
        history: [...this.state.history, content],
        screenContent: [num],
      });
    } else if (this.state.operator === '-') {
      const num = this.state.prev - current;
      const content = {
        current: current,
        operatorHist: this.state.operator,
        prevHist: this.state.prev,
        result: num,
      };
      this.setState({
        history: [...this.state.history, content],
        screenContent: [num],
      });
    } else if (this.state.operator === 'x') {
      const num = this.state.prev * current;
      const content = {
        current: current,
        operatorHist: this.state.operator,
        prevHist: this.state.prev,
        result: num,
      };
      this.setState({
        history: [...this.state.history, content],
        screenContent: [num],
      });
    } else {
      const num = this.state.prev / current;
      const content = {
        current: current,
        operatorHist: this.state.operator,
        prevHist: this.state.prev,
        result: num,
      };
      this.setState({
        history: [...this.state.history, content],
        screenContent: [num],
      });
    }
  }
  contentToNum() {
    let content = this.state.screenContent;
    let int = 0,
      decimal = 0,
      temp = 1,
      j = 1,
      dot = false;
    while (!dot && Number.isFinite(temp)) {
      if (content[0] === '.') {
        dot = true;
        content.shift();
        continue;
      }
      temp = content.shift();
      if (Number.isFinite(temp)) {
        int = int * 10 + temp;
      }
    }
    temp = content.shift();
    while (Number.isFinite(temp)) {
      decimal = decimal + temp * Math.pow(0.1, j);
      j++;
      temp = content.shift();
    }
    int = int + decimal;
    return int;
  }
  handleSymbol(x) {
    if (x === '=') {
      this.Calculate();
    } else if (x === '.') {
      this.setState({ screenContent: [...this.state.screenContent, x] });
    } else {
      let int = this.contentToNum();
      this.setState({
        operator: x,
        prev: int,
        screenContent: [],
      });
    }
  }
  handleClick(i) {
    if (!Number.isInteger(i)) {
      this.handleSymbol(i);
      return;
    } else {
      this.setState({ screenContent: [...this.state.screenContent, i] });
    }
  }
  Operators() {
    let group = [];
    group.push(<Button value='+' className='h-8' onClick={() => this.handleClick('+')}></Button>);
    group.push(<Button value='-' className='h-8' onClick={() => this.handleClick('-')}></Button>);
    group.push(<Button value='x' className='h-8' onClick={() => this.handleClick('x')}></Button>);
    group.push(<Button value='/' className='h-8' onClick={() => this.handleClick('/')}></Button>);
    group.push(
      <Button
        className=''
        value='AC'
        onClick={() => this.setState({ screenContent: [] })}
      ></Button>,
    );
    return group;
  }
  Keyboard() {
    let board = [];
    board.push(<Button value='=' onClick={() => this.handleClick('=')}></Button>);
    board.push(
      <Button className='periodBtn' value='.' onClick={() => this.handleClick('.')}></Button>,
    );
    board.push(<Button value={0} onClick={() => this.handleClick(0)}></Button>);

    for (let i = 1; i < 10; i++) {
      board.push(<Button value={i} onClick={() => this.handleClick(i)}></Button>);
    }
    board.reverse();

    return board;
  }

  renderScreen() {
    return (
      <div className='h-12 pt-3 text-white bg-stone-400 text-xl w-40'>
        {[...this.state.screenContent]}
      </div>
    );
  }
  render() {
    return (
      <div className='grid grid-cols-3 bg-slate-500 p-10 rounded'>
        <div className='w-min col-span-3'>{this.renderScreen()}</div>
        <div className='grid py-2 px-3 grid-cols-3 bg-slate-600 '>{this.Keyboard()}</div>
        <div className='grid grid-col-1 w-min pr-5 block bg-slate-600 pt-3'>{this.Operators()}</div>
        <div className='bg-red-400 rounded'>
          <ol>{this.History()}</ol>
        </div>
      </div>
    );
  }
}

export default Calculator;
