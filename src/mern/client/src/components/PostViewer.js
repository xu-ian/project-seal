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
    axios.get("http://localhost:5000/posts/").then(res => {
      this.setState({posts:res.data});
      this.setState({loaded:true});
      });
  }

  decreasePage(){
    if(this.state.pg > 0){
      this.setState({pagenum:this.state.pg-1});
      window.localStorage.setItem('pg', this.state.pg-1); 
    }
    window.location.reload();
  }
  increasePage(){
    if(this.state.pg + 1 < this.state.posts.length / 5){
      this.setState({pg:parseInt(this.state.pg)+1});
      window.localStorage.setItem('pg', parseInt(this.state.pg)+1);
    }
    window.location.reload();
  }

  displayPosts(){
    let postsList = [];
    for(let i = 0; i < 5; i++){
      if(this.state.posts.length >= this.state.pg*5 + i +1 && this.state.posts.length !== 0){
        postsList.push(<Link to={{pathname:"post"}} onClick={() => {this.setState({postnum:this.state.pg*5+i}); window.localStorage.setItem("id", this.state.posts[this.state.pg*5+i]._id)}}>
          <Post author = {this.state.posts[i+this.state.pg*5].author} content={this.state.posts[i+this.state.pg*5].content} 
                  tags={[this.state.posts[i+this.state.pg*5].tags]} id={this.state.posts[i+this.state.pg*5]._id}/>
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
              <div className="Posts">
                <nav>
                  <ul>
                    {this.displayPosts()}
                  </ul>
                </nav>
              </div>
            </div>
            <div class = "Pageselector">
              <button class="button" type="button" onClick={this.decreasePage}>Prev</button>
              <div class="pagenum">{this.state.pg}</div>
              <button class="button" type="button" onClick={this.increasePage}>Next</button>
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

