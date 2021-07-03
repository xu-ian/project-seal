import React, {Component} from 'react';
import qs from 'qs';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const getCoursesData = fetch('http://127.0.0.1:5000/courses').then(res => res.json())
const courseNameExists = (payload, courseName) => payload.map(course => course.name).includes(courseName);
const getCourseObjectIfExists = (payload, courseName) => payload.filter(course => (course.name === courseName))[0];

class CoursePage extends Component {
    constructor(props){
        super();
        const pageURL = String(window.location.href)
        const URLObject = qs.parse(pageURL);
        const values = Object.values(URLObject)
        const defaultName = values[0];
        this.state = {
            courseName: defaultName,
            desc: ""
        };
        this.validCourse = false;
    }

    componentDidMount() {
        getCoursesData.then(result => {
            const payload = result.payload;
            if(payload !== undefined && courseNameExists(payload, this.state.courseName)) {
                this.setState({ validCourse: true });
                const courseObject = getCourseObjectIfExists(payload, this.state.courseName);
                this.setState({ desc: courseObject.desc });
            }
        }).catch(error => {
            console.error(error);
        })
    }

    render() {
        return (
            <div>
                <Link to="/courses"><Button variant="contained">Back</Button></Link>
                {this.state.validCourse ? (
                    <div>
                        <h1>{this.state.courseName}</h1>
                        <Container maxWidth="sm" style={{padding: "25px"}}>
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                                <div style={{padding: "25px"}}>
                                    {this.state.desc}
                                </div>
                            </Typography>
                        </Container>
                    </div>
                ) : (
                    <div>
                        <h1>Course not found</h1>
                        <Container maxWidth="sm" style={{padding: "25px"}}>
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '25vh' }}>
                                <div style={{padding: "25px"}}>
                                    That course name does not exist
                                </div>
                            </Typography>
                        </Container>
                    </div>
                )}
            </div>
        );
    }
}

export default CoursePage;
