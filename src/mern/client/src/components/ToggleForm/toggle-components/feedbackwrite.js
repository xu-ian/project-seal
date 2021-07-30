import React from 'react';
import axios from 'axios';

export default class FeedbackWrite extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // userId = this.props.userId
      feedback: "",
      deliverable: this.props.deliverable,
      instructor: localStorage.getItem('userId')
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.instructor);

    axios.post("http://localhost:5000/feedback/add/"
      + this.state.deliverable + "/" + this.state.instructor, 
      {comment: this.state.feedback})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log("error:" + err);
    })

    window.location.reload();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} >
        <label>
            <textarea id='feedback' value={this.state.value} placeholder = "Write a feedback" onChange={this.handleChange} />
        </label>
        <input class="addButton" style={{"font-size":"18px"}} type="submit" value="Submit Feedback" />
      </form>
    );
  }
}