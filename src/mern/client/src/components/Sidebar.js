import React from "react";
import "./Sidebar.css";

class Sidebar extends React.Component {
    render(){
        return (
            <div class="sidebar">
                <h1 class="title">AIC</h1>
                <a href="/">Home</a>
                <a href="/posts/1">Posts</a>
                <a href="/company-profile/list">Companies</a>
                <a href="/profile/search">People Search</a>
                <a href="/player">(Debug)VideoPlayer</a>
                <a href="/friendlist/home">Contacts</a>
                <a href="/submit">Submit</a>
                <a href="/courses">Courses</a>
            </div>
        );
    }
}

export default Sidebar;