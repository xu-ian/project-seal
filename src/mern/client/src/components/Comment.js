import React from 'react';
import './Post.css';

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            content:this.props.content
        }
    }
    
    /**
     * Returns an html comment.
     * @returns Html representation of a comment.
     */
    render () {
        return (
            <div class="Post">
                <div className="User">
                    {/* Name of user */}
                    <h1 dangerouslySetInnerHTML={{__html:this.state["author"]}}/>
                </div>
                <hr/>
                <div className="Body">
                    {/* Content of comment */}
                    <p>{this.state.content}</p>
                </div>
            </div>
        );
    }
}

Comment.defaultProps = {author:"Default_User", value:"Default_Comment_Body"};

export default Comment