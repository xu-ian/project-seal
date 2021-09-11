import { Link } from "react-router-dom";

const Deliverable = ({ content }) => {
	return (
		<div className='stream-item'>
			<h3>{content.name}</h3>
			<p>Due Date: {content.duedate}</p>
			<p>{content.description}</p>
			<Link to={"/assigntest/" + content._id + "/feedback"}>View feedback</Link>
		</div>
	)
}

export default Deliverable
