import React from "react";
import Comment from './Comment.js';
import axios from 'axios';
import Post from './Post.js'
import CommentWrite from './CommentWrite';
import './PostViewer.css';

class PostViewerSpecific extends React.Component {

    constructor(posts){
      super(posts); 
      this.state = {/*
        author:this.props.post.author,
        content:this.props.post.content,
        tags:this.props.post.tags,
        comments:this.props.post.comments,*/
        pagenum:0,
        loaded:false
      }

      this.decreasePage = this.decreasePage.bind(this);
      this.increasePage = this.increasePage.bind(this);
      this.displayComments = this.displayComments.bind(this);
      this.setInitialState = this.setInitialState.bind(this);
      Notification.requestPermission();
      /*var pnum = window.localStorage.getItem('pagenum') || 0;
      var cmmt = JSON.parse(window.localStorage.getItem('comments')) || [];
      var author = window.localStorage.getItem('author') || "DefaultName";
      var content = window.localStorage.getItem('content') || "";
      var tags = JSON.parse(window.localStorage.getItem('tags')) || [];
        this.state.pagenum=pnum;
      if(cmmt !== []){
        this.state.comments = cmmt;
      }
      if(author !== "DefaultName"){
        this.state.author=author;
      }
      if(content !== ""){
        this.state.content=content;
      }
      if(tags !== []){
        this.state.tags=tags;
      }*/
    }

    componentDidMount() {
      axios.get("http://localhost:5000/posts/" + window.localStorage.getItem('id')/*this.state.id*/).then(res => {
        this.setState({author:res.data.author, content:res.data.content, tags:[res.data.tags], comments:[res.data.comments]});
        this.setState({loaded:true});
        });
    }

    decreasePage(){
      if(this.state.pagenum > 0){
        this.setState({pagenum:this.state.pagenum-1});
        window.localStorage.setItem('pagenum', this.state.pagenum-1); 
      }
      new Notification(this.state.pagenum-1);
      window.location.reload();
    }
    increasePage(){
      if(this.state.pagenum < this.comments.length / 5){
        this.setState({pagenum:parseInt(this.state.pagenum)+1});
        window.localStorage.setItem('pagenum', parseInt(this.state.pg)+1);
      }
      new Notification(this.state.pagenum+1);
      window.location.reload();
    }

    setInitialState(){
      window.localStorage.setItem('pagenum', this.state.pagenum);
      window.localStorage.setItem('author', this.state.author);
      window.localStorage.setItem('content', this.state.content);
      window.localStorage.setItem('comments', JSON.stringify(this.state.comments));
      window.localStorage.setItem('tags', JSON.stringify(this.state.tags));
    }

    displayComments(){
      let CommentsList = [];
      Notification.requestPermission();
      for(let i = 0; i < 5; i++){
        if(this.state.comments.length >= this.state.pagenum*5 + i + 1){
          CommentsList.push(<Comment author={this.state.comments[parseInt(i) + this.state.pagenum*5].author} 
          content={this.state.comments[parseInt(i) + this.state.pagenum*5].content}/>);
        }
        else{
          break;
        }
      }
      return CommentsList;
    }

    render () {
      if(this.state.loaded === false){
        return <p>Loading...</p>
      }
      return (
        <div>
          <div className="Posts">
            <nav>
              {this.getInitialState}
              <ul><Post author = {this.state.author} content={this.state.content} tags={this.state.tags}/>
                  <CommentWrite/>
                  {this.displayComments()}
                  {this.setInitialState()}
              </ul>
            </nav>
          </div>
          <div class="Pageselector">
            <button class="button" type="button" onClick={this.decreasePage}>Prev</button>
            <div class="pagenum">{this.state.pagenum}</div>
            <button class="button" type="button" onClick={this.increasePage}>Next</button>
          </div>
        </div>
      );
    }
  }
  
  export default PostViewerSpecific;