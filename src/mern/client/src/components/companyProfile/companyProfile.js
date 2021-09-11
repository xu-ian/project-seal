import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';  //this communicates with backend
import { Link } from "react-router-dom";

const CompanyProfile = (props) => (
    <tr>
        <td>{props.record.company_title}</td>
        <td>{props.record.tagline}</td>
        <td>{props.record.description}</td>
        <td>{props.record.emailAddress}</td>
        <td>{props.record.links}</td>
        <td>{props.record.logo}</td>
        <td>{props.record.members}</td>
        <td>
            <Link to={"/company-profile/edit/" + props.record._id}>Edit</Link>
            <Link to={"/company-profile/view/" + props.record._id}>View Profile</Link>
        </td>
    </tr>
);


export default class CompanyProfileList extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
        super(props);
        this.state = { companyProfile: [] };
    }
    
    
    // This method will get the data from the database.
    componentDidMount() {
        axios
        .get("http://localhost:5000/company-profile/")
        .then((response) => {
            this.setState({ companyProfile: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // This method will map out the users on the table
    companyProfileList() {
        return this.state.companyProfile.map((currentcompanyprofile) => {
            return (
                <CompanyProfile 
                    record={currentcompanyprofile}
                    key={currentcompanyprofile._id}
                />
            );
        });
    }

  // This following section will display the table with the records of individuals.
    render() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>company_title</th>
                            <th>tagline</th>
                            <th>description</th>
                            <th>emailAddress</th>
                            <th>logo</th>
                            <th>links</th>
                            <th>members</th>
                        </tr>
                    </thead>
                    <tbody>{this.companyProfileList()}</tbody>
                </table>
                
                {this.companyProfileList().company_title}
            </div>
        );
  }
    
}

