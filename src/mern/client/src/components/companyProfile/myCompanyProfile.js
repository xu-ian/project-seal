import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';  //this communicates with backend
import { Paper, Avatar, Typography, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import './my-company-profile-style.css';

export default class MyCompanyProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            company_title: "",
            tagline: "", 
            description: "", 
            emailAddress: "",   
            logo: "",           //image to be uploaded
            links: [],          //to be developed (detacting the link)
            members: "",         //to (search feature needed)
        };
    }

  // This will get the record based on the id from the database.
    componentDidMount() {
        axios.get("http://localhost:5000/company-profile/?_id:" + this.props.match.params.id)
        .then((response) => {
            const companyLists = response.data;
            const currentCompany = companyLists.find(person => person._id === this.props.match.params.id);

            this.setState({
            company_title: currentCompany.company_title,
            tagline: currentCompany.tagline,
            description: currentCompany.description,
            emailAddress: currentCompany.emailAddress,
            logo: currentCompany.logo,
            links: currentCompany.links,
            members: currentCompany.members,
            });
            // console.log("edit is fetching: " + JSON.stringify(response.data));
            // console.log("edit is fetching: " + response.status);
            // console.log("the id is: " + this.props.match.params.id);
            console.log("the desired is: " + JSON.stringify(currentCompany));
            // console.log("company title: ", this.state.company_title);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    


    render(){

        const Item = styled(Paper)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        }));
        return(
            <div className="container">
                <div className="banner-wrapper">
                    <Container  disableGutters maxWidth="md" component="main" sx={{ pt: 8 }}>
                        <Typography
                            variant="h4"
                            align="left"
                            color="text.primary"
                            gutterBottom
                            style={{marginBottom: "5%"}}
                        > Company Profile </Typography>
                        <Typography gutterBottom>
                            <div id="logo-grid" className="grid-wrapper"> 
                                <Avatar sx={{ width: 80, height: 80 }} >L</Avatar>
                                <div>
                                    <div className = "company-title"> {this.state.company_title} </div>
                                    <div className = "tagline"> {this.state.tagline} </div>
                                </div>
                            </div>
                        </Typography>
                    </Container>
                </div>
                {/* Profile Content */}
                <div spacing={2} className="profile-wrapper">                         
                    <Item className="block-group" style={{padding: "20px"}}>
                        <Typography className="text-title" variant="h5" > About: </Typography>
                        <Typography className="text-wrapper" variant="h6" style={{marginLeft: "5%"}}> {this.state.description} </Typography>
                    </Item>
                    <Item className="block-group" style={{padding: "20px"}}> 
                        <div className="grid-wrapper"> 
                            <Typography style={{margin: "10px"}} gutterBottom>
                                <Typography variant="h6" > Email: </Typography>
                                <Typography variant="subtitle1" style={{marginLeft: "10%"}}> {this.state.emailAddress} </Typography>
                                 
                            </Typography>
                            <Typography style={{margin: "10px"}} gutterBottom>
                                <Typography variant="h6"> Links: </Typography>
                                <Typography variant="subtitle1" style={{marginLeft: "10%"}}> {this.state.links} </Typography>
                            </Typography>
                            
                        </div>
                    </Item>
                    <Item className="block-group" style={{padding: "20px"}} > Teams </Item>
                </div>
            </div>
        )
    }
}