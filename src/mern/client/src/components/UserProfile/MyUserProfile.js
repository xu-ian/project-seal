import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';  //this communicates with backend
import { Paper, Avatar, Typography, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export default class MyUserProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            user_id: "",            //user id in the "users" collection (hidden to user)
            username: "",           //precollected
            userbio: "",            
            gender: "",
            email: "",              //precollected
            links: "",              //social media
            belongingCompany: "",   
            position: "",
      
            profileImage: "",          //image to be uploaded: user profile image
            backgroundImage: "",    //image to be uploaded 
        };
    }

  // This will get the record based on the id from the database.
  componentDidMount() {
    axios.get("http://localhost:5000/user-profile/?_id:" + this.props.match.params.id)
      .then((response) => {
        const userLists = response.data;
        const currentUser = userLists.find(person => person._id === this.props.match.params.id);

        this.setState({
          user_id: currentUser.user_id,
          username: currentUser.username,
          userbio: currentUser.userbio,
          gender: currentUser.gender,
          email: currentUser.email,
          links: currentUser.links,
          belongingCompany: currentUser.belongingCompany,
          position: currentUser.position,

          profileImage: currentUser.profileImage,
          backgroundImage: currentUser.backgroundImage,
        });
        // console.log("edit is fetching: " + JSON.stringify(response.data));
        // console.log("edit is fetching: " + response.status);
        // console.log("the id is: " + this.props.match.params.id);
        console.log("the desired is: " + JSON.stringify(currentUser));
        // console.log("company title: ", this.state.company_title);
      })
      .catch(function (error) {
        console.log(error);
      });
  }    


    render(){

        const Item = styled(Paper)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        }));
        return(
            <div className="container">
                <div className="banner-wrapper">
                    <Container  disableGutters maxWidth="md" component="main" sx={{ pt: 8 }}>
                        <Typography
                            variant="h4"
                            align="left"
                            color="text.primary"
                            gutterBottom
                            style={{marginBottom: "5%"}}
                        > Company Profile </Typography>
                        <Typography gutterBottom>
                            <div id="logo-grid" className="grid-wrapper"> 
                                <Avatar sx={{ width: 80, height: 80 }} >L</Avatar>
                                <div>
                                    <div className = "company-title"> {this.state.username} </div>
                                </div>
                            </div>
                        </Typography>
                    </Container>
                </div>
                {/* Profile Content */}
                <div spacing={2} className="profile-wrapper">                         
                    <Item className="block-group" style={{padding: "20px"}}>
                        <Typography className="text-title" variant="h5" > About: </Typography>
                        <Typography className="text-wrapper" variant="h6" style={{marginLeft: "5%"}}> {this.state.userbio} </Typography>
                    </Item>
                    <Item className="block-group" style={{padding: "20px"}}> 
                        <div className="grid-wrapper"> 
                            <Typography style={{margin: "10px"}} gutterBottom>
                                <Typography variant="h6" > Email: </Typography>
                                <Typography variant="subtitle1" style={{marginLeft: "10%"}}> {this.state.email} </Typography>
                                 
                            </Typography>
                            <Typography style={{margin: "10px"}} gutterBottom>
                                <Typography variant="h6"> Links: </Typography>
                                <Typography variant="subtitle1" style={{marginLeft: "10%"}}> {this.state.links} </Typography>
                            </Typography>
                            
                        </div>
                    </Item>
                    <Item className="block-group" style={{padding: "20px"}} > Teams </Item>
                </div>
            </div>
        )
    }
}