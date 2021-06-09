import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";

/* This class update an existing company profile through id */
class EditCompanyProfile extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeCompanyTitle = this.onChangeCompanyTitle.bind(this);
    this.onChangeTagline = this.onChangeTagline.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeLogo = this.onChangeLogo.bind(this);
    this.onChangeLinks = this.onChangeLinks.bind(this);
    this.onChangeMembers = this.onChangeMembers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      company_title: '',
      tagline: '', 
      description: '', 
      emailAddress: '',   
      logo: '',           //image to be uploaded
      links: '',          //to be developed (detacting the link)
      members: '',         //to (search feature needed)
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
  onChangeLogo(e) {
    this.setState({
      logo: e.target.value,
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
  onSubmit(e) {
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
        "http://localhost:3000/update/" + this.props.match.params.id,
        newEditedCompanyProfile
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
        <div>
            <h3 align="center">Update Company Profile</h3>
            <form id="company-form" onSubmit={this.onSubmit}>
              <div className="company-form-group">
                  <label>Company Title: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.company_title}
                  onChange={this.onChangeCompanyTitle}
                  />
              </div>
              <div className="company-form-group">
                  <label>Tagline: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.tagline}
                  onChange={this.onChangeTagline}
                  />
              </div>
              <div className="company-form-group">
                  <label>Description: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
              </div>
              <div className="company-form-group">
                  <label>Email Address: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.emailAddress}
                  onChange={this.onChangeEmailAddress}
                  />
              </div>
              <div className="company-form-group">
                  <label>Logo: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.logo}
                  onChange={this.onChangeLogo}
                  />
              </div>
              <div className="company-form-group">
                  <label>Links: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.links}
                  onChange={this.onChangeLinks}
                  />
              </div>
              <div className="company-form-group">
                  <label>Members: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.members}
                  onChange={this.onChangeMembers}
                  />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
              {/* btn <- css */}
            </form>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(EditCompanyProfile);
