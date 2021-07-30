import React from "react";
// import Comment from './Comment.js';
import axios from 'axios';
import Offer from './Offer.js'
// import CommentWrite from './CommentWrite';
// import { Button } from '@material-ui/core';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../Posts/PostViewer.css';


class OfferViewerSpecific extends React.Component {

  constructor(props){
    super(props); 
    this.state = {
      pagenum:0,
      userID: this.props.offer.userID,
      messageText:this.props.offer.messageText
      // comments:[{author:{username:"default"}},{author:{username:"default"}},
      // {author:{username:"default"}},{author:{username:"default"}},{author:{username:"default"}}],
      // loaded:false,
      // loaded2:false
    }
    
    

    // this.decreasePage = this.decreasePage.bind(this);
    // this.increasePage = this.increasePage.bind(this);
    // this.displayComments = this.displayComments.bind(this);
    // this.displayButton = this.displayButton.bind(this);
    // this.changePage = this.changePage.bind(this);
  }

  /**
   * Gets the post of the specified post id and the comments from that post and loads them in.
   */
  componentDidMount() {
    var page = window.localStorage.getItem('pagenum') || 0;
    this.setState({pagenum:parseInt(page)});
    // axios.get("http://localhost:5000/offers/" + window.localStorage.getItem('id')).then(res => {
    //   this.setState({userID:res.data.userID, messageText:res.data.messageText,
    //                   id:res.data._id});
    //   this.setState({loaded:true});
    //   });
    // axios.get("http://localhost:5000/offers/" + window.localStorage.getItem('id') 
    //           + "/comments/").then(
    //   res => {
    //     this.setState({comments:res.data.comments})
    //     this.setState({loaded2:true});
    //   }
    // );
  }


  /**
   * Renders the html page.
   */
  render () {
    if(this.state.loaded === false || this.state.loaded2 === false){
      return <p>Loading...</p>
    }
    return (
      <div>
        <div className="Posts">
          <nav>
            {this.getInitialState}
            {/* The main post being displayed */}
            <ul><Offer userID = {this.state.userID}
                  messageText={this.state.messageText} 
                  // deletable={this.state.author._id === window.localStorage.getItem("userId")}
                />
                {/* The comment adding interface */}
                {/* <CommentWrite id={this.state.id} /> */}
                {/* The comments associated with the posts*/}
                {/* {this.displayComments()} */}
            </ul>
          </nav>
        </div>
        <div class="Pageselector">
          {/* The page navigation */}
          {/* {this.displayButton()} */}
        </div>
      </div>
    );
  }
}

export default OfferViewerSpecific;