import React from 'react';
import axios from 'axios';
import './PostWrite.css';

class PostWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "Name",
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
        axios.post("http://localhost:5000/posts/add/", this.state).then(
            res => {
            }
        ).catch();
        event.preventDefault();
    }

    /**
     * Returns the html for a PostWrite class.
     * @returns The html code for a PostWrite interface.
     */
    render (){
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    {/* Textarea to write post in */}
                    <textarea placeholder = "Make a post" value={this.state.value} onChange={this.handleChange} />
                </label>
                {/* Tags to select. */}
                <label class="switch">
                    <input type="checkbox" value="tag1" onChange={this.handleTags}/>
                    <span class="slider"><div class = 'center' >Tag1</div></span>
                </label>
                <label class="switch">
                    <input type="checkbox" value="tag2" onChange={this.handleTags}/>
                    <span class="slider"><div class = 'center'>Tag2</div></span>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default PostWrite;