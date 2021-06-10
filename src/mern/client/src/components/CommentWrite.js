import React from 'react';
import axios from 'axios';
import './PostWrite.css';

class CommentWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "Name",
            content: 'Content',
            post_id: this.props.id,
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        Notification.requestPermission();
        axios.post("http://localhost:5000/posts/"+this.state.post_id.toString()+"/comments/add/", this.state).then(
            res => {
                new Notification(res);
            }
        ).catch(err =>{new Notification(err)});
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