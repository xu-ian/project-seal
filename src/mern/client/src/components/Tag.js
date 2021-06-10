import React from 'react';
import './Post.css';

class Tag extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tag:this.props.tag
        }
    }

    render () {
        return(
            <div className="Tags" dangerouslySetInnerHTML={{__html:this.state["tag"]}}/>
        );
    }
}

Tag.defaultProps = {tag: 'Tag'};

export default Tag