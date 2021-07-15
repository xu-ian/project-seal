import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';  //this communicates with backend
import { Paper, Avatar, Typography, Container, Grid, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

/* This page render:
 * - User Profle representation for both (1) viewing specific user and (2) own user profile
 * - Handles (1) send friend request (2) accept friend request  (3) reject friend request (4) unfriend
 * 
*/ 


let currentUserID= localStorage.getItem('userId');
let sameUser = false;
export default class MyUserProfile extends Component{
    
    //re-render once
    loadIn = true;

    constructor(props){
        super(props);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleDeleteFriend = this.handleDeleteFriend.bind(this);
        this.handleAcceptRequest = this.handleAcceptRequest.bind(this);
        this.handleRejectRequest = this.handleRejectRequest.bind(this);
        this.handlefriendStatusIcon = this.handlefriendStatusIcon.bind(this);


        this.state = {
            user_id: currentUserID,            //user id in the "users" collection (hidden to user)
            username: "",           //precollected
            userbio: "",            
            gender: "",
            email: "",              //precollected
            links: "",              //social media
            belongingCompany: "",   
            position: "",
      
            profileImage: "",          //image to be uploaded: user profile image
            backgroundImage: "",    //image to be uploaded 
            friends: [],
            friendrequestsent: [],
            friendrequestrecieved: [],

            // 0 is not friend; 1 is friend; 2 is sent; 3 is recieved
            friendStatus: 0,
        };
    }
  
    // This will get the record based on the current login user id from the database.
    getUserProfile(){
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
        .catch(function (error) {console.log(error);});
    }

    //This function get the friending status of the current login user relative to the current viewing user id 
    getFriendingStatus(){  
        axios.get("http://localhost:5000/friends/view/" + currentUserID)
        .then((response) => {
            this.setState({
                friends: response.data.friends,
                friendrequestsent: response.data.friendrequestsent,
                friendrequestrecieved: response.data.friendrequestrecieved,
            });
    
    
            //friend status
            for(let key in this.state.friends){ 
                if(this.state.friends[key] === this.props.match.params.id){ this.setState({friendStatus: 1 })}
            }
            for(let key in this.state.friendrequestsent){ 
                if(this.state.friendrequestsent[key] === this.props.match.params.id) { this.setState({friendStatus: 2 }) }
            }
            for(let key in this.state.friendrequestrecieved){ 
                if(this.state.friendrequestrecieved[key] === this.props.match.params.id) { this.setState({friendStatus: 3 }) }
            }
        })
        .catch(function (error) { console.log(error); });
    
    }
    
    //Initialization
    componentDidMount() {
        if(this.props.match.params.id===currentUserID){sameUser= true};
        this.getUserProfile();
        this.getFriendingStatus();

    }


    //this handles the rendering for friend status icon
    handlefriendStatusIcon(){
        // 0 is not friend; 1 is friend; 2 is sent; 3 is recieved
        if(this.state.friendStatus===0){ 
            return <PersonAddIcon style={{ fontSize: 60 }} onClick={this.handleAddFriend}  /> 
        }
        else if(this.state.friendStatus===1){ 
            return(
                <div> 
                    <PersonIcon style={{ fontSize: 60 }} onClick={this.handleDeleteFriend}  /> 
                    <Typography> Unfriend </Typography>
                </div>
            )
        }
        else if(this.state.friendStatus===2){
            return <TransferWithinAStationIcon style={{ fontSize: 60 }}  onClick={() => {window.location.href='/friend/view/' + currentUserID} } /> 
        }
        else if(this.state.friendStatus===3){
            return(
                <div> 
                    <Grid> <EmojiPeopleIcon style={{ fontSize: 60 }}  onClick={() => {window.location.href='/friend/view/' + currentUserID} } />  </Grid>  
                    <Grid container space={2}> 
                        <Button variant="contained" color="primary" style={{marginRight: "5px"}} onClick={this.handleAcceptRequest}> Accept </Button>  
                        <Button variant="contained" color="secondary" onClick={this.handleRejectRequest} > Cancel </Button>  
                    </Grid>
                </div>

            ) 
        }
    }



    //This function deals with added friend
    handleAddFriend(){
        //handle send friend request
        const sendFriendRequest = { user_id: currentUserID,};
        console.log("the current user id is: "+sendFriendRequest);

        // This will send a post request to update the data in the database.
        axios
        .post(
            "http://localhost:5000/friends/add/" + this.props.match.params.id,
            sendFriendRequest
        )
        .then((res) => console.log(res.data))
        .catch(function (error) {
        });
        
        console.log("sending request to id: " + this.props.match.params.id);

        this.setState({friendStatus: 2 })
        // alert("Friend request sent!");
        // this.handlefriendStatusIcon();
        // this.render();
        // window.location.reload();
        
    }

    //This function deals with delete friendship
    handleDeleteFriend(){
        //handle delete friend
        const deleteFriendRequest = { user_id: currentUserID,};
        console.log("the current user id is: "+ deleteFriendRequest);

        // This will send a post request to update the data in the database.
        axios
        .post(
            "http://localhost:5000/friends/remove/" + this.props.match.params.id,
            deleteFriendRequest
        )
        .then((res) => console.log(res.data))
        .catch(function (error) {
        });
        
        console.log("unfriending id: " + this.props.match.params.id);
        this.setState({friendStatus: 0 })
        // alert("unfriended");
        // this.render();
        // window.location.reload();
    }

    //This function handles Accept Friend Request 
    handleAcceptRequest(){
        //handle cancel friend request
        const acceptRequest = { user_id: currentUserID,};
        console.log("the current user id is: "+ acceptRequest);

        // This will send a post request to update the data in the database.
        axios
        .post(
            "http://localhost:5000/friends/accept/" + this.props.match.params.id,
            acceptRequest
        )
        .then((res) => console.log(res.data))
        .catch(function (error) {console.log(error);});
        
        console.log("accept request id: " + this.props.match.params.id);
        // alert("accepted friend requst!");
        this.setState({friendStatus: 1 })

        // this.render();
        // window.location.reload();
    }

    //This function handles Reject Friend Request 
    handleRejectRequest(){
        //handle cancel friend request
        const rejectRequest = { user_id: currentUserID,};
        console.log("the current user id is: "+ rejectRequest);

        // This will send a post request to update the data in the database.
        axios
        .post(
            "http://localhost:5000/friends/reject/" + this.props.match.params.id,
            rejectRequest
        )
        .then((res) => console.log(res.data))
        .catch(function (error) {console.log(error);});
        
        console.log("reject request id: " + this.props.match.params.id);
        // alert("rejected friend requst!");
        this.setState({friendStatus: 0 })

        // this.render();
        // window.location.reload();
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

        //re-render once
        if(this.loadIn) {
            this.componentDidMount();
            this.loadIn = false;
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
                                        <Grid item xs={3}> <Avatar sx={{ width: "10rem", height: "10rem" }} > {this.state.username} </Avatar> </Grid>
                                        <Grid item xs={9} style={{marginTop: "30px"}}> <Typography style={{fontSize: "2rem"}}> {this.state.username} </Typography></Grid>
                                    </Grid>
                                    <Grid container xs={12} style={{marginTop: "30px"}}> 
                                        <Grid item xs={3}>
                                            {
                                                !sameUser
                                                ? <div> <MailOutlineIcon style={{ fontSize: 60 }} onClick={() => {window.location.href='/friendlist/home'}} />
                                                        { this.handlefriendStatusIcon() }
                                                    </div>
                                                : <div>
                                                    <EditIcon style={{ fontSize: 50 }} lable="Edit"
                                                        onClick={ () => {window.location.href= "/user-profile/edit/" + currentUserID} }  />
                                                    </div>
                                            }
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