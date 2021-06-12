import PropTypes from 'prop-types'
import React from "react"


const Header = ({ title }) =>{
    return(
        <header>
            <h1 style={{color: 'red'}}>{title}</h1>
        </header>
    )
}

Header.defultProps = {
    title: 'Task Tracker',
}
Header.protoType = {
    title: PropTypes.string.isRequired,
}

//css in js
// const headingStyle = {
//     color: 'red',
//     backgroudcolor: 'black',
// }

export default Header