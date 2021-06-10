import React from 'react';
import axios from 'axios';
import './CommentWrite.css';

class CommentWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "Name",
            content: '',
            post_id: this.props.id,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        
        axios.post("http://localhost:5000/posts/"+this.state.post_id.toString()+"/comments/add/", this.state).then(
            res => {
            }
        ).catch(err =>{});
        event.preventDefault();
        window.location.reload();
    }

    render (){
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    <textarea placeholder = "Write a comment" value={this.state.content} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default CommentWrite