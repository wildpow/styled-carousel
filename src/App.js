import React, { Component } from "react";
import axios from "axios";
import Loading from "./loading";
import styled from "styled-components";
// import Truncate from "react-truncate";
import TruncateMarkup from "react-truncate-markup";
import { NodeGroup } from "react-move";

const Wrap = styled.div`
  width: 680px;
  height: 300px;
  margin: 0 auto;
  background-color: lightgray;
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
  align-self: flex-start;
  justify-self: center;
  font-family: "Open Sans";
  line-height: 1.6em;
  font-size: 1.6em;
  /* margin-top: 20px;
  margin-right: 5px;
  margin-left: 5px; */
  text-indent: 20px;
  width: 680px;
  height: 300px;
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
    }, 3000);
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
    const readMore = (
      <span>
        ...{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={
            data[currentIndex]
              ? `https://birdeye.com/esc-mattress-center-154743411347922/review/${
                  data[currentIndex].reviewId
                }`
              : "https://birdeye.com/esc-mattress-center-154743411347922"
          }
        >
          read more
        </a>
      </span>
    );
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
              <NodeGroup
                style={{ position: "relative" }}
                data={[currentIndex]}
                keyAccessor={d => d}
                start={() => ({
                  opacity: 0
                })}
                enter={() => ({
                  opacity: [1],
                  timing: { duration: 500 }
                })}
                update={() => ({
                  opacity: [1],
                  timing: { duration: 500 }
                })}
                leave={() => ({
                  opacity: [0],
                  timing: { duration: 300 }
                })}
              >
                {nodes => (
                  <div style={{ position: "relative" }}>
                    {nodes.map(({ key, data, state: { opacity } }) => (
                      <div key={key} style={{ opacity, position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            margin: "25px",
                            padding: "20px"
                          }}
                        >
                          <TruncateMarkup lines={4} ellipsis={readMore}>
                            <div>{this.state.data[data].comments}</div>
                          </TruncateMarkup>
                          <p>
                            {`- ${this.state.data[data].reviewer.firstName} `}
                            {`${this.state.data[data].reviewer.lastName}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </NodeGroup>

              {/* {console.log(data[currentIndex])} */}

              {/* </TruncateMarkup> */}
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
