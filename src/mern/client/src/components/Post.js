import React from 'react';
import './Post.css';
import axios from 'axios';

export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            content:this.props.content,
            tags:[],
            comment:[this.props.comment],
            id:this.props.id,
            deletable:this.props.del
        }
        this.renderTags = this.renderTags.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.deletable = this.deletable.bind(this);
        if(this.props.tags){
            this.state.tags=this.props.tags.toString().split(",");
        }
        
    }

    /**
     * Returns the html code for the tags of a post.
     * @returns {HTML Code} The html code representing each tag the post has.
     */
    renderTags(){
        const tagsList = [];
        for(let i = 0; i< this.state.tags.length; i++){
            tagsList.push(<div className="Tags" dangerouslySetInnerHTML={{__html:this.state.tags[i]}}/>);
        }
        return tagsList;
    }

    deletePost(){
        if(window.confirm("This will delete your post and all comments, are you sure?")){
            axios.delete("http://localhost:5000/posts/delete/" + this.state.id, {id:this.state.id});
            window.location.assign("/posts/1");
        }
        else{

        }
    }

    deletable(){
        if(this.state.deletable === "true"){
            return(<button class="delete" type="button" onClick={this.deletePost}>Delete</button>);
        }
    }

    
    /* Displays the page */
    render () {
        return (
            <div class="Post clickable">
                <div className="User">
                    {/* Author of post */}
                    <h1 dangerouslySetInnerHTML={{__html:this.state["author"]}}/>
                </div>
                <hr/>
                <div className="Body">
                    {/* Body of post */}
                    <p readonly="true">{this.state.content}</p>
                </div>
                <hr/>
                <div>
                    {/* Tags of post */}
                    {this.renderTags()}
                    {this.deletable()}
                </div>
            </div>
        );
    }
}


Post.defaultProps = {author: 'Default_User', content: 'Default_Body', tags: [], comment:[]};
