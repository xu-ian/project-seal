import './style.css'
import {useState, useEffect} from "react";
function Calendar(){
	const [days, setDays] = useState("");
	const [date, setDate] = useState(new Date());
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
		const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
		const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
		const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		let temp_days = "";
		for(let x = firstDayIndex; x>0; x--){
			temp_days += `<div className="prev-date">${prevLastDay - x + 1}</div>`;
		}
		for(let i = 1; i<=lastDay; i++){
			if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
				temp_days += `<div className="today">${i}</div>`;
			}else{
				temp_days += `<div>${i}</div>`;
			}
		}
		const temp = 7-(lastDayIndex%6-Math.floor(lastDayIndex/6))-1;
		for(let y = 1; y <= temp; y++){
			temp_days += `<div className="next-date">${y}</div>`;
		}
		setDays(temp_days);
	}, [date]);
	function previous(){
		setDate(new Date(date.getFullYear(), date.getMonth()-1, date.getDate(), 0,0,0,0));
		console.log('prev');
	}
	function next(){
		setDate(new Date(date.getFullYear(), date.getMonth()+1, date.getDate(), 0,0,0,0));
		console.log('next')
	}
  return (
		<div className = 'container'>
			<div className="calendar">
			<div className="month">
				<button className="prev" onClick={previous}>{'<'}</button>
				<div className="date">
					<h1>{months[date.getMonth()]}</h1>
					<p>{date.toDateString()}</p>
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
				<div className="days" dangerouslySetInnerHTML={{__html:days}}></div>
			</div>
		</div>
  );
}

export default Calendar;