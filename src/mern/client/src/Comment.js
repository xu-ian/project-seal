import React from 'react';
import './Post.css';

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:"Default_User",
            value:"Default_Comment_Body"
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
            </div>
        );
    }
}

export default Comment