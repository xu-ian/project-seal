import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";
import { Container ,TextField, Button, Grid, Typography, Avatar, CssBaseline, Icon } from '@material-ui/core';
import FileBase from 'react-file-base64';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BusinessIcon from '@material-ui/icons/Business';

/* This class update/create an existing user profile through id */
class EditUserProfile extends Component {
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
  handleSubmit(e) {
    e.preventDefault();
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
    console.log(newEditedUserProfile);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/user-profile/update/" + this.props.match.params.id,
        newEditedUserProfile
      )
      .then((res) => console.log(res.data))
      .catch(function (error) {
      });

    this.props.history.push("/list");
  }



  //render on the page: "/company-profile/edit:"
  render() {
    return (
      <div className="" style={{backgroundColor: "white"} , {marginTop:"30px"}}> 
        <Container component="main" maxWidth="lg"> 
          <CssBaseline />
          <div href="/profile/create" style={{border: "1px solid #0B345C"}} > 
            <ArrowBackIcon fontSize="large" />
          </div>
          <Container maxWidth="lg">
            <Avatar style={{marginBottom:"10px"}}>
              <BusinessIcon />
            </Avatar>
            <Typography component="h1" variant="h5" gutterBottom>
              My User Profile
            </Typography>

            <form id="user-form" onSubmit={this.handleSubmit} style={{marginTop:"20px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}> 
                    <TextField fullWidth
                    label="User Name" 
                    className="user-form-group"
                    style={{marginBottom:"20px"}}
                    defaultValue = {this.state.username}
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    > </TextField>
                </Grid>
                <Grid item xs={12} sm={3}> 
                  <TextField fullWidth 
                    label="Gender, will be a drag down" 
                    className="company-form-group"
                    defaultValue = {this.state.gender}
                    value={this.state.gender}
                    onChange={this.onChangeGender}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <TextField fullWidth 
                label="About me" 
                id="company-form-description" 
                className="company-form-group" 
                variant="outlined" 
                multiline
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
                    // disabled
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}> 
                  <TextField fullWidth 
                    label="External Links" 
                    margin= "normal" 
                    helperText="Company Website or social media" 
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
              <Button variant="contained" color="primary" type="submit" align="center" classname="">Update Company Profile</Button>
            </form>
          </Container>
        </Container>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(EditUserProfile);
