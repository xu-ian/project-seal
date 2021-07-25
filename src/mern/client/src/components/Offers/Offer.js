import React from 'react';
import '../Posts/Post.css';
import {Typography, Paper, Card} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import OfferPopup from './OfferPopup.js';
import axios from 'axios';

export default class Offer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author:this.props.author,
            aid:this.props.aid,
            content:this.props.content,
            tags:[],
            comment:[this.props.comment],
            id:this.props.id,
            edit:false,
            deletable:this.props.deletable,
            Open:"hidden",
            username:"N/A",
            email:"N/A",
            links: "N/A",
            belongingCompany: "N/A",
            position: "N/A"
        }
        this.renderTags = this.renderTags.bind(this);
        this.deleteOffer = this.deleteOffer.bind(this);
        this.deletable = this.deletable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.edits = this.edits.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        if(this.props.tags){
            this.state.tags=this.props.tags.toString().split(",");
        }
        
    }

    componentDidMount(){
        axios.get("http://localhost:5000/user-profile/?_id:" + this.state.id)
      .then((response) => {
        const userLists = response.data;
        const currentUser = userLists.find(person => person._id === this.state.aid);
        this.setState({
          username: currentUser.username,
          email: currentUser.email,
          links: currentUser.links,
          belongingCompany: currentUser.belongingCompany,
          position: currentUser.position
        });
      })
      .catch(function (error) {});
    }

    /**
     * Returns the html code for the tags of a offer.
     * @returns {HTML Code} The html code representing each tag the offer has.
     */
    renderTags(){
        const tagsList = [];
        for(let i = 0; i< this.state.tags.length; i++){
            tagsList.push(<div className="Tags" dangerouslySetInnerHTML={{__html:this.state.tags[i]}}/>);
        }
        return tagsList;
    }

    deleteOffer(){
        if(window.confirm("This will delete your offer and all comments, are you sure?")){
            axios.delete("http://localhost:5000/offers/delete/" + this.state.id, {id:this.state.id});
            window.location.assign("/offers/1");
        }
        else{

        }
    }
    
    deletable(){
        let buttons = []
        if(this.state.deletable){
            buttons.push(<button class="delete" type="button" 
                         onClick={this.deleteOffer}><DeleteIcon/></button>);
            buttons.push(<button class="modify" type="button" onClick={() =>{
                if(this.state.edit){
                    this.setState({edit:false});
                    axios.patch("http://localhost:5000/offers/update/"+this.state.id, this.state);
                }
                else{
                    this.setState({edit:true});
                }
            }}><EditIcon/></button>)
            return buttons;
        }
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }
    
    edits(){
        if(this.state.edit){
            return(
                <textarea placeholder = "Edit this Offer" value={this.state.content}
                  onChange={this.handleChange} />
            );
        }
        else{
            return(<p class = "body" readonly="true" style={{margin:"10px"}}>{this.state.content}</p>);
        }
    }

    handleOpen(event){
        this.setState({Open:"visible"});
    }

    handleClose(){
        this.setState({Open:"hidden"});
    }

    /* Displays the page */
    render () {
        return (
            <Card border={1} style={{border:"1px solid darkgray", 
              "border-radius": "7px"}} class="clickable">
              <OfferPopup author={this.state.author} aid={this.state.aid} id={this.state.id}/>
              <div style={{margin: "auto", display: "block", overflow:"hidden", 
               "text-decoration": "none"}}>
                <hr/>
                <div>
                  {/* Body of offer */}
                  {this.edits()}
                </div>
                <div>
                  {/* Tags of offer */}
                  {this.renderTags()}
                  {this.deletable()}
                </div>
              </div>
            </Card>
        );
    }
}


Offer.defaultProps = {author: 'Default_User', content: 'Default_Body', tags: [], comment:[]};
