import React, {Component} from 'react';
import Sidebar from '../SideBar';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Courses extends Component {
    render() {
        return (
            <Sidebar>
                <h1>Courses</h1>
                <Container maxWidth="sm" style={{padding: "25px"}}>
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                        <div style={{padding: "25px"}}>
                            <h2>Course1</h2>
                            Course 1 description
                        </div>
                    </Typography>
                </Container>
                <Container maxWidth="sm" style={{padding: "25px"}}>
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                        <div style={{padding: "25px"}}>
                            <h2>Course2</h2>
                            Course 2 description
                        </div>
                    </Typography>
                </Container>
            </Sidebar>
        );
    }
}

export default Courses;