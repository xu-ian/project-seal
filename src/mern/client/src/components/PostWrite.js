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

    handleTags(event){
        Notification.requestPermission();
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

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        
        Notification.requestPermission();
        axios.post("http://localhost:5000/posts/add/", this.state).then(
            res => {
                console.log(res);
                new Notification(res);
            }
        ).catch(event => (new Notification(event)));
        new Notification(this.state.author + " " + this.state.content +" "+this.state.tags);
        event.preventDefault();
    }

    render (){
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    <textarea placeholder = "Make a post" value={this.state.value} onChange={this.handleChange} />
                </label>
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