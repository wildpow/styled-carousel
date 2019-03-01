import React, { Component } from "react";
import axios from "axios";
import Loading from "./loading";
import styled from "styled-components";
import TruncateMarkup from "react-truncate-markup";
import { NodeGroup } from "react-move";
import star from "./stars.svg";
const InsideWrapper = styled.div`
  /* position: absolute; */
  /* padding: 20px; */
  /* display: flex;
  justify-content: center;
  align-content: center;
  justify-self: center;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  margin-top: 22px;
  margin-bottom: 22px; */
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 680px;
  height: 300px;
  text-align: center;
`;
const ReadMore = styled.a`
  color: #1565c0;
  transition: all 250ms ease-in-out;
  text-decoration: none;
  font-family: "Roboto";
  font-weight: 300;
  font-size: 0.9em;
  :hover {
    color: #eb1c24;
  }
`;
const Wrap = styled.div`
  /* width: 680px;
  height: 300px; */
  margin: 50px auto;
  /* border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-top: 1px solid #eee; */
  /* background: #1565c0; */
  /* box-shadow: 0 10px 6px -6px rgba(119, 119, 119, 0.6); */
`;
const Name = styled.span`
  font-family: "Roboto";
  font-weight: 300;
  line-height: 21px;
  font-size: 15px;
  color: #2d3e50;
  text-align: center;
  justify-self: center;
  /* margin-top: 22px !important; */
`;
const Review = styled.p`
  font-family: "Roboto";
  line-height: 1.2em;
  font-size: 22px;
  font-weight: 500;
  color: #2d3e50;
  /* text-align: center; */
  justify-self: center;
  align-content: center;
  justify-self: center;
  justify-items: center;
  align-items: center;
  margin: 22px auto;
  /* text-indent: 60px; */
  /* text-align: center; */
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  height: 30px;
  /* margin-bottom: 22px; */
  align-self: center;
  justify-self: center;
`;
class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: false,
      currentIndex: 1,
      pause: false,
      content: [],
      maxIndex: 0
    };
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
          content: filteredData,
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
  render() {
    const { content, error, loading, currentIndex } = this.state;
    const readMore = (
      <span>
        {`  ...`}
        <ReadMore
          target="_blank"
          rel="noopener noreferrer"
          href={
            content[currentIndex]
              ? `https://birdeye.com/esc-mattress-center-154743411347922/review/${
                  content[currentIndex].reviewId
                }`
              : "https://birdeye.com/esc-mattress-center-154743411347922"
          }
        >
          read more
        </ReadMore>
      </span>
    );
    if (loading) return <Loading />;
    if (error) return null;
    return (
      <Wrap
        onMouseEnter={() => this.setState({ pause: true })}
        onMouseLeave={() => this.setState({ pause: false })}
      >
        <Content>
          <Img
            src={star}
            alt="E.S.C mattress centers average review is 5 stars"
          />
          <NodeGroup
            style={{ position: "relative" }}
            data={[currentIndex]}
            keyAccessor={d => d}
            start={() => ({
              opacity: 0
            })}
            enter={() => ({
              opacity: [1],
              timing: { duration: 1000 }
            })}
            update={() => ({
              opacity: [1],
              timing: { duration: 1000 }
            })}
            leave={() => ({
              opacity: [0],
              timing: { duration: 200 }
            })}
          >
            {nodes => (
              <div style={{ position: "relative" }}>
                {nodes.map(({ key, data, state: { opacity } }) => (
                  <div key={key} style={{ opacity, position: "relative" }}>
                    <InsideWrapper>
                      <TruncateMarkup lines={3} ellipsis={readMore}>
                        <Review>{content[data].comments}</Review>
                      </TruncateMarkup>
                      <Name>
                        {`- ${content[data].reviewer.firstName} `}
                        {`${content[data].reviewer.lastName}`}
                      </Name>
                    </InsideWrapper>
                  </div>
                ))}
              </div>
            )}
          </NodeGroup>
        </Content>
      </Wrap>
    );
  }
}

export default Reviews;
