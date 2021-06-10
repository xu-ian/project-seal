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

    componentDidMount() {
      var page = window.localStorage.getItem('pagenum') || 0;
      this.setState({pagenum:parseInt(page)});
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
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)-1); 
        window.location.reload();
    }
    increasePage(){
      var temp_num = prompt("Enter a page number:","");
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)+1);
        window.location.reload();
        
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

    changePage(event){
      var temp_num = prompt("Enter a page number from 1 to "+Math.floor(this.state.comments.length / 5 + 1).toString()+":","");
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

    displayButton(){
      var buttons = [];
      if(this.state.pagenum > 0){
        buttons.push(<button class="button" type="button" onClick={this.decreasePage}>Prev</button>);
      }
      buttons.push(<div role="button" class="pagenum">{parseInt(this.state.pagenum) + 1}</div>);
      buttons.push(<button class="button" type="button" onClick={this.changePage}>Choose Page</button>)
      if(this.state.pagenum + 1 < this.state.comments.length / 5){
        buttons.push(<button class="button" type="button" onClick={this.increasePage}>Next</button>);
      }
      
      return buttons;
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
              </ul>
            </nav>
          </div>
          <div class="Pageselector">
            {this.displayButton()}
          </div>
        </div>
      );
    }
  }
  
  export default PostViewerSpecific;