import './style.css'
import {useState, useEffect} from "react";
import EventList from "./Events";
import axios from "axios"
import ToggleButton from '../ToggleForm/toggle-components/t-button';
import Form from './form';

function Calendar(){
	const [state, setState] = useState(1);
	const [days, setDays] = useState("");
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([{name: "No Events"}]);
	const months = [
		"January",
		"Febuary",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	useEffect(()=>{
		let id = localStorage.getItem('userId');
		//Before this date
		let b_date = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
		//After this date
		let a_date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		axios.get("http://localhost:5000/user-profile/", {params: {id}}).then(courses => {
			let courses_list = courses.data.courses;
			axios.get("http://localhost:5000/events/", {params: {id, courses_list, b_date, a_date}}).then(res => {
				setEvents(res.data);
			});
		})
		const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
		const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
		const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		let temp_days = "";
		for(let x = firstDayIndex; x>0; x--){
			temp_days += `<div class="prev-date" date=${prevLastDay - x + 1}>${prevLastDay - x + 1}</div>`;
		}
		for(let i = 1; i<=lastDay; i++){
			if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
				temp_days += `<div class="today" date=${i}>${i}</div>`;
			}else{
				temp_days += `<div date=${i}>${i}</div>`;
			}
		}
		const temp = 7-(lastDayIndex%6-Math.floor(lastDayIndex/6))-1;
		for(let y = 1; y <= temp; y++){
			temp_days += `<div class="next-date" date=${y}>${y}</div>`;
		}
		setDays(temp_days);
	}, [date]);

	//Function for Navigation of Calendar
	function previous(){
		setDate(new Date(date.getFullYear(), date.getMonth()-1, date.getDate(), 0,0,0,0));
		console.log('prev');
	}
	function next(){
		setDate(new Date(date.getFullYear(), date.getMonth()+1, date.getDate(), 0,0,0,0));
		console.log('next')
	}

	//Handles clicks on dates
	//@param: event object e
	function changeDate(e){
		//Checks for clicks that are on dates (i.e. not edges and no dragging)
		let temp_date = e.target.firstChild.data;
		console.log(localStorage.getItem('userId'));
		if(temp_date != null){
			//Checks if dates are in other months
			let temp_type = e.target.className;
			if(temp_type === "prev-date"){
				setDate(new Date(date.getFullYear(), date.getMonth()-1, temp_date))
			}else if(temp_type === "next-date"){
				setDate(new Date(date.getFullYear(), date.getMonth()+1, temp_date))
			}else{
				setDate(new Date(date.getFullYear(), date.getMonth(), temp_date))
			}
		}
	}

	//Events portion
	function toggleAdd(){
		const form = document.querySelector('.form');
		setState(1-state);
		if(!state){
			form.style.display="none";
		}else{
			form.style.display="block"
		}
	}
	function addEvent(event){
		let hours = event.time.split(':')[0];
		let minutes = event.time.split(':')[1];
		let user_id = localStorage.getItem('userId');
		let newEvent = {"user_id":user_id, "name":event.name, "date":new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0,0), "course":event.course, "zoom_url":event.zoom_url}
		console.log(newEvent);
		axios.post("http://localhost:5000/events/add/", newEvent)
		window.location.reload();
	}
  return (
		<div className = 'container'>
			<div className="calendar">
				<div className="month">
					<button className="prev" onClick={previous}>{'<'}</button>
					<div className="date">
						<h1>{months[date.getMonth()]}</h1>
					</div>
					<button className="next" onClick={next}>{'>'}</button>
				</div>
				<div className="weekdays">
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
				</div>
				<div className="days" dangerouslySetInnerHTML={{__html:days}} onClick = {changeDate}></div>
			</div>
			<div className="events">
				<div className="date">
						<h3>{date.toDateString()}</h3>
						<EventList events={events}></EventList>
						<Form id='event_form' addEvent = {addEvent}/>
						<ToggleButton id='event_tbtn' color='coral' state = {state} onClick = {toggleAdd}/>
					</div>
			</div>
		</div>
  );
}

export default Calendar;