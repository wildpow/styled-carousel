import React, { Component } from "react";
import axios from "axios";
import Loading from "./loading";
import styled from "styled-components";

const Wrap = styled.div`
  width: 680px;
  height: 300px;
  margin: 0 auto;
  background-color: green;
`;
const Slide = styled.div`
  display: grid;
  grid-template-columns: 40px 600px 40px;
  grid-template-rows: 300px;
  button {
    appearance: none;
    border: none;
  }
`;
const Button = styled.button`
  align-self: center;
  padding: 0;
  cursor: pointer;
  opacity: 0.4;
  z-index: 2;
  transition: all 0.25s ease-in 0s;
  background: 0 0;
  border: 0;
  font-size: 0px;
  outline: none;
  height: 100%;
  :hover {
    background: rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
  :before {
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    content: "";
  }
`;
const Back = styled(Button)`
  grid-column-start: 1;
  grid-column-end: 1;
  :before {
    border-right: 20px solid #fff;
  }
`;

const Next = styled(Button)`
  grid-column-start: 3;
  grid-column-end: 3;
  :before {
    border-left: 20px solid #fff;
  }
`;
const Content = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
  align-self: center;
  justify-self: center;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      currentIndex: 0,
      pause: false,
      data: [],
      maxIndex: 0
    };
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.loop = this.loop.bind(this);
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SECRET_CODE)
      .then(res => {
        const { data } = res;
        const filteredData = data.filter(val => val.comments !== null);
        const maxIndex = filteredData.length - 1;
        this.setState({
          data: filteredData,
          loading: false,
          maxIndex
        });
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
      });
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

  back() {
    if (this.state.currentIndex === 0) {
      this.setState({ currentIndex: this.state.data.length - 1 });
    } else {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  }

  next() {
    if (this.state.currentIndex === this.state.maxIndex) {
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  }

  render() {
    let content;
    const { error, loading, currentIndex, data } = this.state;
    if (loading) {
      content = <Loading />;
    } else if (error) {
      content = <>error</>;
    } else {
      content = (
        <Wrap
          onMouseEnter={() => this.setState({ pause: true })}
          onMouseLeave={() => this.setState({ pause: false })}
        >
          <Slide>
            <Back type="button" onClick={this.back}>
              back
            </Back>
            <Content>
              {console.log(this.state.currentIndex)}
              <p>{data[currentIndex].comments}</p>
            </Content>
            <Next type="button" onClick={this.next}>
              next
            </Next>
          </Slide>
        </Wrap>
      );
    }
    return <>{content}</>;
  }
}
export default App;
