import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';

const Calender = (props) => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);
    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    const [date, setDate] = useState(today);
    const [formateDate, setFormateDate] = useState();
    const formateDateFun = (d) => {
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        const strDate = JSON.stringify(d).slice(1, 11);
        setFormateDate(strDate);
    }
    useEffect(() => {
        props.dateHandler(formateDate);
    }, [date, formateDate, props]);

    return (
        <div>
            <Calendar value={date} onChange={(e) => { setDate(e.value); formateDateFun(e.value); }} inline={true} id="calendarPicker" />
        </div>
    );
};

export default Calender;