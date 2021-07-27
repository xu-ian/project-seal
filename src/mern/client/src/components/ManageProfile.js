import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { Avatar, Typography, Container, Grid, AccordionSummary, Accordion, AccordionDetails, Paper,
    ListItemAvatar, ListItem , Button   } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BusinessIcon from '@material-ui/icons/Business';


let static_currentUserID= localStorage.getItem('userId');
function createData(avatar, name, _id) { return { avatar, name, _id }; }


export default class ManageProfile extends Component {
    constructor(props) {
        super(props);
    
        this.getUserCompanies = this.getUserCompanies.bind(this);
        this.getComapanyInfo = this.getComapanyInfo.bind(this);

        
        this.state = {
            currentUserID: static_currentUserID,
            companyLists: [],
        };
    }


    //this gets information () from desired company through _id and store in [] through create()
    getComapanyInfo(company_id){
        axios.get("http://localhost:5000/company-profile/?_id:" + this.props.match.params.id)
          .then((response) => {
            const companyLists = response.data;
            const currentCompany = companyLists.find(person => person._id === company_id);
            
            //inserting it into the company lists. 
            var insertData = createData( currentCompany.logo, currentCompany.company_title, currentCompany._id );
            console.log("data is: " + JSON.stringify(insertData));

            this.setState({companyLists: this.state.companyLists.concat([insertData]) })

          })
          .catch(function (error) {console.log(error);});
    }

    //gets companies (As list) from the current login user
    getUserCompanies(){
        axios.get("http://localhost:5000/user-profile/?_id:" + this.props.match.params.id)
        .then((response) => {
            const userLists = response.data;
            const currentUser = userLists.find(person => person._id === this.props.match.params.id);
            let rawCompanyLists = [];
            rawCompanyLists= currentUser.companies;

            //Storing raw[] into this.state through calling getComapanyInfo()
            for(let key in rawCompanyLists){ this.getComapanyInfo(rawCompanyLists[key]); }
        })
        .catch(function (error) { console.log(error); });
    }


    //Initialization
    componentDidMount(){
        this.getUserCompanies();
    }


    //reders "/profile/manage/:id"
    render(){
        return(
            <div> 
                <Container  maxWidth="lg"> 
                    <Typography variant="h3" style={{margin: "1rem 0.5rem 1rem 0.5rem"}}> Manage Profiles</Typography>

                    <Paper style={{marginBottom: "1rem"}}>
                        <ListItem onClick={() => {window.location.href='/user-profile/view/' + this.state.currentUserID} }>
                            <ListItemAvatar>
                                <AccountBoxIcon style={{ fontSize: 50 }} color="primary"/>    
                            </ListItemAvatar>
                            <Typography variant="h5"> Manage My User Profile</Typography>
                        </ListItem>
                    </Paper>
                    

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <ListItem>
                                <ListItemAvatar> <BusinessIcon style={{ fontSize: 50 }} color="primary"/> </ListItemAvatar>
                                <Typography variant="h5"> Manage Company Profile</Typography>
                            </ListItem>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={3}> 
                                {
                                    this.state.companyLists.length!==0                                
                                    ? this.state.companyLists.map((company) => (
                                        <Grid item xs={12} style={{marginLeft: "2rem"}}>
                                            <Grid container > 
                                                <Grid item style={{marginRight: "2rem"}} onClick={() => {window.location.href='/company-profile/view/' + company._id} } > <Avatar > {company.name} </Avatar></Grid>
                                                <Grid item > <Typography variant="h5" onClick={() => {window.location.href='/company-profile/view/' + company._id} } > {company.name}  </Typography> </Grid>
                                                <Grid itm  xs={6} onClick={() => {window.location.href='/company-profile/view/' + company._id} }> </Grid>
                                                <Grid item > <Button variant="outlined" color="primary" onClick={() => {window.location.href='/company-profile/edit/' + company._id} }> Edit </Button> </Grid>
                                            </Grid>
                                        </Grid>
                                    ))
                                    : <Grid style={{marginLeft:"50%"}}> 
                                        <ListItemAvatar> 
                                            <AddCircleIcon style={{ fontSize: 50 }} color="primary" onClick={() => {window.location.href='/company-profile/create/'}}/> 
                                        </ListItemAvatar>
                                    </Grid>
                                }

                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </div>
        )
    }

}
