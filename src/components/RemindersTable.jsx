import React from 'react';
import {convertDateToString} from '../utils/convertDateToString';
import {convertDateToDateAndTime} from '../utils/convertDateToDateAndTime';
import {paginate} from '../utils/paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const RemindersTable = props => {
  const {reminders: allReminders, handleDelete, currentPage, pageSize} = props;

  let remindersR = paginate (allReminders, currentPage, pageSize);

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
        {remindersR.map ((reminder, index) => {
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
                <Link
                  to={{
                    pathname: '/remindersedit',
                    state: {
                      fromNotifications: true,
                      id: `${reminder._id}`,
                      date: `${reminder.date}`,
                      remindMe: `${reminder.remindMe}`,
                      text: `${reminder.text}`,
                      gridRadios: `${reminder.gridRadios}`,
                    },
                  }}
                  // to={`/remindersedit?id=${reminder._id}&remindMe=${reminder.remindMe}&text=${reminder.text}&gridRadios=${reminder.gridRadios}`}
                  // reminders={this.props.reminders}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RemindersTable;
