import React from 'react';
import axios from 'axios';
import {Paper, Typography} from '@material-ui/core';
import './PostWrite.css';

class PostWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: this.props.id,
            title : 'dummy_title',
            content: 'Content',
            tags:[]
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTags = this.handleTags.bind(this);
    }

    /**
     * Adds or removes tags from the array of tags based on input.
     * @param {*} event The input from the checkbox.
     */
    handleTags(event){
        let newArray = [];
        let inArray = false;
        for(let i = 0; i < this.state.tags.length; i++){
            if(this.state.tags[i] === event.target.value){
                inArray = true;
            }
            else{
                newArray.push(this.state.tags[i]);
            }
        }
        if(!inArray){
            newArray.push(event.target.value);
        }
        this.setState({tags:newArray});
    }

    /**
     * Changes the contents of the textarea based on what was written.
     * @param {*} event The input from textarea.
     */
    handleChange(event) {
        this.setState({content: event.target.value});
    }

    /**
     * Sends a request to the server to add a post to the database.
     * @param {*} event Input from the form submission.
     */
    handleSubmit(event) {
        axios.post("http://localhost:5000/posts/add/" 
                   + window.localStorage.getItem("userId").toString(), this.state).then(
            res => {
            }
        ).catch();
        event.preventDefault();
        window.location.reload();
    }

    /**
     * Returns the html for a PostWrite class.
     * @returns The html code for a PostWrite interface.
     */
    render (){
        if(window.localStorage.getItem("userId")) {
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    {/* Textarea to write post in */}
                    <textarea placeholder = "Make a post" value={this.state.value} onChange={this.handleChange} />
                </label>
                {/* Tags to select. */}
                <label class="switch">
                    <input type="checkbox" value="E-Commerce" onChange={this.handleTags}/>
                    <span class="slider"><div class = 'center' >E-Commerce</div></span>
                </label>
                <label class="switch">
                    <input type="checkbox" value="Networking" onChange={this.handleTags}/>
                    <span class="slider"><div class = 'center'>Networking</div></span>
                </label>
                <label class="switch">
                    <input type="checkbox" value="News" onChange={this.handleTags}/>
                    <span class="slider"><div class = 'center'>News</div></span>
                </label>
                <label class="switch">
                    <input type="checkbox" value="Administrative Post" onChange={this.handleTags}/>
                    <span class="slider"><div class = 'center'>Administrative Post</div></span>
                </label>
                <label class="switch">
                    <input type="checkbox" value="Events" onChange={this.handleTags}/>
                    <span class="slider"><div class = 'center'>Events</div></span>
                </label>
                <input class="addButton" type="submit" value="Create Post" />
            </form>
        );
        }
        else{
            return(
                <Paper>
                    <Typography style={{margin:"25px", "text-align":"center","font-size":"150%"}}>
                        Please sign in to add posts
                    </Typography>
                </Paper>
            );
        }
    }
}

export default PostWrite;