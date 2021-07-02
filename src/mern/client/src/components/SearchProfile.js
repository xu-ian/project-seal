import React, {Component } from "react";
import { Container, Paper, RadioGroup, Radio, FormLabel, 
    FormControlLabel, FormControl, Grid, Typography, 
    Avatar, CssBaseline, List, ListItemText, ListItemAvatar, 
    Divider, Table, TableContainer, TableBody, TableCell, TableHead, 
    TablePagination, TableRow, TableFooter, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/styles';

/* Initial state ––
 *  Info required: Name, Avatar(Logo Image), Tagline
 *  Displayed the first 15 company or less 
 * Search Input ––
 *  query through the database based on name. -> return the first 15 results (if applicable)
 * Buttom at the buttom ––
 *  If the returned returned result =< 15 => 'No more Result can be found'
 *  If the returned returned result > 15 => Buttom to load more result
 * 
*/

// to be deleted upon finish of backend
function createData(avatar, name, bio) { return { avatar, name, bio }; }


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
        fontSize: "1.25rem",
    },
    list: {
        width: '100%',
        maxWidth: '36ch',
        border: "1px solid #0B345C",
      },
    inline: { display: 'inline', },
    loadingButton: {
        alignSelf: "center",
        marginLeft: "40%",
    },
    
}


const StyledTableRow = withStyles({
    root:{ margin: "100px",}
})(TableRow);


export default class SearchProfile extends Component {

    isEnd = false;             //if we have hit the end of data
    reloadData = false;       //will be true if the user hit on 'Load More Result' button
    rowsPerPage = 15;
    page = 0;
    filter = "";



