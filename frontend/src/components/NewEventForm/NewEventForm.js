import {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {AiOutlineCloseSquare} from 'react-icons/ai';

import api from '../../api/api';

function NewEventForm({hidden, setHidden, userId}) {
  const [beginTime, setBeginTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [title, setTitle] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    api
      .post('/events', {
        title,
        begin_time: beginTime, 
        end_time: endTime,
        user_id: userId
      })
      .then(res => {
        console.log("Event created");
      })
  }

  return (
    <div hidden={hidden} >
      <button onClick={() => setHidden(true)}>
        <AiOutlineCloseSquare/>
      </button>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>
            Title
            <input type="text" name="eventTitle" id="eventTitle" onChange={e => setTitle(e.target.value)}/>
          </label>
        </div>
        <div>
          Begin Time
          <DatePicker selected={beginTime} onChange={(date) => setBeginTime(date)} showTimeSelect dateFormat="Pp"/>
        </div>
        <div>
          End Time
          <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} showTimeSelect dateFormat="Pp"/>
        </div>

        <button type="submit">
          Create Event
        </button>
      </form>
    </div>
  )
}

export default NewEventForm;