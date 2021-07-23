const Deliverable = ({ content }) => {
	if(content.mandatory === 1){
		return (
			<div className='stream-item'>
				<h3>Mandatory!</h3>
				<h3>{content.name}</h3>
				<p>Due Date: {content.duedate}</p>
				<p>{content.description}</p>
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
