import React, {Component } from "react";
import axios from 'axios';
import { Avatar, Typography, Container, Grid, TextField, InputLabel, Button } from '@material-ui/core';
import Dropzone from 'react-dropzone'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';



export default class UploadVideo extends Component{
    constructor(props) {
        super(props);


        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.onChangeLesson = this.onChangeLesson.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);



        this.state = { 
            title: "",
            course: "",
            description: "",
            lesson: "",
            videoUpload: "",

        };
    }


    //Get avaliable courses
    getCourses(){
        //Blocker. Missing required backend endpoint. Need to be impletment after that.

    }


    //Initialize
    componentDidMount(){
        this.getCourses();
    }

    //This seciton handles the form changes
    onChangeTitle(e){
        this.setState({ title: e.target.value, });
    }
    onChangeCourse(e){
        this.setState({ course: e.target.value, });
    }
    onChangeLesson(e){
        this.setState({ lesson: e.target.value, });
    }
    onChangeDescription(e){
        this.setState({ description: e.target.value, });
    }

    
    //
    onDrop(files){
        let file = files[0];

        this.setState({ videoUpload: file, });

        // console.log(files[0]);


        // console.log(this.state.videoUpload);
        


    }




    // This function will handle the submission.
    handleSubmit(e) {
        e.preventDefault();



        const newUploadVideo = {
            // user_id: this.state.user_id,
            title: this.state.title,
            course: this.state.course,
            description: this.state.description,
            lesson: this.state.lesson,
            videoUpload: this.state.videoUpload,
        };
        console.log(this.state.videoUpload);

        // This will send a post request to update the data in the database.
        axios
        .post(
            "http://localhost:5000/videos/upload/single/",
            newUploadVideo
        )
        .then((res) => console.log(res.data))
        .catch(function (error) {
        });
        
    }

    

    render(){


        
        return(
            <div>
                <Container  maxWidth="lg">
                    <Typography variant="h3" style={{margin: "1rem 0.5rem 1rem 35%"}}>Upload Video</Typography>

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
                                required
                                placeholder= "Select an avaliable course"
                                defaultValue = {this.state.course}
                                value={this.state.course}
                                onChange={this.onChangeCourse}
                                > </TextField>
                            </Grid>
                            <Grid item xs = {0.2}> </Grid>
                            <Grid item xs={5.9}> 
                                <InputLabel required shrink> Lesson </InputLabel>
                                <TextField fullWidth
                                className="user-form-group"
                                style={{marginBottom:"20px"}}
                                required
                                placeholder= "Provide Lesson Name"
                                defaultValue = {this.state.lesson}
                                value={this.state.lesson}
                                onChange={this.onChangeLesson}
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
                        
                        <Grid container id="video-wrapper" style={{marginTop: "50px"}}>
                            <Dropzone required item 
                                multiple={false}
                                maxSize={800000000}
                                onDrop={(acceptedFiles) => {this.onDrop(acceptedFiles); }}
                                // onDrop={acceptedFiles => console.log(acceptedFiles)}  
                                >
                                
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <AddCircleOutlineIcon item fontSize="large" style={{fontSize: "4rem"}} />

                                            <input {...getInputProps()} />
                                            <p>click to select files to upload</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </Grid>

                        <Button style={{marginTop: "20px", marginLeft: "40%"}} variant="contained" color="primary" type="submit">
                            Create Video Lession 
                        </Button>
                    </form>




                </Container>

            </div>
        )
    }

}