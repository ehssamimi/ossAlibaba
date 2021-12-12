import React, {useState, useEffect, forwardRef} from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
const DataPickers = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    // const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    // const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    const [startDate, setStartDate] = useState( "");
    const [endDate, setEndDate] = useState( "");
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div style={{background:'#eee',borderRadius:'7px',height:"15px",fontWeight:"bold"}}   onClick={onClick} ref={ref}>
            {/*{format(value, "dd-MM-yyyy")}*/}
            {/*{moment(value).format('"MMM Do YYY"')}*/}
            To:{moment(value).format('MMM Do YYYY')}
            {/*{moment(value).format('dddd')}*/}

        </div>
    ));

    return (
        <div>
            <>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<ExampleCustomInput />}
                />
            </>
        </div>
    );
};

export default DataPickers;