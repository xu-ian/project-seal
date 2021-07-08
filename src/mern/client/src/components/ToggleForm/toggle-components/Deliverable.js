const Deliverable = ({ content }) => {
	return (
		<div className='stream-item'>
			<h3>{content.name}</h3>
			<p>Due Date: {content.duedate}</p>
			<p>{content.description}</p>
		</div>
	)
}

export default Deliverable
