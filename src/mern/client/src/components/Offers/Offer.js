import React from 'react';
import '../Posts/Post.css';
import axios from 'axios';

export default class Offer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        userID:this.props.userID,
        messageText:this.props.messageText,
        // tags:[],
        // comment:[this.props.comment],
        id:this.props.id,
        edit:false,
        deletable:this.props.deletable
    }
    // this.renderTags = this.renderTags.bind(this);
    // this.deletePost = this.deletePost.bind(this);
    // this.deletable = this.deletable.bind(this);
    this.edits = this.edits.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // if(this.props.tags){
    //     this.state.tags=this.props.tags.toString().split(",");
    // }
    
  }

  // handleChange(event) {
  //   this.setState({content: event.target.value});
  // }

  edits(){
    // if(this.state.edit){
    //     return(
    //         <textarea placeholder = "Edit this Post" value={this.state.content}
    //           onChange={this.handleChange} />
    //     );
    // }
    // else{
    //     // return(<p readonly="true">{this.state.content}</p>);
    // }

    return(<p readonly="true">{this.state.messageText}</p>);
  }

  /* Displays the page */
  render () {
    return (
      <div class="Post clickable">
          <div className="User">
              {/* Author of offer */}
              <h1 dangerouslySetInnerHTML={{__html:this.state["userID"]}}/>
          </div>
          <hr/>
          <div className="Body">
              {/* Body of offer */}
              {this.edits()}
          </div>
          <hr/>
          <div>
              {/* Tags of offer */}
              {/* {this.renderTags()}
              {this.deletable()} */}
          </div>
      </div>
    );
  }
  
}