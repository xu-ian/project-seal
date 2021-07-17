import Event from './Event'
const EventsList = ({ events }) => {
	return (
		<div className="events-list">
			{events.map((content) => (
				<Event key={content._id} content={content}></Event>
			))}
		</div>
	)
}

export default EventsList