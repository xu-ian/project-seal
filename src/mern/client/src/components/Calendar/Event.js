const Event = ({ content }) => {
	const joinClass = () => {
		window.location.replace('http://localhost:3000/zoomMeetingTest')
	}
	return (
		<div className='event-item'>
			<p>{(new Date(content.date).getHours()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ':' + (new Date(content.date).getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}</p>			
			<p>{content.name}</p>
			{content.zoom_url !== "" ? <button onClick={joinClass}>Join Class</button> : <div></div>}
		</div>
	)
}

export default Event
