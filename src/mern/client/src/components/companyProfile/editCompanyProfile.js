import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";
import { Container ,TextField, Button, Grid, makeStyles, Typography, Avatar, CssBaseline } from '@material-ui/core';
import FileBase from 'react-file-base64';
import BusinessIcon from '@material-ui/icons/Business';
import './company-profile-style.css'


const useStyles = makeStyles((theme) => ({
    root:{
    marginTop: '100px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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
    axios
      .get("http://localhost:3000/company-profile/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          company_title: response.data.company_title,
          tagline: response.data.tagline,
          description: response.data.description,
          emailAddress: response.data.emailAddress,
          logo: response.data.logo,
          links: response.data.links,
          members: response.data.members,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("the title is" + this.state.company_title)
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
        "http://localhost:3000/update/:id" + this.props.match.params.id,
        newEditedCompanyProfile
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/company-profile/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div className={useStyles.root} style={{backgroundColor: "white"}}>    
        <Container component="main" maxWidth="md"> 
          <CssBaseline />
          <div className={useStyles.paper}>
            <Avatar className={useStyles.avatar}>
              <BusinessIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Company Profile
            </Typography>

            <form id="company-form" onSubmit={this.handleSubmit}>
              <TextField fullWidth 
                label="Company Title" 
                className="company-form-group"
                value={this.state.company_title}
                onChange={this.onChangeCompanyTitle}
              >
              </TextField>
              <TextField fullWidth 
                label="Tagline" 
                placeholder="A brief line that describes the company" 
                className="company-form-group"
                value={this.state.tagline}
                onChange={this.onChangeTagline}
              >
              </TextField>
              <br /> <br /> <br /> 
              <TextField fullWidth 
                label="Description" 
                id="company-form-description" 
                className="company-form-group" 
                variant="outlined" 
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
                    value={this.state.links}
                    onChange={this.onChangeLinks}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <TextField fullWidth 
                label="Search members" 
                className="company-form-group"
                value={this.state.members}
                onChange={this.onChangeMembers}
              >
              </TextField>
              <br /> <br />
              <div className="company-form-group">
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
              <Button variant="contained" color="primary" type="submit" align="center" classname={useStyles.submit}>Update Company Profile</Button>
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
