import React from 'react';
import axios from 'axios';
import { Typography, Paper, Card } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PostPopup from './PostPopup.js'
import './Post.css';

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            content:this.props.content,
            id:this.props.id,
            edit:false,
            deletable:this.props.aid === window.localStorage.getItem("userId"),
            aid:this.props.aid,
            Open:"hidden",
            username:"N/A",
            email:"N/A",
            links: "N/A",
            belongingCompany: "N/A",
            position: "N/A"
        }
        this.deleteComment = this.deleteComment.bind(this);
        this.edits = this.edits.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.buttons = this.buttons.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/user-profile/?_id:" + this.state.id)
      .then((response) => {
        const userLists = response.data;
        const currentUser = userLists.find(person => person._id === this.state.aid);
        this.setState({
          username: currentUser.username,
          email: currentUser.email,
          links: currentUser.links,
          belongingCompany: currentUser.belongingCompany,
          position: currentUser.position
        });
      })
      .catch(function (error) {});
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

    handleOpen(event){
        this.setState({Open:"visible"});
    }

    handleClose(){
        this.setState({Open:"hidden"});
    }

    buttons(){
        if(this.state.deletable){
            return(<div>
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
            </div>);
        }
        return(<div></div>);
    }

    /**
     * Returns an html comment.
     * @returns Html representation of a comment.
     */
    render () {
        return (
            <Card border={1} style={{border:"1px solid darkgray", 
             "border-radius": "7px"}} class="clickable">
              <PostPopup author={this.state.author} aid={this.state.aid} id={this.state.id}/>
              <div style={{margin: "auto", display: "block", overflow:"hidden", 
               "text-decoration": "none"}}>
                <hr/>
                <div>
                  {/* Content of comment */}
                  {this.edits()}
                </div>
                {/* Button to delete this comment */}
                {this.buttons()}
              </div>
            </Card>
        );
    }
}

Comment.defaultProps = {author:"Default_User", value:"Default_Comment_Body"};

export default Comment