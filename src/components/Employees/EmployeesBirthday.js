import React from 'react';
import employeesStyle from './employees.module.scss';

const EmployeesBirthday = ({ users, activeUsersIds }) => {
  const getCheckedUsers = (activeUsersIds) => {
    return activeUsersIds.map((id) => {
      return users.find((user) => {
        if (user.id === id) {
          return true;
        } else {
          return false;
        }
      });
    });
  };

  const getActivUsersFromCurrentMonth = (users) => {
    const months = [
      'January',
      'February',
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
    return users.reduce((prevObject, user) => {
      const currentMonth = new Date().getMonth();
      const userBirthMonth = new Date(user.dob).getMonth();
      if (userBirthMonth >= currentMonth) {
        if (!prevObject[months[userBirthMonth]]) {
          prevObject[months[userBirthMonth]] = [];
        }
        prevObject[months[userBirthMonth]].push(user);
      }
      return prevObject;
    }, {});
  };

  const sortActiveUsersByLastName = (activeUsersObj) => {
    Object.keys(activeUsersObj).forEach((key) => {
      activeUsersObj[key] = activeUsersObj[key].sort((userPrev, userNext) => {
        if (userPrev.lastName > userNext.lastName) {
          return 1;
        } else if (userPrev.lastName < userNext.lastName) {
          return -1;
        } else {
          return 0;
        }
      });
    });
    return activeUsersObj;
  };
  const generateUsersmarkup = (sortedActiveUsersFromCurrentMonth) => {
    return Object.keys(sortedActiveUsersFromCurrentMonth).map((month) => {
      return (
        <div
          className={employeesStyle.employees__birthdayMonthContainer}
          key={month}
        >
          <div className={employeesStyle.employees__birthdayMonth}>{month}</div>
          <ul className={employeesStyle.employees__birthdayList}>
            {sortedActiveUsersFromCurrentMonth[month].map((user) => {
              return (
                <li key={user.id}>{`${user.lastName} ${
                  user.firstName
                } ${new Date(user.dob).toLocaleDateString()}`}</li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  const checkedUsers = getCheckedUsers(activeUsersIds);
  const sortedActiveUsersFromCurrentMonth = sortActiveUsersByLastName(
    getActivUsersFromCurrentMonth(checkedUsers)
  );

  return (
    <div className={employeesStyle.employees__column}>
      <p className={employeesStyle.employees__header}>Employees birthday</p>
      <div className={employeesStyle.employees__content}>
        {!activeUsersIds.length && <div> Employees List is empty</div>}
        {activeUsersIds.length > 0 &&
          generateUsersmarkup(sortedActiveUsersFromCurrentMonth)}
      </div>
    </div>
  );
};

export default EmployeesBirthday;
