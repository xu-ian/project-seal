import React from 'react';
import axios from 'axios';
import './PostWrite.css';

class CommentWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "Name",
            content: 'Content'
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        axios.post("http://localhost:5000/add/", this.state).then(
            res => {
                console.log(res);
            }
        );
        Notification.requestPermission();
        new Notification(this.state.author + " " + this.state.content);
        event.preventDefault();
    }

    render (){
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    <textarea placeholder = "Make a post" value={this.state.content} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default CommentWrite