const Form= ({state, onClick}) =>{
  return (
		//Front-end for Form which assigns deliverables (SEAL-8 Component)
		<div className="form card">
			<h2>Assign a Deliverable</h2>
			<form id="deliverable-form">
				<div className="msg"></div>
				<div className="form-control">
					<label className="header">Subject:</label>
					<input type="text" className="tbtn-input" placeholder="Subject" required/>
				</div>
				<div className="form-control">
					<label className="header">Due Date:</label>
					<input type="date" className="tbtn-input" required/>
				</div>
				<div className="form-control">
					<label className="header">Description:</label>
					<br/>
					<textarea id="description" placeholder="Description" required/>
				</div>
				<div className="form-control">
					<label className="header">Select All Attachments</label>
					<input type="file" id="attachments" className="tbtn-input" multiple/>
				</div>
				<input type="submit" id="assign" value="Assign Deliverable" className="btn" onClick={onClick}/>
			</form>
		</div>
  );
}

export default Form;
