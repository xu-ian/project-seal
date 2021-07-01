import React, { useEffect, useState } from "react";
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
function createData(avatar, name, bio) {
    return { avatar, name, bio };
}
const rows = [
    createData('Avatar', 'Nasa', 'we explore the space'),
    createData('Avatar', 'Google', 'Comprehensive search'),
    createData('Avatar', 'Twitter', 'Connet to the world'),
]


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
        // backgroundColor: theme.palette.background.paper,
      },
    inline: { display: 'inline', },
    loadingButton: {
        alignSelf: "center",
        marginLeft: "40%",
    },
    
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
})

const StyledTableRow = withStyles({
    root:{
        margin: "100px",
    }
})(TableRow);



export default function SearchProfile (){
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filter, setFilter] = useState(0);
    let isEnd = false;             //if we have hit the end of data
    let reloadData = false;       //will be true if the user hit on 'Load More Result' button
    
    const [companyProfile, setCompanyProfile] = useState(0);
    

    //This handles searching between companys / users
    const handleFilterValue =(event) => {
        setFilter(event.target.value);
    }
    const handleLoadingRequest=() =>{
        reloadData = true;
    }

    
    
    //gets called first
    useEffect(
        ()=>{
            setRowsPerPage(15);
            setFilter("companys");
            //getting data from the database
            //storing in the local variable
        },[]
    );

    useEffect(
        ()=>{
            //handle loading more data
        },[reloadData]
    )


    //path: /profile/search
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
                        <RadioGroup row aria-label="filter" name="filter" value={filter} defaultValue="companys" onChange={handleFilterValue}> 
                            <FormLabel component="legend" style={styling.formLabel}>Filter</FormLabel>
                            <FormControlLabel value="companys" control={<Radio />} label="Companys" />
                            <FormControlLabel value="users" control={<Radio />} label="Users" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <TableContainer component={Paper} style={{width: "90%"}}>
                    <Table className={classes.table} aria-label="custom pagination table"> 
                        <TableBody className={classes.tableRows}> 
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <StyledTableRow key={row.avatar}>
                                    <TableCell className="avatar" style={{width:"10%"}}>
                                        Avatar
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
                        isEnd 
                        ? <Typography 
                            variant='h6' 
                            style={{textAlign: 'center'}} > 
                                No more result can be found
                            </Typography> 
                        : <Button
                            variant="contained" color="primary" style={styling.loadingButton} onClick={handleLoadingRequest}
                            >
                                Load More Result
                            </Button>
                    }
                </div>


            </Container>
        </div>
    );
    
}