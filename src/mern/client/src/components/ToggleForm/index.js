import Form from "./toggle-components/form"
import TBtn from "./toggle-components/t-button"
import ContentStream from "./toggle-components/Deliverables"
import axios from "axios"
import { useState, useEffect } from 'react'
import './toggleFormStyle.css'
function App(){
	const [state, setState] = useState(1)
	const [deliverables, setDeliverables] = useState([])

	useEffect(()=>{
		axios.get("http://localhost:5000/contentStream/").then(res => {
      setDeliverables(res.data)
      });
	}, [])


	const handleClick = () =>{
		const form = document.querySelector('.form')
		console.log(form)
		setState(1-state);
		if(state === 0){
			form.style.display="none";
		}else{
			form.style.display="block"
		}
	}
	function AssignDeliverable(deliverable) {
		console.log(deliverable)
		axios.post("http://localhost:5000/content/add", JSON.stringify(deliverable))
	}
  return (
		<div className = 'btn-container'>
			<ContentStream deliverables={deliverables}/>
			<Form id='toggle-form' AssignDeliverable={AssignDeliverable}/>
			<TBtn id='toggle-btn' color='#047aed' state={state} onClick={handleClick}/>
		</div>
  );
}

export default App;