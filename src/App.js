import React, { Component } from "react";
import axios from "axios";
import Loading from "./loading";
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      errorState: false,
      currentIndex: 0,
      currentReview: []
    };
  }

  componentDidMount() {
    const { currentIndex } = this.state;
    axios
      .get(process.env.REACT_APP_SECRET_CODE)
      .then(res => {
        const { data } = res;
        this.setState({
          data,
          currentReview: data[currentIndex],
          loading: false
        });
      })
      .catch(error => {
        this.setState({ errorState: true, loading: false });
      });
  }

  render() {
    let content;
    const { errorState, loading, currentReview, currentIndex } = this.state;
    if (loading) {
      content = <Loading />;
    } else if (errorState) {
      content = <>error</>;
    } else {
      content = (
        <div>
          <h1>Carousel with styled-components</h1>
          {currentReview.comments}
          {currentIndex}
        </div>
      );
    }
    return <>{content}</>;
  }
}

export default App;
