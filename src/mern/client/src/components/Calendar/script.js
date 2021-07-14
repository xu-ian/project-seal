const date = new Date();
const renderCalendar = () =>{
	const month = date.getMonth();
	const monthDays = document.querySelector('.days')
	const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
	const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
	const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
	const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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
	
	document.querySelector('.date h1').innerHTML = months[month];
	document.querySelector('.date p').innerHTML = date.toDateString();
	let days = "";
	for(let x = firstDayIndex; x>0; x--){
		days += `<div className="prev-date">${prevLastDay - x + 1}</div>`
	}
	for(let i = 1; i<=lastDay; i++){
		if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
			days += `<div className="today">${i}</div>`;
		}else{
			days += `<div>${i}</div>`;
		}
	}
	const temp = 7-(lastDayIndex%6-Math.floor(lastDayIndex/6))-1;
	for(let y = 1; y <= temp; y++){
		days += `<div className="next-date">${y}</div>`;
	}
	monthDays.innerHTML = days;
}

document.querySelector('.prev').addEventListener('click', ()=>{
	date.setMonth(date.getMonth()-1);
	renderCalendar();
})
document.querySelector('.next').addEventListener('click', ()=>{
	date.setMonth(date.getMonth()+1)
	renderCalendar();
})

renderCalendar();