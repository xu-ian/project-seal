import React from "react";
import OfferComment from './OfferComment.js';
import axios from 'axios';
import Offer from './Offer.js'
import OfferCommentWrite from './OfferCommentWrite';
import { Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../Posts/PostViewer.css';

class OfferViewerSpecific extends React.Component {

    constructor(offers){
      super(offers); 
      this.state = {
        pagenum:0,
        offercomments:[{author:{username:"default"}},{author:{username:"default"}},
        {author:{username:"default"}},{author:{username:"default"}},{author:{username:"default"}}],
        loaded:false,
        loaded2:false
      }
      
      

      this.decreasePage = this.decreasePage.bind(this);
      this.increasePage = this.increasePage.bind(this);
      this.displayOfferComments = this.displayOfferComments.bind(this);
      this.displayButton = this.displayButton.bind(this);
      this.changePage = this.changePage.bind(this);
    }

    /**
     * Gets the offer of the specified offer id and the offercomments from that offer and loads them in.
     */
    componentDidMount() {
      var page = window.localStorage.getItem('pagenum') || 0;
      this.setState({pagenum:parseInt(page)});
      axios.get("http://localhost:5000/offers/" + window.localStorage.getItem('id')).then(res => {
        this.setState({author:res.data.author, content:res.data.content, tags:[res.data.tags], 
                       id:res.data._id});
        this.setState({loaded:true});
        });
      axios.get("http://localhost:5000/offers/" + window.localStorage.getItem('id') 
                + "/offercomments/").then(
        res => {
          this.setState({offercomments:res.data.offercomments})
          this.setState({loaded2:true});
        }
      )
    }

    /**
     * Decreases the page number to show different offers.
     */
    decreasePage(){
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)-1); 
        window.location.reload();
    }

    /**
     * Increases the page number to show different offers.
     */
    increasePage(){
        window.localStorage.setItem('pagenum', parseInt(this.state.pagenum)+1);
        window.location.reload();
        
    }

    /**
     * Returns up to 5 offercomments, based on how many offercomments exist.
     * 
     * @return {[HTML Code]} The offers that will be displayed.
     */
    displayOfferComments(){
      let OfferCommentsList = [];
      for(let i = 0; i < 5; i++){
        if(this.state.offercomments.length >= this.state.pagenum*5 + i + 1){
          OfferCommentsList.push(<div class="post"><OfferComment author={this.state.offercomments[parseInt(i)
           + this.state.pagenum*5].author.username}
           aid={this.state.offercomments[parseInt(i)+ this.state.pagenum*5].author._id} 
           content={this.state.offercomments[parseInt(i) + this.state.pagenum*5].content}
           id={this.state.offercomments[parseInt(i) + this.state.pagenum*5]._id}/></div>);
        }
        else{
          break;
        }
      }
      return OfferCommentsList;
    }

    /**
     * Changes the page number to an amount that the user will input. Answers will be modified
     * so that page number will never be less than 0 or greater than the total number of pages
     * possible.
     * @param {*} event Not used
     */
    changePage(event){
      var temp_num = prompt("Enter a page number from 1 to "+
                            Math.ceil(this.state.offercomments.length / 5).toString()+":","");
      if(temp_num !== null && !isNaN(parseInt(temp_num))){
        if(parseInt(temp_num) > this.state.offercomments.length / 5){
          temp_num = Math.floor(this.state.offercomments.length / 5);
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
        buttons.push(<Button type="button" 
                     onClick={this.decreasePage}><NavigateBeforeIcon/></Button>);
      }
      buttons.push(<div role="button" class="pagenum">
                   Page: {parseInt(this.state.pagenum) + 1}</div>);
      if(Math.floor((this.state.offercomments.length - 1) /5) !== 0){
        buttons.push(<Button type="button" onClick={this.changePage}>
          <MoreHorizIcon/></Button>);
      }
      if(parseInt(this.state.pagenum) + 1 < Math.ceil(this.state.offercomments.length / 5)){
        buttons.push(<Button type="button" 
                     onClick={this.increasePage}><NavigateNextIcon/></Button>);
      }
      
      return buttons;
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
              {/* The main offer being displayed */}
              <ul><Offer author = {this.state.author.username} aid={this.state.author._id}
                   content={this.state.content} 
                   tags={this.state.tags} id={window.localStorage.getItem('id')}
                   deletable={this.state.author._id === window.localStorage.getItem("userId")}/>
                  {/* The offercomment adding interface */}
                  <OfferCommentWrite id={this.state.id} />
                  {/* The offercomments associated with the offers*/}
                  {this.displayOfferComments()}
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
  
  export default OfferViewerSpecific;