import React from 'react';
import './Post.css';

class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:"Default_User",
            value:"Default_Post_Body",
            tag1:"Default_Tag1",
            tag2:"Default_Tag2",
            tag3:""
        }
    }
    
    render () {
        return (
            <div class="Post">
                <div className="User">
                    <h1 dangerouslySetInnerHTML={{__html:this.state["user"]}}/>
                </div>
                <hr/>
                <div className="Body">
                    <textarea readonly="true" value = {this.state.value} />
                </div>
                <hr/>
                <div className="Tags" dangerouslySetInnerHTML={{__html:this.state["tag1"]}}/>
                <div className="Tags" dangerouslySetInnerHTML={{__html:this.state["tag2"]}}/>
                <div className="Tags" dangerouslySetInnerHTML={{__html:this.state["tag3"]}}/>
            </div>
        );
    }
}

export default Post