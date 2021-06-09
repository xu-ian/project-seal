import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

export default class CreateCompanyProfile extends Component{

  //Constructor that stores the data
  constructor(props) {
    super(props);

    this.onChangeCompanyTitle = this.onChangeCompanyTitle.bind(this);
    this.onChangeTagline = this.onChangeTagline.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeLogo = this.onChangeLogo.bind(this);
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
      .post("http://localhost:3000/company-profile/create", newcompany)
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

  }


  //render on the page
  render(){
    return(
      <div> 
        <form id="company-form" onSubmit={this.handleSubmit}>
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
    )
  }
}

