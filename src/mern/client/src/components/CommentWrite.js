import React from 'react';
import axios from 'axios';
import './CommentWrite.css';

class CommentWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: window.localStorage.getItem("username"),
            content: '',
            post_id: this.props.id,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * This function sets the contents of the textarea to be what the user has written.
     * @param {*} event The input including the body of the comment.
     */
    handleChange(event) {
        this.setState({content: event.target.value});
    }

    /**
     * This function sends a request to the server to add this comment to the database.
     * @param {*} event Used to prevent the default actions from being performed.
     */
    handleSubmit(event) {
        axios.post("http://localhost:5000/posts/"+this.state.post_id.toString()+"/comments/add/",
                   this.state).then(
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
                    {/* The textarea to type in your comment. */}
                    <textarea placeholder = "Make a comment" value={this.state.content} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Create Comment" />
            </form>
        );
    }
}

export default CommentWrite