import Form from "./toggle-components/form"
import TBtn from "./toggle-components/t-button"
import { useState } from 'react'
import './toggleFormStyle.css'

function App(){
	const [state, setState] = useState(1)
	const handleClick = () =>{
		const form = document.querySelector('.form')
		console.log(form)
		setState(1-state);
		if(state == 0){
			form.style.display="none";
		}else{
			form.style.display="block"
		}
	}
	function AssignDeliverable() {
		alert('Assignment Succesful');
	}
  return (
		<div className = 'btn-container'>
			<Form id='toggle-form' onClick={AssignDeliverable}/>
			<TBtn id='toggle-btn' color='#047aed' state={state} onClick={handleClick}/>
		</div>
  );
}

export default App;

/*
function ToggleDeliverables() {
	if(a==1){
		deliverableForm.style.display="none";
		ft_btn.innerHTML="+";
		return a=0;
	}else{
		deliverableForm.style.display="block";
		ft_btn.innerHTML="-";
		return a=1;
	}
}*/