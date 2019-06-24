import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const RemindersTable = props => {
  const {reminders, handleDelete} = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Remind me at</th>
          <th>Text</th>
          <th>email/sms</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {reminders.map ((reminder, index) => {
          return (
            <tr key={reminder._id}>
              <td> {reminder.time} {reminder.date}</td>
              <td> {reminder.remindMe}</td>
              <td> {reminder.text}</td>
              <td> {reminder.gridRadios}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete (reminder._id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RemindersTable;
