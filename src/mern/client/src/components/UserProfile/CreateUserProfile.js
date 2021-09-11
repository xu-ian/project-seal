import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";
import { Container ,TextField, Button, Grid, Typography, Avatar, CssBaseline, 
  Select, MenuItem, InputLabel } from '@material-ui/core';
import FileBase from 'react-file-base64';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

/* This class update/create an existing user profile through id */
class CreateUserProfile extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeUserbio = this.onChangeUserbio.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeLinks = this.onChangeLinks.bind(this);
    this.onChangeBelongingCompany = this.onChangeBelongingCompany.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);

    this.onDoneProfileImage = this.onDoneProfileImage.bind(this);
    this.onDoneBackgroundImage = this.onDoneBackgroundImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


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


  // These methods will update the state properties.
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeUserbio(e) {
    this.setState({
      userbio: e.target.value,
    });
  }
  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeLinks(e) {
    this.setState({
      links: e.target.value,
    });
  }
  onChangeBelongingCompany(e) {
    this.setState({
      belongingCompany: e.target.value,
    });
  }
  onChangePosition(e) {
    this.setState({
      position: e.target.value,
    });
  }
  onDoneProfileImage(base64) {
    this.setState({
      profileImage: base64,
    });
  }
  onDoneBackgroundImage(base64) {
    this.setState({
      backgroundImage: base64,
    });
  }

  // This function will handle the submission.
  handleSubmit(e){
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newcompany) to the database.
    const newEditedUserProfile = {
        user_id: this.state.user_id,
        username: this.state.username, 
        userbio: this.state.userbio, 
        gender: this.state.gender,  
        email: this.state.email,  
        links: this.state.links,
        belongingCompany: this.state.belongingCompany,  
        position: this.state.position, 
        profileImage: this.state.profileImage,
        backgroundImage: this.state.backgroundImage,
      };

    //this sends the data to the database, using post method.
    //subsitution for this could be fetch. 
    axios
      .post("http://localhost:5000/user-profile/create", newEditedUserProfile)
      .then((res) => console.log(res.data));

    //empty the state after posting the data to the database
    this.setState({
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
    });
    window.location.href = "/user-profile/list";
  }



  // render on the page: "/user-profile/create"
  render() {
    return (
      <div className="" style={{backgroundColor: "white"} , {marginTop:"30px"}}> 
        <div> 
          <KeyboardBackspaceIcon style={{ fontSize: 50 }} onClick={() =>  window.location.href='/profile/create'}  />
        </div>
        <Container component="main" maxWidth="lg"> 
          <CssBaseline />
          <Container maxWidth="lg">
            <div style={{marginBottom:"10px"}}>
              <AccountBoxIcon style={{ fontSize: 50 }} color="primary"/>
              <Typography variant="h4">
                My User Profile
              </Typography>
            </div>
            <form id="user-form" onSubmit={this.handleSubmit} style={{marginTop:"20px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}> 
                    <InputLabel required shrink> User Name </InputLabel>
                    <TextField fullWidth
                    className="user-form-group"
                    style={{marginBottom:"20px"}}
                    required
                    defaultValue = {this.state.username}
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    > </TextField>
                </Grid>
                <Grid item xs={12} sm={3}> 
                  <InputLabel required shrink> Gender </InputLabel>
                  <Select fullWidth 
                    label="Gender, will be a drag down" 
                    className="company-form-group"
                    required
                    value={this.state.gender}
                    onChange={this.onChangeGender}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                    <MenuItem value='None'>Prefer not to Answer</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <TextField fullWidth 
                label="About me" 
                id="company-form-description" 
                className="company-form-group" 
                variant="outlined" 
                multiline required
                defaultValue = {this.state.userbio}
                InputLabelProps={{shrink: true,}}
                value={this.state.userbio}
                onChange={this.onChangeUserbio}
                >
              </TextField>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}> 
                  <TextField fullWidth 
                    label="Email Address" 
                    margin= "normal" 
                    className="company-form-group"
                    defaultValue = {this.state.email}
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}> 
                  <TextField fullWidth 
                    label="External Links" 
                    margin= "normal" 
                    helperText="External Links or Social Media Accounts" 
                    multiline
                    className="company-form-group"
                    defaultValue = {this.state.links}
                    value={this.state.links}
                    onChange={this.onChangeLinks}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}> 
                  <TextField fullWidth 
                    label="Belonging Company" 
                    margin= "normal" 
                    className="company-form-group"
                    defaultValue = {this.state.belongingCompany}
                    // disabled
                    value={this.state.belongingCompany}
                    onChange={this.onChangeBelongingCompany}
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={9}> 
                  <TextField fullWidth 
                    label="Postition Title" 
                    margin= "normal" 
                    className="company-form-group"
                    defaultValue = {this.state.position}
                    value={this.state.position}
                    onChange={this.onChangePosition}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <div className="company-form-group" style={{marginBottom:"20px"}}>
                <body1>Browse File to upload Profile Image: </body1>
                <FileBase
                  type="file" 
                  className="form-control"
                  multiple={false} 
                  /*{ (e) => setPostData({ ...postData, message: e.target.value })
                  ({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) }*/
                  onDone={this.onDoneProfileImage} />
              </div>
              <div className="company-form-group" style={{marginBottom:"20px"}}>
                <body1>Browse File to upload Background Image: </body1>
                <FileBase
                  type="file" 
                  className="form-control"
                  multiple={false} 
                  /*{ (e) => setPostData({ ...postData, message: e.target.value })
                  ({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) }*/
                  onDone={this.onDoneBackgroundImage} />
              </div>
              <Button style={{marginTop: "20px", marginLeft: "40%"}} variant="contained" color="primary" type="submit">
                Create My User Profile
              </Button>
            </form>
          </Container>
        </Container>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(CreateUserProfile);
