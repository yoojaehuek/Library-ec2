import React, { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// import { LeftArrow, RightArrow } from '../../../public/images/svgs';
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styles from './calendar.module.scss';
import { ClassNames } from '@emotion/react';

interface Props{
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

const YEARS = Array.from({ length: getYear(new Date()) +1 -2000 }, (_, i) => getYear(new Date()) - i);
const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const Calendar = ({ selectedDate, setSelectedDate }: Props) => {
  return (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        dateFormat='yyyy-MM-dd'
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        showYearDropdown
        scrollableYearDropdown
        shouldCloseOnSelect
        yearDropdownItemNumber={100}
        minDate={new Date('2000-01-01')}
        maxDate={new Date('*2099-01-01')}
        selected={selectedDate}
        calendarClassName={styles.calendarWrapper}
        dayClassName={(d) => (selectedDate && d.getDate() === selectedDate!.getDate() ? styles.selectedDay : styles.unselectedDay)}
        onChange={(date) => setSelectedDate(date)}
        className={styles.datePicker}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.customHeaderContainer}>
            <div>
              <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
              <select
                value={getYear(date)}
                className={styles.year}
                onChange={({ target: { value } }) => changeYear(+value)}
                >
                  {YEARS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
            </div>
            <div>
              <button
                type='button'
                onClick={decreaseMonth}
                className={styles.monthButton}
                disabled={prevMonthButtonDisabled}
                >
                  <MdKeyboardArrowLeft fill='black' />
                </button>
                <button
                  type='button'
                  onClick={increaseMonth}
                  className={styles.monthButton}
                  disabled={nextMonthButtonDisabled}
                  >
                  <IoIosArrowForward fill='black' />
                  </button>
            </div>
          </div>
        )}
        />
    </div>
  );
};
export default Calendar;
