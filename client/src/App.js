import React, { Component } from "react";
import axios from "axios";
import DefaultImg from "defaultimg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      multerImage: DefaultImg,
      firebaseImage: DefaultImg,
      baseImage: DefaultImg,
      photo: null
    };

    this.onSubmit = this.onSubmit.bind(this);

  }

  // setDefaultImage(uploadType) {
  //   if (uploadType === "multer") {
  //     this.setState({
  //       multerImage: DefaultImg
  //     });
  //   }
  // }

  onChangePicture(e) {
    this.setState({ 
      [e.target.name]: e.target.files[0]
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let imageObj = new FormData();
    // imageObj.append('imageName', 'multer-image-'+Date.now());
    imageObj.append("imageData", this.state.photo);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios.post("/test/image/uploadmulter", imageObj, config)
      .then(data => {
        if (data.data.success) {
          alert("Say yes!!");
        }
      })
      .catch(err => {
        alert("Say no!!");
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="file" name="photo" onChange={this.onChangePicture.bind(this)} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
