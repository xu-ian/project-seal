import React from 'react';
import axios from 'axios';
import {Paper, Typography} from '@material-ui/core';
import '../Posts/CommentWrite.css';

class OfferCommentWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: window.localStorage.getItem("username"),
            content: '',
            offer_id: this.props.id,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * This function sets the contents of the textarea to be what the user has written.
     * @param {*} event The input including the body of the offercomment.
     */
    handleChange(event) {
        this.setState({content: event.target.value});
    }

    /**
     * This function sends a request to the server to add this offercomment to the database.
     * @param {*} event Used to prevent the default actions from being performed.
     */
    handleSubmit(event) {
        if(this.state.content === ''){
            alert("Please write something before submitting!");
            return;
        }
        axios.post("http://localhost:5000/offers/"+this.state.offer_id.toString()+"/offercomments/add/" + window.localStorage.getItem("userId").toString(),
                   this.state).then(
            res => {
            }
        ).catch(err =>{});
        event.preventDefault();
        window.location.reload();
    }

    render (){
        if(window.localStorage.getItem("userId")) {
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    {/* The textarea to type in your offercomment. */}
                    <textarea placeholder = "Make a offercomment" value={this.state.content} onChange={this.handleChange} />
                </label>
                <input style={{"font-size":"18px"}}class="addButton" type="submit" value="Create OfferComment" />
            </form>
        );}
        else{
            return(
                <Paper>
                    <Typography style={{margin:"25px", "text-align":"center","font-size":"150%"}}>
                        Please sign in to add offercomments
                    </Typography>
                </Paper>
            );
        }
    }
}

export default OfferCommentWrite