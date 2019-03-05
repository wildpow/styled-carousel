import React from "react";

class Cool extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      pause: false,
      currentIndex: 0,
      maxIndex: 10
    };
  }
  componentDidMount() {
    this.loop();
  }

  componentDidUpdate() {
    if (
      this.state.maxIndex === this.state.currentIndex &&
      this.state.pause === false
    ) {
      this.setState({ currentIndex: 0 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  loop() {
    setInterval(() => {
      if (!this.state.pause) {
        this.setState({ currentIndex: this.state.currentIndex + 1 });
      }
    }, 1000);
  }
  render() {
    const { currentIndex } = this.state;
    return (
      <div
        style={{
          width: "500px",
          height: "500px",
          background: "yellow",
          margin: "100px"
        }}
        onMouseEnter={() => this.setState({ pause: true })}
        onMouseLeave={() => this.setState({ pause: false })}
      >
        <h1 style={{ fontSize: "4em" }}>{currentIndex}</h1>
      </div>
    );
  }
}

export default Cool;
