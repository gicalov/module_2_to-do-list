import React from "react";
import "./style.css";

class Error extends React.Component {
  render() {
    const { error } = this.props;

    return (
      <div className="error">
        <span className="error-message">Error: {error}</span>
      </div>
    );
  }
}

export default Error;