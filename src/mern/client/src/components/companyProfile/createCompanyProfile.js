import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Container ,TextField, Button, Grid, Typography, Avatar, CssBaseline } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import FileBase from 'react-file-base64';
import './company-profile-style.css';


export default class CreateCompanyProfile extends Component{
  //Constructor that stores the data
  constructor(props) {
    super(props);

    this.onChangeCompanyTitle = this.onChangeCompanyTitle.bind(this);
    this.onChangeTagline = this.onChangeTagline.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeLinks = this.onChangeLinks.bind(this);
    this.onDoneLogo = this.onDoneLogo.bind(this);
    this.onChangeMembers = this.onChangeMembers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      company_title: "",
      tagline: "", 
      description: "", 
      emailAddress: "",   
      logo: "",
      links: "",          //to be developed (detacting the link)
      members: "",         //to (search feature needed)
    };
  }

  // These methods will update the state properties.
  onChangeCompanyTitle(e) {
    this.setState({
      company_title: e.target.value,
    });
  }
  onChangeTagline(e) {
    this.setState({
      tagline: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeEmailAddress(e) {
    this.setState({
      emailAddress: e.target.value,
    });
  }
  onDoneLogo(base64) {
    this.setState({
      logo: base64,
    });
  }
  onChangeLinks(e) {
    this.setState({
      links: e.target.value,
    });
  }
  onChangeMembers(e) {
    this.setState({
      members: e.target.value,
    });
  }


  // This function will handle the submission.
  handleSubmit(e){
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newcompany) to the database.
    const newcompany = {
      company_title: this.state.company_title,
      tagline: this.state.tagline, 
      description: this.state.description, 
      emailAddress: this.state.emailAddress,   
      logo: this.state.logo,           //image to be uploaded 
      links: this.state.links,
      members: this.state.members,
    };

    //this sends the data to the database, using post method.
    //subsitution for this could be fetch. 
    axios
      .post("http://localhost:5000/company-profile/create", newcompany)
      .then((res) => console.log(res.data));

    //empty the state after posting the data to the database
    this.setState({
      company_title: '',
      tagline: '', 
      description: '', 
      emailAddress: '',   
      logo: '',
      links: '',          
      members: ''
    });
    window.location.href = "/company-profile/list";
  }

  //render on the page
  render(){
    return(
      <div className="" style={{backgroundColor: "white"} , {marginTop:"30px"}}> 
        <div> 
          <KeyboardBackspaceIcon style={{ fontSize: 50 }} onClick={() =>  window.location.href='/profile/create'}  />
        </div>
        <Container component="main" maxWidth="lg"> 
          <CssBaseline />
          <Container maxWidth="lg">
            <div style={{marginBottom:"10px"}}>
              <BusinessIcon style={{ fontSize: 50 }} color="primary"/>
              <Typography variant="h4">
                Create Company Profile
              </Typography>
            </div>

            <form id="company-form" className="form" style={{marginTop:"20px"}} onSubmit={this.handleSubmit}>
              <TextField required fullWidth 
                label="Company Title" 
                className="company-form-group"
                style={{marginBottom:"20px"}}
                value={this.state.company_title}
                onChange={this.onChangeCompanyTitle}
              >
              </TextField>
              <TextField required fullWidth 
                label="Tagline" 
                placeholder="A brief line that describes the company" 
                className="company-form-group"
                style={{marginBottom:"20px"}}
                value={this.state.tagline}
                onChange={this.onChangeTagline}
              >
              </TextField>
              <TextField required fullWidth 
                label="Description" 
                id="company-form-description" 
                className="company-form-group" 
                variant="outlined" 
                multiline
                InputLabelProps={{shrink: true,}}
                value={this.state.description}
                onChange={this.onChangeDescription}
              >
              </TextField>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}> 
                  <TextField required fullWidth 
                    label="Email Address" 
                    margin= "normal" 
                    className="company-form-group"
                    value={this.state.emailAddress}
                    onChange={this.onChangeEmailAddress}
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}> 
                  <TextField fullWidth 
                    label="External Links" 
                    margin= "normal" 
                    helperText="Company Website or social media" 
                    className="company-form-group"
                    multiline
                    value={this.state.links}
                    onChange={this.onChangeLinks}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <TextField fullWidth 
                label="Members" 
                className="company-form-group"
                multiline
                style={{marginBottom:"20px"}}
                value={this.state.members}
                onChange={this.onChangeMembers}
              >
              </TextField>
              <br /> <br />
              <div className="company-form-group" style={{marginBottom:"20px"}}>
                <body1>Browse File to upload Logo: </body1>
                <FileBase
                  type="file" 
                  className="form-control"
                  multiple={false} 
                  /*{ (e) => setPostData({ ...postData, message: e.target.value })
                  ({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) }*/
                  onDone={this.onDoneLogo} />
              </div>
              <br />
              <Button variant="contained" color="primary" type="submit" align="center" classname="submit">Create Company Profile</Button>
            </form>
          </Container>
        </Container>
      </div>
    )
  }
}

