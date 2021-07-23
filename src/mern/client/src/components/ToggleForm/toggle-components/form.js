import { useState } from 'react'

const Form= ({AssignDeliverable}) =>{
	const [name, setName] = useState('')
	const [duedate, setDate] = useState('')
	const [description, setDesc] = useState('')
	const [attachments, setAttachments] = useState([])
	const [mandatory, setMandatory] = useState(false)
	const onSubmit = (e) => {
		e.preventDefault()
		AssignDeliverable({name, duedate, description, attachments})
		setName('')
		setDate('')
		setDesc('')
		setAttachments([])
	}
  return (
		//Front-end for Form which assigns deliverables (SEAL-8 Component)
		<div className="form card">
			<h2>Assign a Deliverable</h2>
			<form id="deliverable-form" onSubmit={onSubmit}>
				<div className="msg"></div>
				<div className="form-control">
					<label className="header">Subject:</label>
					<input type="text" className="tbtn-input" placeholder="Subject" value={name} onChange={(e) => setName(e.target.value)} required/>
				</div>
				<div className="form-control">
					<label className="header">Due Date:</label>
					<input type="date" className="tbtn-input" value={duedate} onChange={(e) => setDate(e.target.value)} required/>
				</div>
				<div className="form-control">
					<label className="header">Description:</label>
					<br/>
					<textarea id="description" placeholder="Description" value={description} onChange={(e) => setDesc(e.target.value)} required/>
				</div>
				<div className="form-control">
					<label className="header">Select All Attachments</label>
					<input type="file" id="attachments" className="tbtn-input" value={attachments} onChange={(e) => setAttachments(e.target.value)} multiple/>
				</div>
				<div className="form-control">
					<label className="header">Mandatory:</label>
					<input type="checkbox" className="tbtn-input" onChange={(e) => setMandatory(e.target.checked)}/>
				</div>
				<input type="submit" id="assign" value="Assign Deliverable" className="btn"/>
			</form>
		</div>
  );
}

export default Form;
