import React from 'react';
import Tag from './Tag.js';
import './Post.css';

class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            content:this.props.content,
            tags:this.props.tags,
            comment:this.props.comment
        }

        this.renderTags = this.renderTags.bind(this);
    }

    renderTags(){
        const tagsList = [];
        for(let i = 0; i< this.state.tags.length; i++){
            tagsList.push(<Tag tag={this.state.tags[i]}/>);
        }
        return tagsList;
    }

    render () {
        return (
            <div class="Post">
                <div className="User">
                    <h1 dangerouslySetInnerHTML={{__html:this.state["author"]}}/>
                </div>
                <hr/>
                <div className="Body">
                    <p readonly="true">{this.state.content}</p>
                </div>
                <hr/>
                <div>{this.renderTags()}</div>
            </div>
        );
    }
}


Post.defaultProps = {author: 'Default_User', content: 'Default_Body', tags: [], comment:[]};

export default Post