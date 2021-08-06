import React, { Component } from 'react';
import './zoomMeeting.css'

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

class ZoomMeeting extends Component {
  constructor(props){
    super(props);
    const zoomClientUrl = 'http://localhost:3001'
    const meetingNumber = props.meetingNumber
    const meetingName = props.meetingName
    const userName = localStorage.getItem('username')
    const urlQueryParams = {
      meetingNumber,
      meetingName,
      userName
    }
    this.redirectUrl = zoomClientUrl + '/?' + serialize(urlQueryParams)
    this.redirect = this.redirect.bind(this);
  }

  redirect(){
    window.location.replace(this.redirectUrl);
  }

  render(){
    return(
      <div className="App">
        <main>
          <br />
          <br />
          <h1>Click below to be redirected</h1>
          <br />
          <br />
          <button onClick={this.redirect}>Redirect</button>
        </main>
      </div>
    );
  }
}

export default ZoomMeeting;