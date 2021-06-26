import React from "react";
import "./Sidebar.css";

class Sidebar extends React.Component {
    render(){
        return (
            <div class="sidebar">
                <h1 class="title">AIC</h1>
                <a href="/">Home</a>
                <a href="/posts/1">Posts</a>
                <a href="/list">Companies</a>
                <a href="/player">(Debug)VideoPlayer</a>
                <a href="/friendlist/home">Contacts</a>
                <a href="/submit">Submit</a>
                {/*<a href="/testing">File Upload</a>*/}
            </div>
        );
    }
}

export default Sidebar;