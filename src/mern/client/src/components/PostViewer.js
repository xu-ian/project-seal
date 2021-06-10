import React from "react";
import PostWrite from './PostWrite.js';
import axios from 'axios';
import Post from './Post.js';
import PostViewerSpecific from './PostViewerSpecific.js';
import './PostViewer.css';
import {Link, Switch,
  Route, BrowserRouter as Router} from 'react-router-dom';

class PostViewer extends React.Component {

  constructor(props){
    super(props);
    this.getPost = this.getPost.bind(this);
    this.setPost1 = this.setPost1.bind(this);
    this.setPost2 = this.setPost2.bind(this);
    this.setPost3 = this.setPost3.bind(this);
    this.setPost4 = this.setPost4.bind(this);
    this.setPost5 = this.setPost5.bind(this);
    this.decreasePage = this.decreasePage.bind(this);
    this.increasePage = this.increasePage.bind(this);
    this.state = {
      post1:{author:"One", content:"body", tags:["one", "two"], comments:[{author:"Sam", content:"hi"}]},
      post2:{author:"Two", content:"text", tags:["tag1", "tag2"], comments:[{author:"Noah", content:"hi"},{author:"Sam", content:"hi"}]},
      post3:{author:"Three", content: "Hello world", tags:[], comments:[{author:"Louis", content:"Goodbye"}]},
      post4:{author:"Four", content:"Goodbye", tags:["one", "tag2"], comments:[{author:"Bob", content:"DM"}]},
      post5:{author:"Five", content:"Something", tags:["two"], comments:[]},
      seePost:{author:"", content:"", tags:[], comments:[]},
      pg:0
    }
    var pnum = window.localStorage.getItem('pg') || 0;
    this.state.pg = pnum;
  }

  setPost1(){
    this.setState({seePost:this.state.post1});
    window.localStorage.setItem('pagenum', 0);
      window.localStorage.setItem('author', this.state.post1.author);
      window.localStorage.setItem('content', this.state.post1.content);
      window.localStorage.setItem('comments', JSON.stringify(this.state.post1.comments));
      window.localStorage.setItem('tags', JSON.stringify(this.state.post1.tags));
  }

  setPost2(){
    this.setState({seePost:this.state.post2});
    window.localStorage.setItem('pagenum', 0);
      window.localStorage.setItem('author', this.state.post2.author);
      window.localStorage.setItem('content', this.state.post2.content);
      window.localStorage.setItem('comments', JSON.stringify(this.state.post2.comments));
      window.localStorage.setItem('tags', JSON.stringify(this.state.post2.tags));
  }

  setPost3(){
    this.setState({seePost:this.state.post3});
    window.localStorage.setItem('pagenum', 0);
      window.localStorage.setItem('author', this.state.post3.author);
      window.localStorage.setItem('content', this.state.post3.content);
      window.localStorage.setItem('comments', JSON.stringify(this.state.post3.comments));
      window.localStorage.setItem('tags', JSON.stringify(this.state.post3.tags));
  }

  setPost4(){
    this.setState({seePost:this.state.post4});
    window.localStorage.setItem('pagenum', 0);
      window.localStorage.setItem('author', this.state.post4.author);
      window.localStorage.setItem('content', this.state.post4.content);
      window.localStorage.setItem('comments', JSON.stringify(this.state.post4.comments));
      window.localStorage.setItem('tags', JSON.stringify(this.state.post4.tags));
  }

  setPost5(){
    this.setState({seePost:this.state.post5});
    window.localStorage.setItem('pagenum', 0);
      window.localStorage.setItem('author', this.state.post5.author);
      window.localStorage.setItem('content', this.state.post5.content);
      window.localStorage.setItem('comments', JSON.stringify(this.state.post5.comments));
      window.localStorage.setItem('tags', JSON.stringify(this.state.post5.tags));
  }

  decreasePage(){
    if(this.state.pg > 0){
      this.setState({pagenum:this.state.pg-1});
      window.localStorage.setItem('pg', this.state.pg-1); 
    }
    new Notification(this.state.pg-1);
    window.location.reload();
  }
  increasePage(){
    if(/*this.state.pg < this.comments.length / 5*/true){
      this.setState({pg:parseInt(this.state.pg)+1});
      window.localStorage.setItem('pg', parseInt(this.state.pg)+1);
    }
    new Notification(this.state.pg+1);
    window.location.reload();
  }

  getPost(){
    //Notification.requestPermission();
    axios.post("http://localhost:5000/add/").then(output => {
      //new Notification(output.data);
    }).catch(error => {
      //new Notification(error);
    });
      
  }

  render () {
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
                {this.getPost()}
                <Link to={{pathname:"post"}} onClick={this.setPost1}>
                  <Post author = {this.state.post1.author} content={this.state.post1.content} 
                  tags={this.state.post1.tags}/></Link>
                <Link to={{pathname:"post"}} onClick={this.setPost2}>
                  <Post author = {this.state.post2.author} content={this.state.post2.content} 
                  tags={this.state.post2.tags}/></Link>
                <Link to={{pathname:"post"}} onClick={this.setPost3}>
                <Post author = {this.state.post3.author} content={this.state.post3.content} 
                  tags={this.state.post3.tags}/></Link>
                <Link to={{pathname:"post"}} onClick={this.setPost4}>
                <Post author = {this.state.post4.author} content={this.state.post4.content} 
                  tags={this.state.post4.tags}/></Link>
                <Link to={{pathname:"post"}} onClick={this.setPost5}>
                <Post author = {this.state.post5.author} content={this.state.post5.content} 
                  tags={this.state.post5.tags}/></Link>
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
        <PostViewerSpecific author={this.state.seePost.author} 
        content={this.state.seePost.content} tags={this.state.seePost.tags} comments={this.state.seePost.comments}/>
      </Route>
      </Switch>
      </Router>
    );
  }
}

export default PostViewer;