import React, { Component, useHistory } from "react";
import { Container, Link, Button, Grid, Typography, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export default class ProfilePage extends Component{
    

    



    //render the path: /profile/create
    render(){
        //Styling
        const StyledButton = withStyles({
            root:{
                fontSize: "2.5rem",
                margin: "20px",
                background: "#fff",
                padding: "40px",
            }
        })(Button);
        const styledGridConatainer = {
            display: "grid",
            gridTemplateColumns: "auto auto",
            padding: "10px",
            marginTop: "50px",
        }
        const styledLink = {
            float: "right",
            width: "300px",
            alignSelf: "right",
            fontSize: "1.5rem",
            textDecoration: "none",
        }
        
        return(
            <div className ="root">
                <CssBaseline />
                <Container maxWidth="lg">
                    <Grid item xs={12} style={{marginTop: "60px"}}>
                        <Typography variant="h3" style={{fontFamily: "Arial"}}> I want to create my...</Typography>
                    </Grid>
                    <Grid style={styledGridConatainer}>
                        <Grid style={{border: "1px solid #0B345C"}, {borderRadius: "5%"}}> 
                            <Typography variant="h6" style={{position: "relative"}, {right: "10px"}}>As Startup, Investor, Or Instructor ––</Typography>
                            <StyledButton variant="outlined" color="primary" href="/user-profile/create"> User Profile </StyledButton>
                        </Grid>
                        <Grid style={{border: "1px solid #0B345C"}, {borderRadius: "5%"}}> 
                            <Typography variant="h6" style={{position: "relative"}, {right: "10px"}}> As Startup –– </Typography>
                            <StyledButton variant="outlined" color="secondary" href="/company-profile/create"> Company Profile </StyledButton>
                        </Grid>
                    </Grid>
                    <Grid> <Link href= "/posts/" style={styledLink}> Or...Skip this step first</Link> </Grid>
                </Container>
            </div>
        )
    }
}