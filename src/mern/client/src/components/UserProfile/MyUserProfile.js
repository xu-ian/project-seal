import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';  //this communicates with backend
import { Paper, Avatar, Typography, Container, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LocationOnIcon from '@material-ui/icons/LocationOn';


let currentUserID= localStorage.getItem('userId');

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

  handleAddFriend(){
        if(this.props.match.params.id===currentUserID){

        }else{
            


        }
  }


    render(){

        const Item = styled(Paper)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
            padding: "20px",
            marginBottom: "15px"
        }));
        const imageContainer = {
            // position: 'relative',
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/2/21/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: "400px",
        }

        return(
            <div className="container">
                <div className="banner-wrapper">
                    <div style={imageContainer} > </div>
                </div>
                {/* Profile Content */}
                <Container  maxWidth="md" spacing={2}>
                    <Item className="block-group">
                        <Typography gutterBottom>
                            <div id="logo-grid" className="grid-wrapper"> 
                                <div>
                                    <Grid container spacing={2} xs={12}> 
                                        <Grid item xs={3}> 
                                            <Avatar sx={{ width: 140, height: 140 }} > M </Avatar>
                                        </Grid>
                                        <Grid item xs={9} style={{marginTop: "30px"}}> 
                                            <Typography className = "company-title" variant="h2"> {this.state.username} </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} style={{marginTop: "30px"}}> 
                                        <Grid item xs={3}>
                                            <MailOutlineIcon style={{ fontSize: 60 }} onClick={() => {window.location.href='/friendlist/home'}} />
                                            <PersonAddIcon style={{ fontSize: 60 }}  />
                                        </Grid>
                                        <Grid item xs={9}>
                                            <div></div>
                                            <Typography variant="h5"> 
                                                <LocationOnIcon/> 
                                                Working at: {this.state.belongingCompany} 
                                            </Typography>
                                            <Typography variant="h6" style={{marginLeft: "50px"}}>
                                                As: {this.state.position}     
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Typography>
                        <Typography className="text-wrapper" variant="h6" style={{marginLeft: "2%"}}> {this.state.userbio} </Typography>
                    </Item>
                    <Item className="block-group" > 
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
                    <Item className="block-group" style={{padding: "20px"}} >  </Item>
                </Container>

            </div>
        )
    }
}