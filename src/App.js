import React, { useState } from 'react';
import './style.css';
import 'react-dates/initialize';
import moment from 'moment';
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates';
import { withStyles, withStylesPropTypes, css } from 'react-with-styles';
import 'react-dates/lib/css/_datepicker.css';

export default function App() {
  const [selectedDates, setSelectedDates] = useState({
    focusedInput: null,
    startDate: null,
    endDate: null,
  });

  const renderDatePresets = () => {
    const presets = [
      {
        text: 'last month',
        start: moment().subtract(1, 'month'),
        end: moment(),
      },
    ];

    const isSameDay = (a, b) => {
      if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
      // Compare least significant, most likely to change units first
      // Moment's isSame clones moment inputs and is a tad slow
      return (
        a.date() === b.date() &&
        a.month() === b.month() &&
        a.year() === b.year()
      );
    };

    const styles = {
      PresetDateRangePicker_button: {
        border: '1px solid black',
        backgroundColor: 'white',
        color: 'red',
      },
      PresetDateRangePicker_button__selected: {
        backgroundColor: 'orange',
      },
    };

    return (
      <div {...css(styles.PresetDateRangePicker_panel)}>
        {presets.map(({ text, start, end }) => {
          const isSelected =
            isSameDay(start, selectedDates.startDate) &&
            isSameDay(end, selectedDates.endDate);
          return (
            <button
              key={text}
              {...css(
                styles.PresetDateRangePicker_button,
                isSelected && styles.PresetDateRangePicker_button__selected
              )}
              type="button"
              onClick={() =>
                setSelectedDates((prev) => ({...prev, startDate: start, endDate: end }))
              }
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <DateRangePicker
        renderCalendarInfo={renderDatePresets}
        startDate={selectedDates.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_stasrt_date_id" // PropTypes.string.isRequired,
        endDate={selectedDates.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          //setSelectedDates((prev) => ({ ...prev, startDate, endDate }));
        }}
        isRtl={true}
        focusedInput={selectedDates.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => {
          setSelectedDates((prev) => ({ ...prev, focusedInput }));
        }}
        isOutsideRange={() => false}
      />
      <p>
        <button>meital</button>
      </p>
    </div>
  );
}
