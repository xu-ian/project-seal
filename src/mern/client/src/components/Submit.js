import React from 'react';
import { Paper, Typography, Button } from "@material-ui/core";
import axios from "axios";

export default class Submit extends React.Component {
    constructor(props){
        super(props);
        this.state={
            files:[]
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.displayFiles = this.displayFiles.bind(this);
    }

    onChange(event){
        let filelist = event.target.files;
        let datalist = [];
        let readerlist = [];
        let reader = new FileReader();
        for(let i = 0; i < filelist.length; i++){
            reader = new FileReader();
            readerlist.push(reader);
            datalist.push({name:filelist[i].name, data:""});
        }
        for(let i = 0; i < filelist.length; i++){
            readerlist[i].onload = () => {
                datalist[i].data = readerlist[i].result;
                this.setState({files:datalist});
            }
        }
        for(let i = 0; i <filelist.length; i++){
            readerlist[i].readAsDataURL(filelist[i]);
        }
    }

    onClick() {
        let files = document.getElementById("myFile").files;
        if(files.length === 0 && 
          window.confirm("Are you sure you want to submit no files?") === false){
              return;
        }
        //Not completed yet.
        axios.post("/update/single", files).then(() => {
            alert("File upload successful");
        }).catch( () => {
            alert("File upload failed");
        });

    }

    displayFiles() {
        let downloadLinks = [];
        for(let i = 0; i < this.state.files.length; i++){
            downloadLinks.push(
            <Paper style={{left:"4%", margin:"10px", "max-width":"90%", position:"relative"}}>
                <a href={this.state.files[i].data} download={this.state.files[i].name}>
                    {this.state.files[i].name}
                </a>
            </Paper>
            );
        }
        return downloadLinks;    
        
    }

    render(){
        if(true){
        return(
            <Paper style={{width:"90%", left:"4%", margin:"10px", position:"relative"}}>
                <Typography variant="h2">
                    Assignment Title.
                </Typography>
                <Typography variant="h6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <input style={{width:"90%"}} type ="file" id="myFile" name="filename" multiple
                  onChange={this.onChange}/>
                {this.displayFiles()}
                <Button size="large" variant="contained" onClick={this.onClick}
                  style={{margin:"10px", position:"relative", left:"45%"}}>
                Submit
                </Button>
            </Paper>
        );
        }
        else{
            return(<div/>);
        }
    }
}