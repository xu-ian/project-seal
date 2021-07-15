import React, {Component, PropTypes } from "react";
import axios from 'axios';
import { Paper, Avatar, Typography, Container, Grid, AccordionSummary, Accordion, AccordionDetails, TableCell, Button  } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



/* This page renders Lists of Friend & FriendRequestsRecieved
 * Friend: allows URL to viewing of individual friend profiles
 * FriendRequestsRecieved: allows URL to viewing of individual friend profiles
*/ 


let currentUserID= localStorage.getItem('userId');
function createData(avatar, name, _id) { return { avatar, name, _id }; }


export default class FriendRequest extends Component{
    loadIn = true;

    constructor(props) {
        super(props);

        this.state = { 
            friends: [],
            friendrequestsent: [], 
            friendrequestrecieved: [],
            rawFriends: [],
            rawFriendrequestsent: [], 
            rawFriendrequestrecieved: [],
        };
    }


    //this gets information () from desired user through _id and store in [] through create()
    getFriendInfo(friend_id, storingList){
        // console.log("id is: " + friend_id + "; with storingList: " + storingList);
        axios.get("http://localhost:5000/user-profile/?_id:" + this.props.match.params.id)
          .then((response) => {
            const userLists = response.data;
            const currentUser = userLists.find(person => person._id === friend_id);

            //inserting it into the friends lists. 
            var insertData = createData( currentUser.profileImage, currentUser.username, currentUser._id );
            // console.log("data is: " + JSON.stringify(insertData));

            if(storingList==="friends"){ this.state.friends.push(insertData); }
            else if(storingList==="friendrequestsent"){ this.state.friendrequestsent.push(insertData); }
            else if(storingList==="friendrequestrecieved"){ this.state.friendrequestrecieved.push(insertData); }
            else console.log("error in storing in friend[]");
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    // This will get friends, friendrequestsent and friendrequestrecieved based on the current user id from the database.
    getFriendStatus(){
        axios.get("http://localhost:5000/friends/view/" + this.props.match.params.id)
        .then((response) => {
          this.setState({
            rawFriends: response.data.friends,
            rawFriendrequestsent: response.data.friendrequestsent,
            rawFriendrequestrecieved: response.data.friendrequestrecieved,
          });

          //Storing raw[] into this.state through calling getFriendInfo()
          for(let key in this.state.rawFriends){ this.getFriendInfo(this.state.rawFriends[key], "friends"); }
          for(let key in this.state.rawFriendrequestsent){ this.getFriendInfo(this.state.rawFriendrequestsent[key], "friendrequestsent"); }
          for(let key in this.state.rawFriendrequestrecieved){ this.getFriendInfo(this.state.rawFriendrequestrecieved[key], "friendrequestrecieved"); }
        })
        .catch(function (error) { console.log(error); });

        console.log(this.state.friendrequestsent);
    }

    //Initialization
    componentDidMount(){
        this.getFriendStatus();
    }




    render(){
        if(this.loadIn) {
            this.getFriendStatus();
            this.loadIn = false;
        }
        return(
            <div>
                <Container  maxWidth="lg" style={{marginTop:"50px"}}>

                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h5">Friends</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3}> 
                                {
                                    this.state.friends.length!==0                                
                                    ? this.state.friends.map((friend) => (
                                        <Grid item xs={12} onClick={() => {window.location.href='/user-profile/view/' + friend._id} }>
                                            <Grid container > 
                                                <Grid item xs={1}> <Avatar sx={{ width: 60, height: 60 }}> {friend.name} </Avatar></Grid>
                                                <Grid item xs={9}> <Typography variant="h5" > {friend.name}  </Typography> </Grid>
                                            </Grid>
                                        </Grid>
                                    ))
                                    : <Grid item xs={12}> <Typography variant="body1"> No result can be found  </Typography> </Grid>
                                }
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h5">Friend Requests</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3}> 
                                {
                                    this.state.friendrequestrecieved.length!==0                                
                                    ? this.state.friendrequestrecieved.map((recieved) => (
                                        <Grid item xs={12} >
                                            <Grid container onClick={() => {window.location.href='/user-profile/view/' + recieved._id} }> 
                                                <Grid item style={{marginRight: "2rem"}} > <Avatar > {recieved.name} </Avatar></Grid>
                                                <Grid item  > <Typography variant="h5" > {recieved.name}  </Typography> </Grid>
                                                <Grid item > </Grid> 
                                            </Grid>
                                        </Grid>
                                    ))
                                    : <Grid item xs={12}> <Typography variant="body1"> No result can be found  </Typography> </Grid>
                                }
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                </Container>
            </div>
        )
    }

}
