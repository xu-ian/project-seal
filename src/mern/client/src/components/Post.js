import React from 'react';
import './Post.css';
import {Typography, Paper} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            aid:this.props.aid,
            content:this.props.content,
            tags:[],
            comment:[this.props.comment],
            id:this.props.id,
            edit:false,
            deletable:this.props.deletable,
            Open:"hidden",
            username:"N/A",
            email:"N/A",
            links: "N/A",
            belongingCompany: "N/A",
            position: "N/A"
        }
        this.renderPopup = this.renderPopup.bind(this);
        this.renderTags = this.renderTags.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.deletable = this.deletable.bind(this);
        this.edits = this.edits.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        if(this.props.tags){
            this.state.tags=this.props.tags.toString().split(",");
        }
        
    }

    componentDidMount(){
        axios.get("http://localhost:5000/user-profile/?_id:" + this.state.id)
      .then((response) => {
        const userLists = response.data;
        const currentUser = userLists.find(person => person._id === this.state.aid);
        new Notification(currentUser.username + " " + currentUser.userbio + " "
        + currentUser.email + " " + currentUser.links + " " + currentUser.belongingCompany
        + currentUser.position);
        this.setState({
          username: currentUser.username,
          email: currentUser.email,
          links: currentUser.links,
          belongingCompany: currentUser.belongingCompany,
          position: currentUser.position
        });
        // console.log("edit is fetching: " + JSON.stringify(response.data));
        // console.log("edit is fetching: " + response.status);
        // console.log("the id is: " + this.props.match.params.id);
        console.log("the desired is: " + JSON.stringify(currentUser));
        // console.log("company title: ", this.state.company_title);
      })
      .catch(function (error) {
        new Notification(error);
        console.log(error);
      });
    }

    renderPopup(){
        return(<div>
            <Typography>Username: {this.state.username}</Typography>
            <Typography>Company: {this.state.belongingCompany}</Typography>
            <Typography>Position: {this.state.position}</Typography>
            <Typography>Email: {this.state.email}</Typography>
            <Typography>Other Links: {this.state.links}</Typography>
            <Typography>Contact Code: {this.state.aid}</Typography>
        </div>);
    }

    /**
     * Returns the html code for the tags of a post.
     * @returns {HTML Code} The html code representing each tag the post has.
     */
    renderTags(){
        const tagsList = [];
        for(let i = 0; i< this.state.tags.length; i++){
            tagsList.push(<div className="Tags" dangerouslySetInnerHTML={{__html:this.state.tags[i]}}/>);
        }
        return tagsList;
    }

    deletePost(){
        if(window.confirm("This will delete your post and all comments, are you sure?")){
            axios.delete("http://localhost:5000/posts/delete/" + this.state.id, {id:this.state.id});
            window.location.assign("/posts/1");
        }
        else{

        }
    }
    
    deletable(){
        let buttons = []
        if(this.state.deletable){
            buttons.push(<button class="delete" type="button" 
                         onClick={this.deletePost}><DeleteIcon/></button>);
            buttons.push(<button class="modify" type="button" onClick={() =>{
                if(this.state.edit){
                    this.setState({edit:false});
                    axios.patch("http://localhost:5000/posts/update/"+this.state.id, this.state);
                }
                else{
                    this.setState({edit:true});
                }
            }}><EditIcon/></button>)
            return buttons;
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
            return(<p readonly="true" style={{margin:"10px"}}>{this.state.content}</p>);
        }
    }

    handleOpen(event){
        this.setState({Open:"visible"});
    }

    handleClose(){
        this.setState({Open:"hidden"});
    }

    /* Displays the page */
    render () {
        return (
            <div class="Encapsulator">
                    <Paper style={{visibility:this.state.Open, position:"absolute",
                                "z-index":"10", overflow:"visible", left:"80%"}}>
                        {this.renderPopup()}
                    </Paper>
            <div class="Post clickable">
            <a style={{color:"black", "text-decoration":"none"}}href={"/user-profile/view/"+this.state.aid}>
                <div class="User">
                    {/* Author of post */}
                    <Typography aria-owns={"popover"}
                     variant="h3" aria-haspopup="true"
                     style={{"font-size":"200%", margin:"10px"}}
                     onMouseEnter={this.handleOpen}
                     onMouseLeave={this.handleClose}>
                        {this.state.author}
                    </Typography>
                </div>
                </a>
                <hr/>
                <div className="Body">
                    {/* Body of post */}
                    {this.edits()}
                </div>
                <hr/>
                <div>
                    {/* Tags of post */}
                    {this.renderTags()}
                    {this.deletable()}
                </div>
            </div>
            </div>
        );
    }
}


Post.defaultProps = {author: 'Default_User', content: 'Default_Body', tags: [], comment:[]};
