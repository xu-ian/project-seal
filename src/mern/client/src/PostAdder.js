import React, { Component } from "react";

class PostAdder extends React.Component {
    render () {
        return (
            <div>
               <form>
                   <h>Write a post</h>
                   <input type="text"></input>
                   </form> 
            </div>
        );
    }
}

export default PostAdder;