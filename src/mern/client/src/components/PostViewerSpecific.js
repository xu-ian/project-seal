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

      
      var page = window.localStorage.getItem('pagenum') || 0;
      this.state.pagenum = parseInt(page);

      this.decreasePage = this.decreasePage.bind(this);
      this.increasePage = this.increasePage.bind(this);
      this.displayComments = this.displayComments.bind(this);
      this.setInitialState = this.setInitialState.bind(this);
    }

    componentDidMount() {
      axios.get("http://localhost:5000/posts/" + window.localStorage.getItem('id')).then(res => {
        this.setState({author:res.data.author, content:res.data.content, tags:[res.data.tags], id:res.data._id});
        this.setState({loaded:true});
        });
      axios.get("http://localhost:5000/posts/" + window.localStorage.getItem('id') + "/comments/").then(
        res => {
          this.setState({comments:res.data.comments})
          this.setState({loaded2:true});
        }
      )
    }

    decreasePage(){
      if(this.state.pagenum > 0){
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)-1); 
        window.location.reload();
      }
    }
    increasePage(){
      if(this.state.pagenum < this.state.comments.length / 5){
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)+1);
        window.location.reload();
      }
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
      for(let i = 0; i < 5; i++){
        if(this.state.comments.length >= this.state.pagenum*5 + i + 1){
          CommentsList.push(<div class="post"><Comment author={this.state.comments[parseInt(i) + this.state.pagenum*5].author} 
          content={this.state.comments[parseInt(i) + this.state.pagenum*5].content}/></div>);
        }
        else{
          break;
        }
      }
      return CommentsList;
    }

    render () {
      if(this.state.loaded === false || this.state.loaded2 === false){
        return <p>Loading...</p>
      }
      return (
        <div>
          <div className="Posts">
            <nav>
              {this.getInitialState}
              <ul><Post author = {this.state.author} content={this.state.content} tags={this.state.tags}/>
                  <CommentWrite id={this.state.id}/>
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