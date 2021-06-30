import React, { Component } from "react";
import { Container, Paper, RadioGroup, Radio, FormLabel, 
    FormControlLabel, FormControl, Grid, Typography, 
    Avatar, CssBaseline, List, ListItem, ListItemText, ListItemAvatar, 
    Divider, Table, TableContainer, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';  //this communicates with backend


const CompanyProfile = (props) => (
    <tr>
        <td>{props.record.company_title}</td>
        <td>{props.record.tagline}</td>
        <td>{props.record.description}</td>
        <td>{props.record.emailAddress}</td>
        <td>{props.record.links}</td>
        <td>{props.record.logo}</td>
        <td>{props.record.members}</td>
        
    </tr>
);


export default class SearchProfile extends Component{
    constructor(props) {
        super(props);
        this.handleFilterValue = this.handleFilterValue.bind(this);
        this.state = {
            filterValue: "",
            companyProfile: [],
        };
    }
    handleFilterValue(e) {
        this.setState({
            filterValue: e.target.value,
        });
    }

        // This method will get the data from the database.
    componentDidMount() {
        axios
        .get("http://localhost:5000/company-profile/")
        .then((response) => {
            this.setState({ companyProfile: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // This method will map out the users on the table
    companyProfileList() {
        return this.state.companyProfile.map((currentcompanyprofile) => {
            return (
                <CompanyProfile 
                    record={currentcompanyprofile}
                    key={currentcompanyprofile._id}
                />
            );
        });
    }


    //render the path: /profile/search
    render(){
        //styling
        const styling = {
            searchBar: {
                marginTop: "30px",
                padding: '3px 4px',
                display: 'flex',
                alignItems: 'center',
            },
            input: {
                marginLeft: "10px",
                flex: 1,
            },
            iconButton: { padding: 10, },
            filterContainer:{ marginTop: "30px",},
            formLabel:{
                margin: "10px",
                fontSize: "1.5rem",
            },
            list: {
                width: '100%',
                maxWidth: '36ch',
                border: "1px solid #0B345C",
                // backgroundColor: theme.palette.background.paper,
              },
            inline: {
                display: 'inline',
            },
            
        }
        const tableStyling ={
            root: {
                width: '100%',
            },
            container: {
                maxHeight: 440,
            },
        }

        return(
            <div className ="root">
                <CssBaseline />
                <Container maxWidth="lg">
                    <Paper component="form" className="search-bar" style ={styling.searchBar}>
                        <IconButton type="submit" className={styling.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            className={styling.input}
                            placeholder="Search..."
                            inputProps={{ }} 
                        />
                    </Paper>
                    <Grid className="filter-container" style={styling.filterContainer}>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="filter" name="filter" defaultValue="all" value={this.value} onChange={this.handleFilterValue}> 
                                <FormLabel component="legend" style={styling.formLabel}>Filter</FormLabel>
                                <FormControlLabel value="all" control={<Radio />} label="All" />
                                <FormControlLabel value="users" control={<Radio />} label="Users" />
                                <FormControlLabel value="companys" control={<Radio />} label="Companys" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>company_title</th>
                                <th>tagline</th>
                                <th>description</th>
                                <th>emailAddress</th>
                                <th>logo</th>
                                <th>links</th>
                                <th>members</th>
                            </tr>
                        </thead>
                        <tbody>{this.companyProfileList()}</tbody>
                    </table>
                    
                    {this.companyProfileList().company_title}


                </Container>
            </div>
        );
    }
}