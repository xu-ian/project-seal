import React from 'react';
import axios from 'axios';
import {Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './Post.css';

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            content:this.props.content,
            id:this.props.id,
            edit:false
        }
        this.deleteComment = this.deleteComment.bind(this);
        this.edits = this.edits.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    edits(){
        if(this.state.edit){
            return(
                <textarea placeholder = "Edit this Post" value={this.state.content}
                  onChange={this.handleChange} />
            );
        }
        else{
            return(<p class="body" readonly="true" style={{margin:"10px"}}>{this.state.content}</p>);
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
                    <Typography variant="h3" style={{"font-size":"200%", margin:"10px"}}>
                        {this.state.author}
                    </Typography>
                </div>
                <hr/>
                <div>
                    {/* Content of comment */}
                    {this.edits()}
                </div>
                {/* Button to delete this comment */}
                <button class="delete" type="button" onClick={this.deleteComment}><DeleteIcon/></button>
                <button class="modify" type="button" onClick={() =>{
                if(this.state.edit){
                    this.setState({edit:false});
                    axios.patch("http://localhost:5000/posts/"+window.localStorage.getItem('id')+
                    "/comments/update/"+ this.state.id, this.state);
                }
                else{
                    this.setState({edit:true});
                }
            }}><EditIcon/></button>
            </div>
        );
    }
}

Comment.defaultProps = {author:"Default_User", value:"Default_Comment_Body"};

export default Comment