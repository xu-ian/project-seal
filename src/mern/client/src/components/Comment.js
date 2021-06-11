import React from 'react';
import axios from 'axios';
import './Post.css';

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            content:this.props.content,
            id:this.props.id
        }
        this.deleteComment = this.deleteComment.bind(this);
    }
    
    /**
     * Deletes the currently displayed comment.
     */
    deleteComment(){
        if(window.confirm("This will delete your comment, are you sure?")){
            axios.delete("http://localhost:5000/posts/"+ window.localStorage.getItem('id')+
            "/comments/delete/" + this.state.id, {id:this.state.id});
            window.location.reload();
        }
        else{
            
        }
    }

    /**
     * Returns an html comment.
     * @returns Html representation of a comment.
     */
    render () {
        return (
            <div class="Post">
                <div className="User">
                    {/* Name of user */}
                    <h1 dangerouslySetInnerHTML={{__html:this.state["author"]}}/>
                </div>
                <hr/>
                <div className="Body">
                    {/* Content of comment */}
                    <p>{this.state.content}</p>
                </div>
                {/* Button to delete this comment */}
                <button class="delete" type="button" onClick={this.deleteComment}>Delete</button>
            </div>
        );
    }
}

Comment.defaultProps = {author:"Default_User", value:"Default_Comment_Body"};

export default Comment