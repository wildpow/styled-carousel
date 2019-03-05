import React from "react";

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: this.props.initialCount };
  }

  increment() {
    this.setState(({ count }) => ({ count: count + 1 }));
  }

  render() {
    return (
      <button onClick={this.increment}>
        Current Count: {this.state.count}
      </button>
    );
  }
}

export default Counter;
