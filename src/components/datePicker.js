// DatePicker.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datePicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

const CustomDatePicker = ({ selected, onChange, placeholder }) => {
    const CustomInput = ({ value, onClick }) => (
        <div className="datepicker-wrapper" onClick={onClick}>
            <input type="text" value={value} readOnly className="datepicker-input" placeholder={placeholder} />
            <FontAwesomeIcon icon={faCalendarDay} className="icon-calendar" />
        </div>
    );

    return (
        <DatePicker
            selected={selected}
            onChange={onChange}
            customInput={<CustomInput />}
            className="datepicker-custom"
        />
    );
}

export default CustomDatePicker;
