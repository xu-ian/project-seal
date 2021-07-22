import React from 'react';
import axios from 'axios';
// import '../Posts/PostWrite.css';

class OfferWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        author: window.localStorage.getItem("name"),
        title : 'dummy_title',
        content: 'Content'
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleTags = this.handleTags.bind(this);


  }

  /**
   * Changes the contents of the textarea based on what was written.
   * @param {*} event The input from textarea.
   */
  handleChange(event) {
    this.setState({content: event.target.value});
  }

  /**
     * Sends a request to the server to add a post to the database.
     * @param {*} event Input from the form submission.
     */
  handleSubmit(event) {
    axios.post("http://localhost:5000/offers/add/", this.state).then(
        res => {
        }
    ).catch();
    event.preventDefault();
    window.location.reload();
  }

  /**
     * Returns the html for a PostWrite class.
     * @returns The html code for a PostWrite interface.
     */
  render (){
    return (
        <form onSubmit={this.handleSubmit} >
            <label>
                {/* Textarea to write offer in */}
                <textarea placeholder = "Make an offer or discount" value={this.state.value} onChange={this.handleChange} />
            </label>
            {/* Tags to select. */}
            {/* <label class="switch">
                <input type="checkbox" value="tag1" onChange={this.handleTags}/>
                <span class="slider"><div class = 'center' >Tag1</div></span>
            </label>
            <label class="switch">
                <input type="checkbox" value="tag2" onChange={this.handleTags}/>
                <span class="slider"><div class = 'center'>Tag2</div></span>
            </label> */}
            <input class="addButton" type="submit" value="Create Offer or Discount" />
        </form>
    );
  }

}

export default OfferWrite;