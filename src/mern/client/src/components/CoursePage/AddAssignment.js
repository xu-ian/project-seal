import react from 'react';
import axios from 'axios';
import {Paper, Typography, Button} from '@material-ui/core';


export default class AddAssignment extends react.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            duedate: "",
            description: "",
            attachments: [],
        };
        this.writeSubject = this.writeSubject.bind(this);
        this.setDate = this.setDate.bind(this);
        this.writeDescription = this.writeDescription.bind(this);
        this.setAttachments = this.setAttachments.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    writeSubject(event){
        this.setState({name: event.target.value});
    }

    setDate(event){
        this.setState({duedate: event.target.value});
    }

    writeDescription(event){
        this.setState({description: event.target.value});
    }

    setAttachments(event){
        this.setState({attachments: event.target.value});
    }

    onSubmit(){
        axios.post("http://localhost:5000/content/add/"+this.props.cid +"/"
        +this.props.fid, this.state);
        window.location.reload();
    }

    render(){
        return (
            <form id="deliverable-form" onSubmit={this.onSubmit}>
            <div className="form-control">
					<label className="header">Subject:</label>
					<input type="text" className="tbtn-input" placeholder="Subject" 
                      value={this.state.name} onChange={this.writeSubject} required/>
				</div>
				<div className="form-control">
					<label className="header">Due Date:</label>
					<input type="date" className="tbtn-input" 
                      value={this.state.duedate} onChange={this.setDate} required/>
				</div>
				<div className="form-control">
					<label className="header">Description:</label>
					<br/>
					<textarea id="description" placeholder="Description" 
                      value={this.state.description} onChange={this.writeDescription} required/>
				</div>
				<div className="form-control">
					<label className="header">Select All Attachments</label>
					<input type="file" id="attachments" className="tbtn-input"
                      value={this.state.attachments} 
                      onChange={this.setAttachments} multiple/>
				</div>
                <input type="submit" id="assign" value="Assign Deliverable" className="btn"/>
            </form>);
    }

}