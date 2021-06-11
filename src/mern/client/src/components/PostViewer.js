import React from "react";
import PostWrite from './PostWrite.js';
import axios from 'axios';
import Post from './Post.js';
import PostViewerSpecific from './PostViewerSpecific.js';
import './PostViewer.css';
import {Link, Switch,
  Route, BrowserRouter as Router} from 'react-router-dom';

  export default class PostViewer extends React.Component {

  /**
   * Main data structure for PostViewer.
   */
  constructor(props){

    window.localStorage.setItem("epp", window.localStorage.getItem("epp") || 5);

    super(props);
    this.decreasePage = this.decreasePage.bind(this);
    this.increasePage = this.increasePage.bind(this);
    this.displayPosts = this.displayPosts.bind(this);
    this.displayButton = this.displayButton.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = {
      loaded:false,
      posts:[],
      postnum:0,
      pg:0
    }
    
    var pnum = window.localStorage.getItem('pg') || 0;
    this.state.pg = pnum;
  }

  /**
   * Initializes post viewer on entry or on reload.
   */
  componentDidMount() {
      //Initializes postViewerSpecific page to 1 when entering PostViewer
      if(window.location.pathname === "/posts/1"){
    window.localStorage.setItem('pagenum', 0);
  }
    //Call to database to retrieve all posts.
    axios.get("http://localhost:5000/posts/").then(res => {
      this.setState({posts:res.data});
      this.setState({loaded:true});
      });
  }

  /**
   * Decreases the page number to show different posts.
   */
  decreasePage(){
    window.localStorage.setItem('pg', this.state.pg-1); 
    window.location.reload();
  }

  /**
   * Increases the page number to show different posts.
   */
  increasePage(){
    window.localStorage.setItem('pg', parseInt(this.state.pg)+1);
    window.location.reload();
  }

  /**
   * Displays page number, page number selection, as well as next page and previous page
   * buttons, based on page number.
   * 
   * @return {[HTML Code]} The buttons that will be displayed and the page number.
   */
  displayButton(){
    var buttons = [];
    if(this.state.pg > 0){
      buttons.push(<button class="button" type="button"  
                   onClick={this.decreasePage}>{"<"}</button>);
    }
    buttons.push(<div class="pagenum">Page: {parseInt(this.state.pg) + 1}</div>);
    buttons.push(<button class="button" type="button" onClick={this.changePage}>
      {"#"}</button>)
    if(this.state.pg + 1 < this.state.posts.length / window.localStorage.getItem("epp")){
      buttons.push(<button class="button" type="button" 
                   onClick={this.increasePage}>{">"}</button>);
    }
    
    return buttons;
  }
  
  /**
   * Changes the page number to an amount that the user will input. Answers will be modified
   * so that page number will never be less than 0 or greater than the total number of pages
   * possible.
   * 
   * @param {*} event Not used
   */
  changePage(event){
    var temp_num = prompt("Enter a page number from 1 to "+ Math.ceil(
      this.state.posts.length / window.localStorage.getItem("epp")).toString()+":","");
    if(temp_num !== null && !isNaN(parseInt(temp_num))){
      if(parseInt(temp_num) > this.state.posts.length / window.localStorage.getItem("epp")){
        temp_num = Math.floor(this.state.posts.length / window.localStorage.getItem("epp"));
      }
      if(parseInt(temp_num) < 0){
        temp_num = 0;
      }
      window.localStorage.setItem('pg', parseInt(temp_num));
      window.location.reload();
    }
  }

  /**
   * Displays posts that will link into PostViewerSpecific. 
   * Will only disiplay posts until they run out. 
   */
  displayPosts(){
    let postsList = [];
    for(let i = 0; i < window.localStorage.getItem("epp"); i++){
      if(this.state.posts.length >= this.state.pg*window.localStorage.getItem("epp") + i +1 &&
         this.state.posts.length !== 0){
        postsList.push(<Link style={{ textDecoration: 'none', color:'Black' }} 
                        to={{pathname:"post"}} onClick={() => {
          this.setState({postnum:this.state.pg*window.localStorage.getItem("epp")+i}); 
          window.localStorage.setItem("id", this.state.posts[
            this.state.pg*window.localStorage.getItem("epp")+i]._id)}}>
          <div class="post">
            <Post author = {this.state.posts[i+this.state.pg*
                            window.localStorage.getItem("epp")].author} 
              content={this.state.posts[i+this.state.pg*
                       window.localStorage.getItem("epp")].content} 
              tags={this.state.posts[i+this.state.pg*window.localStorage.getItem("epp")].tags} 
              id={this.state.posts[i+this.state.pg*window.localStorage.getItem("epp")]._id}
              del="false"/>
          </div>
        </Link>);
      }
    }
    return postsList;
  }


  /**
   * Renders the PostViewer page
   */
  render () {
    //Displays the loading screen until the database query is finished.
    if(this.state.loaded = false){
      return <p>Loading...</p>
    }
    return (
      <Router>
        <Switch>
          {/*Displays the PostViewer page*/}
          <Route path="/posts/1/">
            <div>
              <div class="PostWrite">
                {/* The interface for adding posts */}
                <PostWrite />
              </div>
              <hr/>
              <div className="Posts">
                <nav>
                  <ul>
                    {/* The posts being displayed */}
                    {this.displayPosts()}
                  </ul>
                </nav>
              </div>
            </div>
            <div class = "Pageselector">
              {/* The page navigation display */}
              {this.displayButton()}
            </div>
          </Route>
          {/* Displays PostViewerSpecific Page */}
          <Route path="/posts/post">
            <PostViewerSpecific post={this.state.posts[this.state.postnum]}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

