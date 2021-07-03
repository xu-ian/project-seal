import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";

class Courses extends Component {
    render() {
        return (
            <div>
                <h1>Courses</h1>
                <Link to="/coursepage?name=Course1">
                    <Container maxWidth="sm" style={{padding: "25px"}}>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                            <div style={{padding: "25px"}}>
                                <h2>Course1</h2>
                                Course 1 description
                            </div>
                        </Typography>
                    </Container>
                </Link>
                <Link to="/coursepage?name=Course2">
                    <Container maxWidth="sm" style={{padding: "25px"}}>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                            <div style={{padding: "25px"}}>
                                <h2>Course2</h2>
                                Course 2 description
                            </div>
                        </Typography>
                    </Container>
                </Link>
            </div>
        );
    }
}

export default Courses;