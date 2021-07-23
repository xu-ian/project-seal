import React from "react";
import "./Sidebar.css";
import { connect } from 'react-redux';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let userprofile;
        let searchbar;
        let username;
        let viewuserprofile;
        let currentUserID= localStorage.getItem('userId');
        if (this.props.auth.isAuthenticated){
            userprofile = <a href="/user-profile/list">User Profiles</a>;
            searchbar = <a href="/profile/search">Search</a>;
            viewuserprofile = <a href={"/user-profile/view/" + currentUserID}> My User Profile </a>; 
        }
        return (
            <div class="sidebar">
                <h1 class="title">AIC</h1>
                <a href="/">Home</a>
                <a href="/posts/1">Posts</a>
                <a href="/company-profile/list">Companies</a>
                <a href="/player">(Debug)VideoPlayer</a>
                <a href="/friendlist/home">Contacts</a>
                <a href={"/friend/view/" + currentUserID}>Friend Requests</a>
                <a href="/submit/60e88331e694340a1cd36d7a">Submit</a>
                <a href="/courses">Courses</a>
                {searchbar}
                {userprofile}
                <a href="/offers/1">Offers & discount</a>
                {viewuserprofile}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});
  
export default connect(mapStateToProps)(Sidebar);