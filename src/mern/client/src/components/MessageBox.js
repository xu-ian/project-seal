import React from 'react';
import {Typography, Card, CardContent} from '@material-ui/core';

export default class MessageBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            body:this.props.body,
            date:this.props.date,
            changed:this.props.change,
            mine:this.props.mine
        }
        this.getChanged = this.getChanged.bind(this);
        this.returnMine = this.returnMine.bind(this);
    }

    getChanged(){
        if(this.state.changed === "true"){
            return "(Edited)";
        }
        return "";
    }

    returnMine(){
        if(this.state.mine === "true"){
            return(
                <Card className="MessageBox" style={{backgroundColor:"lightblue", 
                  "word-wrap":"break-word"}}>
                    <CardContent>
                        <Typography variant="h6" component="p">
                            {this.state.body}
                        </Typography>
                        <Typography color="textSecondary" variant="body1" component="p">
                            {this.state.date}
                            {this.getChanged()}
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
        return(
            <Card className="MessageBox" style={{backgroundColor:"grey",
              "word-wrap":"break-word"}}>
                <CardContent>
                    <Typography variant="h6" component="p">
                        {this.state.body}
                    </Typography>
                    <Typography color="textSecondary" variant="body1" component="p">
                        {this.state.date}
                        {this.getChanged()}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    render(){
      return(
          <div>
            {this.returnMine()}
          </div>
        );
    }
}
