const Deliverable = ({ content }) => {
	return (
		<div className='contentStream'>
			<h3>{content.name}</h3>
			<p>{content.duedate}</p>
			<p>{content.description}</p>
		</div>
	)
}

export default Deliverable
