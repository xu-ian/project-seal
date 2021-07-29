import React, {Component } from "react";
import axios from 'axios';
import { Typography, Container, Grid, TextField, InputLabel, Button } from '@material-ui/core';



export default class EditVideo extends Component{
    constructor(props) {
        super(props);


        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getVideoInfo = this.getVideoInfo.bind(this);


        this.state = { 
            title: "",
            course: "",
            description: "",
            lesson: "",
        };
    }


    //Get video info
    getVideoInfo(){
        axios.get("http://localhost:5000/videos/?_id:" + this.props.match.params.id)
        .then((response) => {  
          this.setState({
            title: response.data[0].title,
            course: response.data[0].course,
            description: response.data[0].description,
            lesson: response.data[0].lesson,

          });
        //   console.log("edit is fetching: " + JSON.stringify(response.data));
        //   console.log("edit is fetching: " + response.data[0].title);
          // console.log("the id is: " + this.props.match.params.id);
        //   console.log("title: ", this.state.title);
        })
        .catch(function (error) {console.log(error);});

    }

    //Initialize
    componentDidMount(){
        this.getVideoInfo();
    }

    //This seciton handles the form changes
    onChangeTitle(e){
        this.setState({ title: e.target.value, });
    }
    onChangeDescription(e){
        this.setState({ description: e.target.value, });
    }



    // This function will handle the submission.
    handleSubmit(e) {
        e.preventDefault();
        

        const EditVideo = {
            // user_id: this.state.user_id,
            title: this.state.title,
            description: this.state.description,
        };
        // console.log(EditVideo);


        // This will send a post request to update the data in the database.
        axios
        .post(
            // "http://localhost:5000/videos/upload/single/",
            EditVideo
        )
        .then((res) => console.log(res.data))
        .catch(function (error) {});


        window.location.href = "/videos/list";
    }
    

    render(){
        return(
            <div>
                <Container  maxWidth="lg">
                    <Typography variant="h3" style={{margin: "1rem 0.5rem 1rem 35%"}}>Edit Video Detail</Typography>

                    <form id="user-form" onSubmit={this.handleSubmit} style={{marginTop:"20px"}}>
                        <Grid item id="title-wrapper"> 
                            <InputLabel required shrink> Title </InputLabel>
                            <TextField fullWidth
                            className="user-form-group"
                            style={{marginBottom:"20px"}}
                            required
                            defaultValue = {this.state.title}
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            > </TextField>
                        </Grid>
                                               
                        <Grid container id="course-lesson-wrapper" xs={12}>
                            <Grid item xs={5.9} > 
                                <InputLabel required shrink> Course </InputLabel>
                                <TextField fullWidth
                                className="user-form-group"
                                style={{marginBottom:"20px"}}
                                disabled
                                placeholder= "Select an avaliable course"
                                defaultValue = {this.state.course}
                                value={this.state.course}
                                > </TextField>
                            </Grid>
                            <Grid item xs = {0.2}> </Grid>
                            <Grid item xs={5.9}> 
                                <InputLabel required shrink> Lesson </InputLabel>
                                <TextField fullWidth
                                className="user-form-group"
                                style={{marginBottom:"20px"}}
                                disabled
                                placeholder= "Provide Lesson Name"
                                defaultValue = {this.state.lesson}
                                value={this.state.lesson}
                                > </TextField>
                            </Grid>

                        </Grid>
                        
                        <Grid item id="description-wrapper"> 
                            <InputLabel required shrink> Description </InputLabel>
                            <TextField fullWidth
                            className="user-form-group"
                            style={{marginButtom:"20px"}}
                            required multiline
                            placeholder= "Enter description for the video upload"
                            defaultValue = {this.state.description}
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            > </TextField>
                        </Grid>
                        

                        <Button style={{marginTop: "20px", marginLeft: "40%"}} variant="contained" color="primary" type="submit">
                            Submit Changes
                        </Button>
                    </form>




                </Container>

            </div>
        )
    }

}