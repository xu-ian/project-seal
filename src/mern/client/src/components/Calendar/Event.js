const Event = ({ content }) => {
	return (
		<div className='event-item'>
			<p>{new Date(content.date).getHours() + ':' + new Date(content.date).getMinutes()}</p>
			<p>{content.name}</p>
		</div>
	)
}

export default Event
