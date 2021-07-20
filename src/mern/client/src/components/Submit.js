import React from 'react';
import { Paper, Typography, Button, CardMedia } from "@material-ui/core";
import axios from "axios";
import generic from "./assets/img/generic.png";
import pdf from "./assets/img/pdf.png";
import txt from "./assets/img/txt.png";
import word from "./assets/img/word.png";

const path = require('path');

export default class Submit extends React.Component {
    constructor(props){
        super(props);
        this.state={
            files:[],
            attachments:[],
            name:"Assignment", 
            description: "Description",
            course:"Course",
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.displayFiles = this.displayFiles.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:5000/content/"+this.props.match.params.id).then(res =>{
            let course = res.data;
            this.setState({name:course.name, description:course.description});
        })
        .catch();
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
        for(let i = 0; i < files.length; i++){
            let formData = new FormData();
            formData.append("deliverable", files[i]);
            formData.append("course", this.state.course);
            formData.append("assignment", this.state.assignment);
        axios.post("http://localhost:5000/deliverables/upload/single", formData).then(() => {
            alert("File upload successful");
            }).catch( (err) => {
                alert(err);
            });
        }
    }

    displayFiles() {
        let downloadLinks = [];
        let files = this.state.files;
        for(let i = 0; i < this.state.files.length; i++){
            let fileIcon = generic;
            if(files[i].name.split(".").pop() === "docx"){
                fileIcon = word;
            }
            else if(files[i].name.split(".").pop() === "pdf"){ 
                fileIcon = pdf;
            }
            else if(files[i].name.split(".").pop() === "txt"){
                fileIcon = txt;
            }
            downloadLinks.push(
            <Paper style={{left:"4%", margin:"10px", "max-width":"90%", position:"relative"}}>
                <img src={fileIcon} alt="File Icon" style={{width:"3.5%", height:"3.5%"}}/>
                <a href={this.state.files[i].data} style={{"font-size":"200%"}}
                  download={this.state.files[i].name}>
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
                    {this.state.name}
                </Typography>
                <Typography variant="h6">
                    {this.state.description}
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