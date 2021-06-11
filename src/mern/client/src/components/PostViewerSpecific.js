import React from "react";
import Comment from './Comment.js';
import axios from 'axios';
import Post from './Post.js'
import CommentWrite from './CommentWrite';
import './PostViewer.css';

class PostViewerSpecific extends React.Component {

    constructor(posts){
      super(posts); 
      this.state = {
        pagenum:0,
        loaded:false,
        loaded2:false
      }
      
      

      this.decreasePage = this.decreasePage.bind(this);
      this.increasePage = this.increasePage.bind(this);
      this.displayComments = this.displayComments.bind(this);
      this.displayButton = this.displayButton.bind(this);
      this.changePage = this.changePage.bind(this);
    }

    /**
     * Gets the post of the specified post id and the comments from that post and loads them in.
     */
    componentDidMount() {
      var page = window.localStorage.getItem('pagenum') || 0;
      this.setState({pagenum:parseInt(page)});
      axios.get("http://localhost:5000/posts/" + window.localStorage.getItem('id')).then(res => {
        this.setState({author:res.data.author, content:res.data.content, tags:[res.data.tags], 
                       id:res.data._id});
        this.setState({loaded:true});
        });
      axios.get("http://localhost:5000/posts/" + window.localStorage.getItem('id') 
                + "/comments/").then(
        res => {
          this.setState({comments:res.data.comments})
          this.setState({loaded2:true});
        }
      )
    }

    /**
     * Decreases the page number to show different posts.
     */
    decreasePage(){
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)-1); 
        window.location.reload();
    }

    /**
     * Increases the page number to show different posts.
     */
    increasePage(){
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)+1);
        window.location.reload();
        
    }

    /**
     * Returns up to 5 comments, based on how many comments exist.
     * 
     * @return {[HTML Code]} The posts that will be displayed.
     */
    displayComments(){
      let CommentsList = [];
      for(let i = 0; i < 5; i++){
        if(this.state.comments.length >= this.state.pagenum*5 + i + 1){
          CommentsList.push(<div class="post"><Comment author={this.state.comments[parseInt(i)
                            + this.state.pagenum*5].author} 
          content={this.state.comments[parseInt(i) + this.state.pagenum*5].content}/></div>);
        }
        else{
          break;
        }
      }
      return CommentsList;
    }

    /**
     * Changes the page number to an amount that the user will input. Answers will be modified
     * so that page number will never be less than 0 or greater than the total number of pages
     * possible.
     * @param {*} event Not used
     */
    changePage(event){
      var temp_num = prompt("Enter a page number from 1 to "+
                            Math.ceil(this.state.comments.length / 5).toString()+":","");
      if(temp_num !== null && !isNaN(parseInt(temp_num))){
        if(parseInt(temp_num) > this.state.comments.length / 5){
          temp_num = Math.floor(this.state.comments.length / 5);
        }
        if(parseInt(temp_num) < 0){
          temp_num = 0;
        }
        window.localStorage.setItem('pagenum', parseInt(temp_num));
        window.location.reload();
      }
    }

    /**
    * Displays page number, page number selection, as well as next page and previous page
    * buttons, based on page number.
    * 
    * @return {[HTML Code]} The buttons that will be displayed and the page number.
    */
    displayButton(){
      var buttons = [];
      if(this.state.pagenum > 0){
        buttons.push(<button class="button" type="button" 
                     onClick={this.decreasePage}>{"<"}</button>);
      }
      buttons.push(<div role="button" class="pagenum">
                   Page: {parseInt(this.state.pagenum) + 1}</div>);
      buttons.push(<button class="button" type="button" onClick={this.changePage}>#</button>)
      if(this.state.pagenum + 1 < this.state.comments.length / 5){
        buttons.push(<button class="button" type="button" 
                     onClick={this.increasePage}>{">"}</button>);
      }
      
      return buttons;
    }

    /**
     * Renders the html page.
     */
    render () {
      {/* Displays loading until the database queries from componentDidMount are completed */}
      if(this.state.loaded === false || this.state.loaded2 === false){
        return <p>Loading...</p>
      }
      return (
        <div>
          <div className="Posts">
            <nav>
              {this.getInitialState}
              {/* The main post being displayed */}
              <ul><Post author = {this.state.author} content={this.state.content} 
                   tags={this.state.tags} del="true"/>
                  {/* The comment adding interface */}
                  <CommentWrite id={this.state.id} />
                  {/* The comments associated with the posts*/}
                  {this.displayComments()}
              </ul>
            </nav>
          </div>
          <div class="Pageselector">
            {/* The page navigation */}
            {this.displayButton()}
          </div>
        </div>
      );
    }
  }
  
  export default PostViewerSpecific;