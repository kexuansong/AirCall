import React, {useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {CallReceived, CallMissed, CallMissedOutgoing, Voicemail, CallMade } from '@material-ui/icons';
import CallDetails from "./CallDetails.jsx";


const CallRecord = (call) => {

    const [display,setDisplay] = useState(false);

    const displayDetails = () =>{
        setDisplay(!display);
    }

    let details = null;
    if(display) {
        details = <CallDetails call={call.call}/>;
    }

    const nameDisplay = call.call.direction === "inbound" ? call.call.from : call.call.to;

    let icon = null;

    if(call.call.direction === "inbound"){
        if(call.call.call_type === "answered") icon = <CallReceived />;
        else if(call.call.call_type === "missed") icon = <CallMissed />;
        else icon = <Voicemail />;
    } else {
        if(call.call.call_type === "answered") icon = <CallMade />;
        else if(call.call.call_type === "missed") icon = <CallMissedOutgoing />;
        else icon = <Voicemail />;

    }

    // date format

    function getDay(date) {
        let newDate = new Date(date);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return(
            [months[newDate.getMonth()], newDate.getDate()].join(' ')
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
        <div className="call-container" onClick={displayDetails}>
                <Row>
                    <Col xs={3} className="call-type">
                        <div className="type-container">
                            {/*{call.call.direction}*/}
                            {icon}
                        </div>
                    </Col>
                    <Col xs={5}>
                        <div className="number-container">
                            <h6>{nameDisplay}</h6>
                            tried to call on {call.call.via}
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="time-container">
                            {time}
                            <br/>
                            <br/>
                            {day}
                        </div>
                    </Col>
                </Row>
            {details}
        </div>
    );
};

export default CallRecord;