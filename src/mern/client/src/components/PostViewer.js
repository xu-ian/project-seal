import React from "react";
import PostWrite from './PostWrite.js';
import axios from 'axios';
import Post from './Post.js';
import PostViewerSpecific from './PostViewerSpecific.js';
import './PostViewer.css';
import {Link, Switch,
  Route, BrowserRouter as Router} from 'react-router-dom';

  export default class PostViewer extends React.Component {

  constructor(props){
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

  componentDidMount() {
      if(window.location.pathname === "/posts/1"){
    window.localStorage.setItem('pagenum', 0);
  }
    axios.get("http://localhost:5000/posts/").then(res => {
      this.setState({posts:res.data});
      this.setState({loaded:true});
      });
  }

  decreasePage(){
    window.localStorage.setItem('pg', this.state.pg-1); 
    window.location.reload();
  }
  increasePage(){
    window.localStorage.setItem('pg', parseInt(this.state.pg)+1);
    window.location.reload();
  }

  displayButton(){
    var buttons = [];
    if(this.state.pg > 0){
      buttons.push(<button class="button" type="button" onClick={this.decreasePage}>Prev</button>);
    }
    buttons.push(<div class="pagenum">{parseInt(this.state.pg) + 1}</div>);
    buttons.push(<button class="button" type="button" onClick={this.changePage}>Choose Page</button>)
    if(this.state.pg + 1 < this.state.posts.length / 5){
      buttons.push(<button class="button" type="button" onClick={this.increasePage}>Next</button>);
    }
    
    return buttons;
  }

  changePage(event){
    var temp_num = prompt("Enter a page number from 1 to "+Math.floor(this.state.posts.length / 5 + 1).toString()+":","");
    if(temp_num !== null && !isNaN(parseInt(temp_num))){
      if(parseInt(temp_num) > this.state.posts.length / 5){
        temp_num = Math.floor(this.state.posts.length / 5);
      }
      if(parseInt(temp_num) < 0){
        temp_num = 0;
      }
      window.localStorage.setItem('pg', parseInt(temp_num));
      window.location.reload();
    }
  }

  displayPosts(){
    let postsList = [];
    for(let i = 0; i < 5; i++){
      if(this.state.posts.length >= this.state.pg*5 + i +1 && this.state.posts.length !== 0){
        postsList.push(<Link to={{pathname:"post"}} onClick={() => {this.setState({postnum:this.state.pg*5+i}); window.localStorage.setItem("id", this.state.posts[this.state.pg*5+i]._id)}}>
          <div class="post"><Post author = {this.state.posts[i+this.state.pg*5].author} content={this.state.posts[i+this.state.pg*5].content} 
                  tags={this.state.posts[i+this.state.pg*5].tags} id={this.state.posts[i+this.state.pg*5]._id}/></div>
        </Link>);
      }
    }
    return postsList;
  }



  render () {
    if(this.state.loaded = false){
      return <p>Loading...</p>
    }
    return (
      <Router>
        <Switch>
          <Route path="/posts/1/">
            <div>
              <div class="PostWrite">
                <PostWrite />
              </div>
              <hr/>
              <div className="Posts">
                <nav>
                  <ul>
                    {this.displayPosts()}
                  </ul>
                </nav>
              </div>
            </div>
            <div class = "Pageselector">
              {this.displayButton()}
            </div>
          </Route>
          <Route path="/posts/post">
            <PostViewerSpecific post={this.state.posts[this.state.postnum]}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

