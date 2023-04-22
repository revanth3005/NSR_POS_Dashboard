import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }
  componentDidCatch(error, info) {
    console.log(info);
    this.setState({
      error: error,
    });
  }
  render() {
    if (this.state.error) {
      return (
        <>
          <h5>Something went wrong in Component!</h5>
        </>
      );
    } else {
      return this.props.children;
    }
  }
}
export default ErrorBoundary;
