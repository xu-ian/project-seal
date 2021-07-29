import React, {Component } from "react";
import axios from 'axios';
import { Avatar, Typography, Container, Grid, TableRow, TableCell, List, ListItemText, ListItemAvatar,
    TableBody, Table, TableHead, Button  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';



export default class ListVideo extends Component{
    constructor(props) {
        super(props);

        this.handleDeleteVideo = this.handleDeleteVideo.bind(this);



        this.state = { 
            videos: [],
        };
    }

    getAllVideos(){
        axios
        .get("http://localhost:5000/videos/")
        .then((response) => {
            this.setState({ videos: response.data });
            // console.log("edit is fetching: " + JSON.stringify(response.data));
        })
        .catch(function (error) { console.log(error); });
    }

    //Initialize
    componentDidMount(){
        this.getAllVideos();
    }


    //Handle deleting a video via filename
    handleDeleteVideo(filename){
        
        const filename_delete = {fileName: filename};
        

        console.log("deleting filename : "+ JSON.stringify(filename_delete));

        // This will send a post request to update the data in the database.
        axios
        .delete(
            "http://localhost:5000/videos/delete/" + filename,
            filename_delete
        )
        .then((res) => console.log(res.data))
        .catch(function (error) { });
        
        
        alert("video deleted");
        window.location.reload();

    }


    render(){
        const StyledTableRow = withStyles({
            root:{ margin: "100px",}
        })(TableRow);
        
        return(
            <div>
                <Container maxWidth="xl" style={{marginTop: "30px"}}>
                    <Grid container >
                        <Typography variant="h4"> Lecture Videos </Typography>
                        <Button style={{ marginLeft: "60%"}} color="primary" variant="outlined" onClick={() => {window.location.href='/videos/upload/'}}> 
                            <Typography variant="h6"> Add video lesson  </Typography> 
                        </Button>
                    </Grid>                     

                    <Table style={{marginTop: "30px"}}> 
                        <TableHead> 
                            <TableCell > <Typography variant="h6"> Title </Typography> </TableCell>
                            <TableCell > <Typography variant="h6">  </Typography> </TableCell>
                            <TableCell > <Typography variant="h6"> Course </Typography> </TableCell>
                            <TableCell > <Typography variant="h6"> Lesson </Typography> </TableCell>
                            <TableCell > <Typography variant="h6">  </Typography> </TableCell>
                        </TableHead>
                        <TableBody> 
                            {this.state.videos.length!==0                                
                                ? this.state.videos.map((video) => (
                                    <StyledTableRow key={video.avatar} >
                                        <TableCell className="avatar" style={{width:"5%"}} 
                                            onClick={() => { window.location.href='http://localhost:3000/player' }}
                                            > 
                                            <Avatar> V </Avatar> 
                                        </TableCell>
                                        <TableCell style={{width:"50%"}}
                                            onClick={() => { window.location.href='http://localhost:3000/player' }}
                                            >
                                            <List >
                                                <ListItemText
                                                    primary={video.title}
                                                    secondary={video.description}
                                                >
                                                </ListItemText>
                                            </List>
                                        </TableCell>
                                        <TableCell> 
                                            <Typography variant="body1"> {video.course} </Typography>
                                        </TableCell>
                                        <TableCell> 
                                            <Typography variant="body1"> {video.lesson} </Typography>
                                        </TableCell>
                                        
                                        <TableCell className="delete-buttom"> 
                                            <DeleteIcon onClick={() => {this.handleDeleteVideo(video.fileName); }}/>
                                        </TableCell>
                                        <TableCell className="edit-buttom"> 
                                            <EditIcon onClick={() => {window.location.href='/videos/edit/' + video._id}}/>
                                        </TableCell>
                                        
                                    </StyledTableRow>
                                ))
                                : <Grid style={{marginLeft:"50%"}}> 
                                    <Typography variant="h5" > No Video Lession </Typography>
                                </Grid>
                            }
                        </TableBody>
                </Table>
                <Grid container style={{marginTop: "10px"}} onClick={() => {window.location.href='/videos/upload/'}}> 
                    <AddCircleIcon fontSize="large"  />
                    <Typography style={{marginLeft: "10px"}}  variant="h6"> Add More Video Lession </Typography>
                </Grid>




                </Container>

            </div>
        )
    }

}