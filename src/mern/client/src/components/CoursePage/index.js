import React, {Component} from 'react';
import Sidebar from '../SideBar';
import axios from 'axios';
import qs from 'qs';

// const getCourseData = axios.get('localhost:3000/courses')
const getCourseData = new Promise((resolve, reject) => resolve({
    status: 200,
    payload: [
        { name: 'Course1', desc: 'Course1 description here' },
        { name: 'Course2', desc: 'Course2 description here' }
    ]
}));

const courseNameExists = (payload, courseName) => payload.map(course => course.name).includes(courseName);
const getCourseObjectIfExists = (payload, courseName) => payload.filter(course => (course.name === courseName))[0];

class CoursePage extends Component {
    constructor(props){
        super();
        this.name = qs.parse(props.location.search, { ignoreQueryPrefix: true }).name;
        this.desc = "";
        this.validCourse = false;
    }

    componentDidMount() {
        getCourseData.then(result => {
            const payload = result.payload
            
            if(courseNameExists(payload, this.name)) {
                this.setState({ validCourse: true });
                const courseObject = getCourseObjectIfExists(payload, this.name);
                this.setState({ desc: courseObject.desc });
                console.log(this)
            }
        }).catch(error => {
            console.error(error);
        })
    }

    render() {
        return (
            <Sidebar>
                {this.validCourse ? (
                    <div>
                        <h1>{this.name}</h1>
                        {this.desc}
                    </div>
                ) : (
                    <div>
                        <h1>Course not found</h1>
                        That course name does not exist
                    </div>
                )}
            </Sidebar>
        );
    }
}

export default CoursePage;
