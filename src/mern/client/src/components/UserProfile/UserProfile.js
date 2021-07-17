import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';  //this communicates with backend
import { Link } from "react-router-dom";

const UserProfile = (props) => (
    <tr>
        <td>{props.record.user_id}</td>
        <td>{props.record.username}</td>
        <td>{props.record.userbio}</td>
        <td>{props.record.gender}</td>
        <td>{props.record.email}</td>
        <td>{props.record.links}</td>
        <td>{props.record.belongingCompany}</td>
        <td>{props.record.position}</td>
        <td>{props.record.profileImage}</td>
        <td>{props.record.backgroundImage}</td>
        <td>
            <Link to={"/user-profile/edit/" + props.record._id}>Edit</Link>
            <Link to={"/user-profile/view/" + props.record._id}>View Profile</Link>
        </td>
    </tr>
);


export default class UserProfileList extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
        super(props);
        this.state = { uesrProfile: [] };
    }
    
    
    // This method will get the data from the database.
    componentDidMount() {
        axios
        .get("http://localhost:5000/user-profile/")
        .then((response) => {
            this.setState({ uesrProfile: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // This method will map out the users on the table
    userProfileList() {
        return this.state.uesrProfile.map((currentuserprofile) => {
            return (
                <UserProfile 
                    record={currentuserprofile}
                    key={currentuserprofile._id}
                />
            );
        });
    }

    //path: "user-profile/list"
    // This following section will display the table with the records of individuals.
    render() {
        return (
            <div>
                <div> This page's "Edit" is now unavaliable</div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>user_id</th>
                            <th>username</th>
                            <th>userbio</th>
                            <th>gender</th>
                            <th>email</th>
                            <th>links</th>
                            <th>belongingCompany</th>
                            <th>position</th>
                            <th>profileImage</th>
                            <th>backgroundImage</th>
                        </tr>
                    </thead>
                    <tbody>{this.userProfileList()}</tbody>
                </table>
                
                {this.userProfileList().username}
            </div>
        );
  }
    
}

