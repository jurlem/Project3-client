import React from 'react';
import {convertDateToString} from '../utils/convertDateToString';
import {convertDateToDateAndTime} from '../utils/convertDateToDateAndTime';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const moment = require ('moment');

//   convertDateToString(reminder.date) - changes time d;

const RemindersTable = props => {
  const {reminders, handleDelete, handleEditReminder, paginate} = props;

  let today = new Date ();
  today = convertDateToString (today);
  console.log (today);

  // const showReminder = !selectedDay
  // ? reminders
  // : this.props.reminders.filter (
  //     reminder =>
  //       convertDateToString (reminder.date) ===
  //       convertDateToString (selectedDay)
  //   );

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Remind me at</th>
          <th>Text</th>
          <th>email/sms</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {reminders.map ((reminder, index) => {
          // if (today <= {convertDateToString (reminder.date)})

          return (
            <tr key={reminder._id}>
              <td>
                {convertDateToDateAndTime (reminder.date)}
              </td>
              <td> {reminder.remindMe}</td>
              <td> {reminder.text}</td>
              <td> {reminder.gridRadios}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete (reminder._id)}
                />
              </td>
              <td>
                <Link><FontAwesomeIcon icon={faEdit} /></Link>

                {/* onClick={() => handleEditReminder (reminder._id)} */}

              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RemindersTable;
