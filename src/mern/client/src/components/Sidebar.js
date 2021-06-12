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
            </div>
        );
    }
}

export default Sidebar;