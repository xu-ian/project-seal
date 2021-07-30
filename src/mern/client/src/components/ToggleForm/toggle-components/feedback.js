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
      loaded: false
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

    // get current user role...

  }

  render () {
    // if(this.state.loaded === false){
    //   return <p>Loading...</p>
    // }
    return (
      // <h1>something..</h1>
      <div className='stream-item'>
        <FeedbackWrite deliverable={this.state.deliverable} />
        <p>Instructor: {this.state.instructor}</p>
        <p>comment: {this.state.comment}</p>
      </div>
    );
  }
}