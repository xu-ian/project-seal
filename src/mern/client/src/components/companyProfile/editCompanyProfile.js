import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";
import { Container ,TextField, Button, Grid, Typography, Avatar, CssBaseline } from '@material-ui/core';
import FileBase from 'react-file-base64';
import BusinessIcon from '@material-ui/icons/Business';

let currentUserID= localStorage.getItem('userId');

/* This class update an existing company profile through id */
class EditCompanyProfile extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeCompanyTitle = this.onChangeCompanyTitle.bind(this);
    this.onChangeTagline = this.onChangeTagline.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onDoneLogo = this.onDoneLogo.bind(this);
    this.onChangeLinks = this.onChangeLinks.bind(this);
    this.onChangeMembers = this.onChangeMembers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      company_id: "",
      company_title: "",
      tagline: "", 
      description: "", 
      emailAddress: "",   
      logo: "",           //image to be uploaded
      links: "",          //to be developed (detacting the link)
      members: "",         //to (search feature needed)
      companyProfile: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios.get("http://localhost:5000/company-profile/?_id:" + this.props.match.params.id)
      .then((response) => {
        const companyLists = response.data;
        const currentCompany = companyLists.find(person => person._id === this.props.match.params.id);

        this.setState({
          company_id: this.props.match.params.id,
          company_title: currentCompany.company_title,
          tagline: currentCompany.tagline,
          description: currentCompany.description,
          emailAddress: currentCompany.emailAddress,
          logo: currentCompany.logo,
          links: currentCompany.links,
          members: currentCompany.members,
        });
        // console.log("edit is fetching: " + JSON.stringify(response.data));
        // console.log("edit is fetching: " + response.status);
        // console.log("the id is: " + this.props.match.params.id);
        console.log("the desired is: " + JSON.stringify(currentCompany));
        // console.log("company title: ", this.state.company_title);
      })
      .catch(function (error) {
        console.log(error);
      });
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
  handleSubmit(e) {
    e.preventDefault();
    const newEditedCompanyProfile = {
      company_id: this.state.company_id,
      company_title: this.state.company_title,
      tagline: this.state.tagline, 
      description: this.state.description, 
      emailAddress: this.state.emailAddress,   
      logo: this.state.logo,           //image to be uploaded 
      links: this.state.links,
      members: this.state.members
    };
    console.log(newEditedCompanyProfile);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/company-profile/update/" + this.props.match.params.id,
        newEditedCompanyProfile
      )
      .then((res) => console.log(res.data))
      .catch(function (error) {
      });

    this.props.history.push("/profile/manage/"+ currentUserID);
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div className="" style={{backgroundColor: "white"} , {marginTop:"30px"}}>    
        <Container component="main" maxWidth="md"> 
          <CssBaseline />
          <div className="">
            <BusinessIcon style={{ fontSize: 50 }} color="primary"/>            
            <Typography component="h1" variant="h5" gutterBottom >
              Update Company Profile
            </Typography>

            <form id="company-form" onSubmit={this.handleSubmit} style={{marginTop:"20px"}}>
              <TextField fullWidth
                label="Company Title" 
                className="company-form-group"
                style={{marginBottom:"20px"}}
                defaultValue = {this.state.company_title}
                value={this.state.company_title}
                onChange={this.onChangeCompanyTitle}
              >
              </TextField>
              <TextField fullWidth 
                label="Tagline" 
                placeholder="A brief line that describes the company" 
                className="company-form-group"
                style={{marginBottom:"20px"}}
                defaultValue = {this.state.tagline}
                value={this.state.tagline}
                onChange={this.onChangeTagline}
              >
              </TextField>
              <TextField fullWidth 
                label="Description" 
                id="company-form-description" 
                className="company-form-group" 
                variant="outlined" 
                multiline
                defaultValue = {this.state.description}
                InputLabelProps={{shrink: true,}}
                value={this.state.description}
                onChange={this.onChangeDescription}
                >
              </TextField>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}> 
                  <TextField fullWidth 
                    label="Email Address" 
                    margin= "normal" 
                    className="company-form-group"
                    defaultValue = {this.state.emailAddress}
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
                    defaultValue = {this.state.links}
                    value={this.state.links}
                    onChange={this.onChangeLinks}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <TextField fullWidth 
                label="Search members" 
                className="company-form-group"
                style={{marginBottom:"20px"}}
                defaultValue = {this.state.memebers}
                value={this.state.members}
                onChange={this.onChangeMembers}
              >
              </TextField>
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
              <Button variant="contained" color="primary" type="submit" align="center" classname="">Update Company Profile</Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(EditCompanyProfile);
