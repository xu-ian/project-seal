import { useState } from 'react'

const Form= ({addEvent}) =>{
	const [name, setName] = useState('')
	const [time, setTime] = useState('')
	const [zoom_url, setZoom] = useState('')
	const [course, setCourse] = useState('')
	const onSubmit = (e) => {
		e.preventDefault()
		addEvent({name, time, course, zoom_url})
		setName('')
		setTime('')
		setCourse('')
		setZoom('')
	}
  return (
		//Front-end for Form which assigns deliverables (SEAL-8 Component)
		<div className="form card">
			<h2>Add An Event</h2>
			<form id="event-form" onSubmit={onSubmit}>
				<div className="msg"></div>
				<div className="form-control">
					<label className="header">Name:</label>
					<input type="text" className="tbtn-input" placeholder="Event" value={name} onChange={(e) => setName(e.target.value)} required/>
				</div>
				<div className="form-control">
					<label className="header">Due Date:</label>
					<input type="time" className="tbtn-input" value={time} onChange={(e) => setTime(e.target.value)} required/>
				</div>
				<div className="form-control">
					<label className="header">Course</label>
					<input type="text" id="course" className="tbtn-input" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} required/>
				</div>
				<div className="form-control">
					<label className="header">Zoom URL</label>
					<input type="text" id="zoom_url" className="tbtn-input" value={zoom_url} onChange={(e) => setZoom(e.target.value)}/>
				</div>
				<input type="submit" id="assign" value="Add Event" className="btn"/>
			</form>
		</div>
  );
}

export default Form;
