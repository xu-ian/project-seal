import { Link } from "react-router-dom";

const Deliverable = ({ content }) => {

	if(content.mandatory === true){
		return (
			<div className='stream-item'>
				<h3>{content.name}</h3>
				<p>Due Date: {content.duedate}</p>
				<h6>Mandatory!</h6>
				<p>{content.description}</p>
        <Link to={"/assigntest/" + content._id + "/feedback"}>View feedback</Link>
				<br/>
			</div>
		)
	}else{
		console.log(content.mandatory);
		return (
			<div className='stream-item'>
				<h3>{content.name}</h3>
				<p>Due Date: {content.duedate}</p>
				<p>{content.description}</p>
				<br/>
			</div>
		)
	}

}

export default Deliverable
