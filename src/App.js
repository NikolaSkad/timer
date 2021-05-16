import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

function App() {

  const [date, setDate] = useState(new Date());

  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    if(interval){
      clearInterval(interval);
    }
    const countDownDate = new Date(moment(date)).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / ( 1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % ( 1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const minutes = Math.floor((distance % ( 1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % ( 1000 * 60)) / 1000);
    
      if(distance < 0) {
        //stop out timer
        clearInterval(interval);
      }else{
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000)
  };

  useEffect(()=>{
    startTimer();
    return () => {
      clearInterval(interval);//desice se greska ako stavim interval.current
    };
  });//pitaj luleta sta znaci kada ne stavis nista kao drugi arg

  const changeDate = (e) => {
    setDate(e);
  };

  const changeVisibility = () => {
    const appear = document.getElementById('call');

    if(appear.style.visibility !== "visible"){
      appear.style.visibility = "visible";
    }
    else{
      appear.style.visibility = "hidden";
    }
  };

  return (
    <div className="App">
      <div className="instruction">
          <p>( Click on calendar icon to set Time )</p>
      </div>
      <div id="call" className="calendar-container">
        <Calendar 
          className="calendar"
          value={date}
          onChange={changeDate}
          onClickDay={changeVisibility}
        />
      </div>
      <section className="timer-container">
        <section className="timer">
          <div>
            <span onClick={changeVisibility} className="mdi mdi-calendar-clock timer-icon"></span>
            <h2>Countdown Timer</h2>
            <p>Countdown to a really special date. One you could or would never imagine!</p>
          </div>
          <div>
            <section>
              <p>{timerDays}</p>
              <p><small>Days</small></p>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <p><small>Hours</small></p>
            </section>
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <p><small>Minutes</small></p>
            </section>
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <p><small>Seconds</small></p>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;
