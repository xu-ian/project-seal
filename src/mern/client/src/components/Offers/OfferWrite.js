import React from 'react';
import axios from 'axios';
import {Paper, Typography, Button} from '@material-ui/core';


class OfferWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: this.props.id,
            title : 'dummy_title',
            content: '',
            tags:[],
            availableTags:[{tag:["E-commerce","lightgray"]}, {tag:["Networking","lightgray"]},
            {tag:["Administrative Offer","lightgray"]}, {tag:["News","lightgray"]}, 
            {tag:["Events","lightgray"]}, {tag:["General","lightgray"]}],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.renderAvailableTags = this.renderAvailableTags.bind(this);
    }

    /**
     * Adds or removes tags from the array of tags based on input.
     * @param {*} event The input from the checkbox.
     */
    handleTags = (event) => {
        let intval = event.currentTarget.value[0];
        let strval = event.currentTarget.value.slice(1);
        let newArray = [];
        let inArray = false;
        let availableTags = this.state.availableTags;
        availableTags[intval].tag[1] = "lightgrey";
        for(let i = 0; i < this.state.tags.length; i++){
            if(this.state.tags[i] === strval){
                inArray = true;
            }
            else{
                newArray.push(this.state.tags[i]);
            }
        }
        if(!inArray){
            newArray.push(strval);
            availableTags[intval].tag[1] = "blue";
        }
        this.setState({tags:newArray});
    }

    /**
     * Changes the contents of the textarea based on what was written.
     * @param {*} event The input from textarea.
     */
    handleChange(event) {
        this.setState({content: event.target.value});
    }

    /**
     * Sends a request to the server to add a offer to the database.
     * @param {*} event Input from the form submission.
     */
    handleSubmit(event) {
        if(this.state.content === ""){
            alert("Write something before offering!");
            return;
        }
        axios.post("http://localhost:5000/offers/add/" 
                   + window.localStorage.getItem("userId").toString(), this.state).then(
            res => {
            }
        ).catch();
        event.preventDefault();
        window.location.reload();
    }

    renderAvailableTags(){
        let tagsList = [];
        for(let i = 0; i < this.state.availableTags.length; i++){
            tagsList.push(<Button variant="contained" size="large"
            value={i+this.state.availableTags[i].tag[0]} onClick={this.handleTags}
            style={{"background-color":this.state.availableTags[i].tag[1]}} >
              {this.state.availableTags[i].tag[0]}
          </Button>);
        }
        return tagsList;
    }

    /**
     * Returns the html for a OfferWrite class.
     * @returns The html code for a OfferWrite interface.
     */
    render (){
        if(window.localStorage.getItem("userrole").includes("serviceprovider")) {
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    {/* Textarea to write offer in */}
                    <textarea placeholder = "Write a offer or discount" value={this.state.value} onChange={this.handleChange} />
                </label>
                {/* {this.renderAvailableTags()} */}
                <input class="addButton" style={{"font-size":"18px"}} type="submit" value="Create Offer or Discount" />
            </form>
        );
        }
        else{
            return(
                <Paper>
                    <Typography style={{margin:"25px", "text-align":"center","font-size":"150%"}}>
                        Only service provider can add offers
                    </Typography>
                </Paper>
            );
        }
    }
}

export default OfferWrite;