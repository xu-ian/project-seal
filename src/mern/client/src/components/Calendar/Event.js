const Event = ({ content }) => {
	return (
		<div className='event-item'>
			<p>{(new Date(content.date).getHours()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ':' + (new Date(content.date).getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}</p>			
			<p>{content.name}</p>
		</div>
	)
}

export default Event
