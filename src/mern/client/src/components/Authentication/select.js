import React from 'react';
import { useHistory } from "react-router-dom";
import '../styling.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// import { withStyles } from '@material-ui/core/styles';
// import 'fontsource-roboto';
// import Typography from '@material-ui/core/Typography';
 


const Select = () => {

  // button styling
  // const ButtonStyle = withStyles({
  //   root: {
  //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //     borderRadius: 5,
  //     border: 0,
  //     color: 'white',
  //     height: 100,
  //     fontSize: 30,
  //     width: 300,
  //     padding: '0px 30px',
  //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   },
  //   label: {
  //     textTransform: 'capitalize',
  //   },
  // })(Button);

  let history = useHistory();

  function toLogin() {
    history.push("/signin");  // go to sign in page
  }

  function toSignup() {
    history.push("/signup");  // go to sign up page
  }

  return (

    <div className="container">
      {/* Heading */}
      <h1 className="heading">
        African Impact Challenge
      </h1>

      {/* Two buttons */}
      <ButtonGroup>
        <Button variant="contained" size="large" color="primary" onClick={toLogin}>
          Sign In
        </Button>
        <Button variant="contained" size="large" color="secondary" onClick={toSignup}>
          Sign Up
        </Button>       
      </ButtonGroup>
    </div>
  );
};

export default Select;