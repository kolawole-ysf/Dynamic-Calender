const currentDate=document.querySelector('.current-date');
const calDates=document.querySelector('.cal-dates');
const prevNext=document.querySelectorAll('.prevNext span');
const currentHour=document.querySelector('#hour');
const currentMin=document.querySelector('#minute');
const currentSec=document.querySelector('#seconds');
const currentSession=document.querySelector('#session');



const months=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];


let date=new Date(), currYear=date.getFullYear(); let currMonth=date.getMonth();


function renderCalendar(){
    
    const lastDateOfTheMonth=new Date(currYear, currMonth+1,0).getDate(); //getting last date of the month
    const firstDayOfTheMonth=new Date(currYear, currMonth,1).getDay();//getting first day of the month
    const lastDayOfTheMonth=new Date(currYear,currMonth,lastDateOfTheMonth).getDay();//getting the last day of the month
    const lastDateOfLastMonth=new Date(currYear,currMonth,0).getDate()//getting the last date of last month
    let divTags="";
    //getting the last days of previous month
    for(let i=firstDayOfTheMonth; i>0; i--){
        divTags+=`<div class="inactive">${lastDateOfLastMonth-i+1}</div>`
        calDates.innerHTML=divTags;
    
  
    }
    for(let i=1; i<=lastDateOfTheMonth; i++){
        let isToday=i===new Date().getDate() && currYear===date.getFullYear() && currMonth===date.getMonth()? "active":"";
        divTags+=`<div class="${isToday}">${i}</div>`
        calDates.innerHTML=divTags;
        
       }
    for(let i=lastDayOfTheMonth; i<6; i++){
        divTags+=`<div class="inactive">${i-lastDayOfTheMonth+1}</div>`
        calDates.innerHTML=divTags;
    
     }
     
currentDate.innerHTML=`${months[currMonth]} ${currYear}`;//displaying current year and month
}
renderCalendar();

//displaying other months upon click on navigation icon
prevNext.forEach(icon=>{
    icon.addEventListener('click',()=>{
        currMonth= icon.id ==="prev"? currMonth-1: currMonth+1;
//navigating through years
        if(currMonth<0 || currMonth>11){
            date=new Date(currYear,currMonth);
            currMonth=date.getMonth();
            currYear=date.getFullYear(); 
         }else{
            date= new Date();
         }
        renderCalendar();
    });
});
//changing the mode from dark mode to light mode upon click on toggle
const body=document.querySelector('body > div');

document.querySelector('.toggle-icon').addEventListener('click', ()=>{
    if(body.className==='body-dark'){
        body.className='body-light';
    }else{
        body.className='body-dark';
    };
})

function showTime(){
    let time=new Date(), currHour=time.getHours(), currMin=time.getMinutes(),currSec=time.getSeconds();

    if(currMin<10){
        currMin="0"+ currMin;
    }
    if(currSec<10){
        currSec="0"+ currSec;
    }
    if(currHour>=12){
        currHour=currHour-12;
        currentSession.innerText='PM'
    }else{
        currentSession.innerText='AM'
    }
    if(currHour<10){
        currHour="0"+ currHour;
    }
    currentHour.innerText=`${currHour}`;
    currentMin.innerText=`${currMin}`;
    currentSec.innerText=`${currSec}`;
}
setInterval(showTime,10)



