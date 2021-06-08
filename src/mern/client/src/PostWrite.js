import React from 'react';

class PostWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            tag1: "No",
            tag2: "No",
            tag3: "No"
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value, tag1:this.state.tag1, 
            tag2:this.state.tag2, tag3:this.state.tag3});
    }

    handleChange1(event){
        if(event.target.value === "tag1"){
            if(this.state.tag1 === "No"){
                this.setState({value:this.state.value, tag1:"Yes", 
                tag2:this.state.tag2, tag3:this.state.tag3});
            }
            else{
                this.setState({value:this.state.value, tag1:"No", 
                tag2:this.state.tag2, tag3:this.state.tag3});
            }
        }
        else if(event.target.value === "tag2"){
            if(this.state.tag2 === "No"){
                this.setState({value:this.state.value, tag1:this.state.tag1,
                     tag2:"Yes", tag3:this.state.tag3});
            }
            else{
                this.setState({value:this.state.value, tag1:this.state.tag1,
                    tag2:"No", tag3:this.state.tag3});
            }
        }
        else{
            if(this.state.tag3 === "No"){
                this.setState({value:this.state.value, tag1:this.state.tag1,
                    tag2:this.state.tag2, tag3:"Yes"});
            }
            else{
                this.setState({value:this.state.value, tag1:this.state.tag1,
                    tag2:this.state.tag2, tag3:"No"});
            }
        }
        
    }

    handleSubmit(event) {
        //Placeholder. Should call server endpoint to add post to database.
        Notification.requestPermission();
        new Notification(this.state.value +" "+this.state.tag1 +" "+this.state.tag2+" "+this.state.tag3);
        event.preventDefault();
    }

    render (){
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    <textarea placeholder = "Make a post" value={this.state.value} onChange={this.handleChange} />
                    <select size = "3" mutliple="true" onChange={this.handleChange1}>
                    <option value = "tag1">Tag1</option>
                    <option value = "tag2">Tag2</option>
                    <option value = "tag3">Tag3</option>
                </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default PostWrite;