    constructor(props) {
        super(props);

        this.handleFilterValue = this.handleFilterValue.bind(this);
        this.handleLoadingRequest = this.handleLoadingRequest.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);

        
        this.state = { 
            rawLists: [],
            rows: [],
            search: '',
            prevsearch: '',
        };
    }




    // This method will get  data from the database.


    onChangeSearch(e){
        if (typeof e.target.value != 'undefined')
            this.setState({
                search: e.target.value,
                prevsearch: e.target.value
        });
    }

    componentDidMount() {
        if(this.filter === "companys"){
            
            URL="http://localhost:5000/search/listcompanies"
            axios.get(URL)
                .then((response) => {
                    this.setState({ rawLists: response.data });
                    // console.log("Initialization is fetching: " + JSON.stringify(this.state.rawLists));

                    for(let key in this.state.rawLists){
                        var insertData = createData( this.state.rawLists[key].logo, this.state.rawLists[key].company_title, this.state.rawLists[key].tagline );
                        this.state.rows.push(insertData);
                    }
                    console.log("rows are: " + JSON.stringify(this.state.rows));
                })
                .catch(function (error) { console.log(error); 
                });
        }
        else if (this.filter === "users") {
            
            URL="http://localhost:5000/search/listusers"
            axios.get(URL)
                .then((response) => {
                    this.setState({ rawLists: response.data });
                    // console.log("Initialization is fetching: " + JSON.stringify(this.state.rawLists));

                    for(let key in this.state.rawLists){
                        var insertData = createData( this.state.rawLists[key].profileImage, this.state.rawLists[key].username, this.state.rawLists[key].userbio );
                        this.state.rows.push(insertData);
                    }
                    console.log("rows are: " + JSON.stringify(this.state.rows));
                })
                .catch(function (error) { console.log(error); 
                });
            
        }

        //getting data from the database & storing in the local variable
        
    }

    
    //This handles searching between companys / users
    handleFilterValue = (event) => {
        this.filter = (event.target.value);
        console.log("The filter is: " + this.filter);
        this.componentDidMount();
        this.componentDidMount();
        this.render();
    }
    handleLoadingRequest=() =>{
        this.reloadData = true;
    }
    handleSearch=(e) =>{
        e.preventDefault();
        this.onChangeSearch(e);
        if (typeof this.state.search == 'undefined') {
            //do nothing
            this.state.search = this.state.prevsearch;
        }
        if(this.filter === "companys"){
            console.log("search key is : " + this.state.search);
            
            axios.get("http://localhost:5000/search/listcompanies/"+ this.state.search)
                .then((response) => {
                    console.log("http://localhost:5000/search/listcompanies/"+ this.props.match.params.search);
                    this.setState({ rawLists: response.data });
                    // console.log("Initialization is fetching: " + JSON.stringify(this.state.rawLists));

                    for(let key in this.state.rawLists){
                        var insertData = createData( this.state.rawLists[key].logo, this.state.rawLists[key].company_title, this.state.rawLists[key].tagline );
                        this.state.rows.push(insertData);
                    }
                    console.log("searching rows are: " + JSON.stringify(this.state.rows));
                })
                .catch(function (error) { console.log(error); 
                });
        }
        else if (this.filter === "users") {
            
            axios.get("http://localhost:5000/search/listusers/"+ this.state.search)
                .then((response) => {
                    this.setState({ rawLists: response.data });
                    // console.log("Initialization is fetching: " + JSON.stringify(this.state.rawLists));

                    for(let key in this.state.rawLists){
                        var insertData = createData( this.state.rawLists[key].profileImage, this.state.rawLists[key].username, this.state.rawLists[key].userbio );
                        this.state.rows.push(insertData);
                    }
                    console.log("rows are: " + JSON.stringify(this.state.rows));
                })
                .catch(function (error) { console.log(error); 
                });
            
        }
        // this.componentDidMount();
        // this.render();
    }


    

    //path: /profile/search
    render() {
        return(
            <div className ="root">
                <CssBaseline />
                <Container maxWidth="lg">
                    <form onSubmit={this.handleSearch}>
                    <Paper className="search-bar" style ={styling.searchBar} >
                        <IconButton type="submit" className={styling.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            className={styling.input}
                            placeholder="Search..."
                            style={{width: "500px"}}
                            value={this.state.search}
                            onChange={this.onChangeSearch}

                        />
                    </Paper>
                    </form>
                    <Grid className="filter-container" style={styling.filterContainer}>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="filter" name="filter" value={this.filter} defaultValue="companys" onChange={this.handleFilterValue}> 
                                <FormLabel component="legend" style={styling.formLabel}>Filter</FormLabel>
                                <FormControlLabel value="companys" control={<Radio />} label="Companys" />
                                <FormControlLabel value="users" control={<Radio />} label="Users" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
    
                    <TableContainer component={Paper} style={{width: "90%"}}>
                        <Table className="{this.classes.table}" aria-label="custom pagination table"> 
                            <TableBody className="{this.classes.tableRows}"> 
                                {(this.rowsPerPage > 0
                                    ? this.state.rows.slice(this.page * this.rowsPerPage, this.page * this.rowsPerPage + this.rowsPerPage)
                                    : this.state.rows
                                ).map((row) => (
                                    <StyledTableRow key={row.avatar}>
                                        <TableCell className="avatar" style={{width:"10%"}}>
                                            <Avatar> {row.name} </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <List >
                                                <ListItemText
                                                    primary={row.name}
                                                    secondary={row.bio}
                                                >
                                                </ListItemText>
                                            </List>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="loading-more" style={{marginTop: '30px'}}>
                        {
                            !this.isEnd 
                            ? <Typography 
                                variant='h6' 
                                style={{textAlign: 'center'}} > 
                                    No result can be found
                                </Typography> 
                            : <Button
                                variant="contained" color="primary" style={styling.loadingButton} onClick={this.handleLoadingRequest}
                                >
                                    Load More Result
                                </Button>
                        }
                    </div>
                </Container>
                {this.state.rows=[]}
            </div>
        );
    }

}




// function SearchProfile (){
//     const classes = useStyles2();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
//     // const [row, setRow] = useState(0);  //{ name: '', bio: '', avatar: '' }

    
// }