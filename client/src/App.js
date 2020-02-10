import React, { Component } from "react";
import axios from "axios";
import DefaultImg from "defaultimg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("imageName", "1")
    data.append("file", this.state.selectedFile);
    axios
      .post("http://localhost:8000/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={this.onClickHandler}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default App;
