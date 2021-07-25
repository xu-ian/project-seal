import React from "react";
import OfferWrite from './OfferWrite.js';
import axios from 'axios';
import Offer from './Offer.js';
import OfferViewerSpecific from './OfferViewerSpecific.js';
import '../Posts/PostViewer.css';
import { Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Link, Switch,
  Route, BrowserRouter as Router} from 'react-router-dom';

  export default class OfferViewer extends React.Component {

  /**
   * Main data structure for OfferViewer.
   */
  constructor(props){

    window.localStorage.setItem("epp", window.localStorage.getItem("epp") || 5);

    super(props);
    this.decreasePage = this.decreasePage.bind(this);
    this.increasePage = this.increasePage.bind(this);
    this.displayOffers = this.displayOffers.bind(this);
    this.displayButton = this.displayButton.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = {
      author:window.localStorage.getItem("userId")||"None",
      loaded:false,
      offers:[{author:{username:"default"}},{author:{username:"default"}},
      {author:{username:"default"}},{author:{username:"default"}},{author:{username:"default"}}],
      offernum:0,
      offerpg:0
    }
    
    var pnum = window.localStorage.getItem('offerpg') || 0;
    this.state.offerpg = pnum;
  }

  /**
   * Initializes offer viewer on entry or on reload.
   */
  componentDidMount() {
      //Initializes offerViewerSpecific page to 1 when entering OfferViewer
      if(window.location.pathname === "/offers/1"){
    window.localStorage.setItem('pagenum', 0);
  }
    //Call to database to retrieve all offers.
    axios.get("http://localhost:5000/offers/").then(res => {
      this.setState({offers:res.data});
      this.setState({loaded:true});
      }).catch(err => {this.setState({loaded:"Load Failed"})});

    console.log("pagenum:" + window.localStorage.getItem('pagenum'));
    console.log("offerpg:" + window.localStorage.getItem('offerpg'));
  }

  /**
   * Decreases the page number to show different offers.
   */
  decreasePage(){
    window.localStorage.setItem('offerpg', this.state.offerpg-1); 
    window.location.reload();
  }

  /**
   * Increases the page number to show different offers.
   */
  increasePage(){
    window.localStorage.setItem('offerpg', parseInt(this.state.offerpg)+1);
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
    if(this.state.offerpg > 0){
      buttons.push(<Button  type="button"  
                   onClick={this.decreasePage}><NavigateBeforeIcon/></Button>);
    }
    buttons.push(<div class="pagenum">Page: {parseInt(this.state.offerpg) + 1}</div>);
    if(Math.floor((this.state.offers.length - 1) / 5) !== 0){
      buttons.push(<Button  type="button" onClick={this.changePage}>
        <MoreHorizIcon/></Button>)
    }
    if(parseInt(this.state.offerpg) + 1 < Math.ceil(this.state.offers.length / 
      window.localStorage.getItem("epp"))){
      buttons.push(<Button type="button" 
                   onClick={this.increasePage}><NavigateNextIcon/></Button>);
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
      this.state.offers.length / window.localStorage.getItem("epp")).toString()+":","");
    if(temp_num !== null && !isNaN(parseInt(temp_num))){
      if(parseInt(temp_num) > this.state.offers.length / window.localStorage.getItem("epp")){
        temp_num = Math.floor(this.state.offers.length / window.localStorage.getItem("epp"));
      }
      if(parseInt(temp_num) < 0){
        temp_num = 0;
      }
      window.localStorage.setItem('offerpg', parseInt(temp_num));
      window.location.reload();
    }
  }

  /**
   * Displays offers that will link into OfferViewerSpecific. 
   * Will only disiplay offers until they run out. 
   */
  displayOffers(){
    let offersList = [];
    for(let i = 0; i < window.localStorage.getItem("epp"); i++){
      if(this.state.offers.length >= this.state.offerpg*window.localStorage.getItem("epp") + i +1 &&
         this.state.offers.length !== 0){
        offersList.push(<Link style={{ textDecoration: 'none', color:'Black' }} 
                        to={{pathname:"offer"}} onClick={() => {
          this.setState({offernum:this.state.offerpg*window.localStorage.getItem("epp")+i}); 
          window.localStorage.setItem("id", this.state.offers[
            this.state.offerpg*window.localStorage.getItem("epp")+i]._id)}}>
          <div class="post">
            <Offer offer = {this.state.offers[i+this.state.offerpg*window.localStorage.getItem("epp")]}
              author = {this.state.offers[i+this.state.offerpg*
                            window.localStorage.getItem("epp")].author.username}
              aid = {this.state.offers[i+this.state.offerpg*
                            window.localStorage.getItem("epp")].author._id}  
              content={this.state.offers[i+this.state.offerpg*
                       window.localStorage.getItem("epp")].content} 
              tags={this.state.offers[i+this.state.offerpg*window.localStorage.getItem("epp")].tags} 
              id={this.state.offers[i+this.state.offerpg*window.localStorage.getItem("epp")]._id}
              deletable={false}/>
          </div>
        </Link>);
      }
    }
    return offersList;
  }


  /**
   * Renders the OfferViewer page
   */
  render () {
    //Displays the loading screen until the database query is finished.
    if(this.state.loaded === false){
      return <p>Loading...</p>
    }
    else if(this.state.loaded === "Load Failed"){
      return <p>Load Failed. Please Reload.</p>
    }
    return (
      <Router>
        <Switch>
          {/*Displays the OfferViewer page*/}
          <Route path="/offers/1/">
            <div>
              <div class="PostWrite">
                {/* The interface for adding offers */}
                <OfferWrite id={this.state.author} />
              </div>
              <hr/>
              <div className="Posts">
                <nav>
                  <ul>
                    {/* The offers being displayed */}
                    {this.displayOffers()}
                  </ul>
                </nav>
              </div>
            </div>
            <div class = "Pageselector">
              {/* The page navigation display */}
              {this.displayButton()}
            </div>
          </Route>
          {/* Displays OfferViewerSpecific Page */}
          <Route path="/offers/offer">
            <OfferViewerSpecific offer={this.state.offers[this.state.offernum]}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}