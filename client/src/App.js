import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { storage } from "./firebase-config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      firebaseImg: null
    };
  }

  // onChangeHandler = event => {
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded: 0
  //   });
  //   console.log(event.target.files[0]);
  // };

  // onClickHandler = () => {
  //   const data = new FormData();
  //   data.append("imageName", "1")
  //   data.append("file", this.state.selectedFile);
  //   axios
  //     .post("http://localhost:8000/upload", data, {
  //       // receive two    parameter endpoint url ,form data
  //     })
  //     .then(res => {
  //       // then print response status
  //       console.log(res.statusText);
  //     });
  // };

  setDefaultimage(type) {
    if (type === 'firebase') {
      this.setState({
        firebaseImg: null
      })
    }
  }

  onChangeHandler = e => {
    this.setState({
      firebaseImg: URL.createObjectURL(e.target.files[0])
    });
  }

  upload(e, type) {
    let imageObj = {};

    let currentImageName = "firebase-image-" + Date.now();

    let uploadImage = storage.ref(`images/${currentImageName}`).put(e.target.files[0]);
    
    uploadImage.on('state_changed',
      (snapshot) => { },
      (error) => {
        alert(error);
      },
      () => {
        storage.ref('images').child(currentImageName).getDownloadURL()
          .then(url => {
            this.setState({
              firebaseImg: url
            })

            imageObj = {
              imageName: currentImageName,
              imageData: url
            }
            console.log(imageObj);
            
            axios.post('/api/image/uploadbase', imageObj)
              .then((data) => {
                if (data.success) {
                  alert("Yes!!")
                }
              })  
              .catch((err) => {
                alert("Say no");
                this.setDefaultimage("firebase");
              })
          })
      }
    )

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {/* <input type="file" name="file" onChange={this.onChangeHandler} />
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={this.onClickHandler}
          >
            Upload
          </button> */}
          <input type="file" onChange={ this.onChangeHandler } />
          <img src={ this.state.firebaseImg } />
          <button onClick={ (e) => this.upload(e, "firebase") }>Upload</button>
        </div>
      </div>
    );
  }
}

export default App;
