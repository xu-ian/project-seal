import React from 'react';
import axios from 'axios';
import { Typography, Paper } from '@material-ui/core';

export default class PostPopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.id,
            aid:this.props.aid,
            author:this.props.author,
            username:"N/A",
            email:"N/A",
            link:"N/A",
            belongingCompany:"N/A",
            position: "N/A",
            Open:false,
            Open2:false,
        }

        this.handleEnter = this.handleEnter.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleEnter2 = this.handleEnter2.bind(this);
        this.handleExit2 = this.handleExit2.bind(this);
        this.checkVisibility = this.checkVisibility.bind(this);
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

    handleEnter(){
        this.setState({Open:true});
    }

    handleExit(){
        this.setState({Open:false});
    }

    handleEnter2(){
        this.setState({Open2:true});
    }

    handleExit2(){
        this.setState({Open2:false});
    }

    checkVisibility(){
        if(this.state.Open || this.state.Open2){
            return "visible";
        }
        return "hidden";
    }

    render(){
        return(
            <div>
            <Paper style={{visibility:this.checkVisibility(), position:"absolute",
                "z-index":"10", overflow:"visible", left:"80%"}} onMouseEnter={this.handleEnter2}
                onMouseLeave={this.handleExit2}>
                <Typography>Username: {this.state.username}</Typography>
                <Typography>Company: {this.state.belongingCompany}</Typography>
                <Typography>Position: {this.state.position}</Typography>
                <Typography>Email: {this.state.email}</Typography>
                <Typography>Other Links: {this.state.links}</Typography>
                <Typography>Contact Code: {this.state.aid}</Typography>
            </Paper>
        <a style={{color:"black", "text-decoration":"none"}}href={"/user-profile/view/"+this.state.aid}>
            <div class="User">
            {/* Author of post */}
            <Typography aria-owns={"popover"}
             variant="h3" aria-haspopup="true"
             style={{"font-size":"200%", margin:"10px"}}
             onMouseEnter={this.handleEnter}
             onMouseLeave={this.handleExit}>
                {this.state.author}
            </Typography>
            </div>
        </a>
        </div>);
    }
}