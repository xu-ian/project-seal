import React from 'react';
import axios from 'axios';
import FeedbackWrite from './feedbackwrite';

export default class Feedback extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      deliverable: this.props.match.params.id,
      instructor: "",
      comment: "",
      loaded: false,
      isInstructor: false
    };

  }

  componentDidMount() {
    // get the feedback
    axios.get("http://localhost:5000/feedback/" + this.state.deliverable)
        .then((res) => {
          if (res.data != null) {
            this.setState({
              instructor: res.data.instructor.username,
              comment: res.data.comment,
              loaded: true
            });
          }

        })
        .catch(function (error) {
          console.log(error);
        });

    // get current user role
    var roles = localStorage.getItem('userrole');
    this.setState( {isInstructor: roles.includes("instructor")} );
  }

  render () {
    if(this.state.isInstructor === false){
      return (
        <div className='stream-item'>
          <p>Instructor: {this.state.instructor}</p>
          <p>comment: {this.state.comment}</p>
        </div>
      )
    }
    return (
      <div className='stream-item'>
        <FeedbackWrite deliverable={this.state.deliverable} />
        <p>Instructor: {this.state.instructor}</p>
        <p>comment: {this.state.comment}</p>
      </div>
    );
  }
}