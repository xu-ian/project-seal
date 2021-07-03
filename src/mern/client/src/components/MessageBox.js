import React from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, IconButton, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

export default class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            body: this.props.body,
            date: this.props.date,
            changed: this.props.change,
            mine: this.props.mine,
            modifying:"false"
        }
        this.getChanged = this.getChanged.bind(this);
        this.returnEdit = this.returnEdit.bind(this);
        this.modify = this.modify.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendChange = this.sendChange.bind(this);
        this.returnMine = this.returnMine.bind(this);
    }

    getChanged() {
        if (this.state.changed === true) {
            return "(Edited)";
        }
        return "";
    }

    returnEdit(){
        if(this.state.modifying === "false" & this.state.mine === true){
            return(
                <IconButton style={{float:"right", position:"relative"}}
                  onClick={() => {this.setState({modifying:"true"})}}>
                    <EditIcon/>
                </IconButton>
            );
        }
        return(<div></div>);
    }

    modify(){
        if(this.state.modifying === "false"){
            return(<div><Typography variant="h6" component="p">
            {this.state.body}
        </Typography>
        <Typography color="textSecondary" variant="body1" component="p">
            {this.state.date}
            {this.getChanged()}
        </Typography>
        </div>);
        }
        else{
        return(<div><TextField multiline id="outlined-basic" placeholder="Write your message here"
        style={{ width: "80%", position: "relative" }}
        onChange={this.handleChange} value={this.state.body}/>
      <Button size="large" variant="contained"
        style={{ top: "50%", left: "1%", position: "relative" }}
        onClick={this.sendChange}>
          <DoneIcon />
      </Button></div>);
        }
    }

    sendChange(){
        this.setState({modifying:"false", changed:"true"});
        axios.post("http://localhost:5000/messages/updateMessage/"+this.state.id 
        + "/" + this.state.body).then().catch(
            (err) => {alert(err)}
          );
    }

    handleChange(event){
        this.setState({body:event.target.value});
    }

    returnMine() {
        if (this.state.mine === true) {
            return (
                <Card className="MessageBox" style={{
                    backgroundColor: "lightblue",
                    "word-wrap": "break-word"
                }}>
                    <CardContent>
                        {this.modify()}
                        {this.returnEdit()}
                    </CardContent>
                </Card>
            );
        }
        return (
            <Card className="MessageBox" style={{
                backgroundColor: "grey",
                "word-wrap": "break-word"
            }}>
                <CardContent>
                    {this.modify()}
                </CardContent>
            </Card>
        );
    }

    render() {
        return (
            <div>
                {this.returnMine()}
            </div>
        );
    }
}
