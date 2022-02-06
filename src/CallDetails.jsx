import React, {useState} from 'react';
import {Button} from "react-bootstrap";


const CallDetails = (call) => {

    const isArchived = call.call.is_archived ? 'Unarchive' : 'Archive';


    const[archived, setArchived] = useState();

    function handleClick() {

        let url = 'https://aircall-job.herokuapp.com/activities/' + call.call.id;

        const dataBody = call.call.is_archived ? JSON.stringify({is_archived: false}) : JSON.stringify({is_archived: true});

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: dataBody
        })
            .catch(console(error));


    }

    // date format

    function getDay(date) {
        let newDate = new Date(date);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return(
            [months[newDate.getMonth()], newDate.getDate(),newDate.getFullYear()].join('/')
        );
    }

    function getTime(date) {
        let newDate = new Date(date);
        return(
            [newDate.getHours(), newDate.getMinutes()].join(':')
        );
    }
    const day = getDay(call.call.created_at);
    const time = getTime(call.call.created_at);

    return (
        <div className="popup-box">
            <div className="popup-container">

                {/*close button*/}
                <a href="#" className="close" onClick={call.displayDetails}/>
                <div className="card">
                    <div className="card-header">
                        <img src="https://picsum.photos/266/200"
                             alt="rover"/>
                    </div>
                    <div className="card-body">
                        <div>
                            <span className="tag tag-teal">{call.call.direction}</span>
                            <span className="tag tag-teal">{call.call.call_type}</span>
                        </div>


                        <br/>

                        <h5>
                            From : {call.call.from}
                            <br/>
                            To : {call.call.to}
                        </h5>
                        <p>
                            via : {call.call.via}
                        </p>
                        <div className="call-time-info">
                            <div className="time-info">
                                <small>At : {day} {time}</small>
                                <br/>
                                <small>Duration : {call.call.duration}s</small>
                            </div>
                            <div>
                                <Button className="btn btn-outline-secondary archive-btn" onClick={handleClick}>{isArchived}</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CallDetails;