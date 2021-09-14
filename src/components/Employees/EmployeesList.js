import { logDOM } from '@testing-library/react';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  removeActiveUser,
  setActiveUser,
  setUsers,
} from '../../redux/features/userSlice';
import genCharArray from '../../utils/genCharArray';
import employeesStyle from './employees.module.scss';

const EmployeesList = ({ users, activeUsersIds }) => {
  const dispatch = useDispatch();
  const alpabetArray = genCharArray('a', 'z');
  const alpabetUsers = alpabetArray.reduce(function (
    alphabetObj,
    currentLetter
  ) {
    if (!alphabetObj[currentLetter]) {
      alphabetObj[currentLetter] = users
        .filter((user) => user.lastName[0].toLowerCase() === currentLetter)
        .sort((userPrev, userNext) => {
          if (userPrev.lastName > userNext.lastName) {
            return 1;
          } else if (userPrev.lastName < userNext.lastName) {
            return -1;
          } else {
            return 0;
          }
        });
    }
    return alphabetObj;
  },
  {});

  const handleSetActiveUser = (id) => (e) => {
    dispatch(setActiveUser(id));
  };

  const handleRemoveActiveUser = (id) => (e) => {
    dispatch(removeActiveUser(id));
  };

  const generateUsersMarkup = () => {
    return Object.keys(alpabetUsers).map((letter) => {
      const users = alpabetUsers[letter];
      return (
        <div key={letter} className={employeesStyle.employees__letterWrapper}>
          <p className={employeesStyle.employees__letter}>
            {letter.toUpperCase()}
          </p>
          {users.length === 0 && <div>&mdash;</div>}
          {users.length > 0 &&
            users.map((user) => {
              return (
                <div
                  className={employeesStyle.employees__userData}
                  key={user.id}
                >
                  <p
                    key={user.id}
                    className={
                      activeUsersIds.includes(user.id)
                        ? `${employeesStyle.employees__userName} ${employeesStyle.employees__userName_active}`
                        : `${employeesStyle.employees__userName}`
                    }
                  >
                    {`${user.lastName} ${user.firstName}`}
                  </p>
                  <p className={employeesStyle.employees__status}>
                    <label>
                      <input
                        checked={activeUsersIds.includes(user.id)}
                        type='radio'
                        name={`${user.id}status`}
                        value='active'
                        onChange={handleSetActiveUser(user.id)}
                      />
                      active
                    </label>
                    <label>
                      <input
                        checked={!activeUsersIds.includes(user.id)}
                        type='radio'
                        name={`${user.id}status`}
                        value='not_active'
                        onChange={handleRemoveActiveUser(user.id)}
                      />
                      not active
                    </label>
                  </p>
                </div>
              );
            })}
        </div>
      );
    });
  };

  return (
    <div className={employeesStyle.employees__column}>
      <p className={employeesStyle.employees__header}>Employees</p>
      <div
        className={`${employeesStyle.employees__content} ${employeesStyle.employees__content_users}`}
      >
        {generateUsersMarkup()}
      </div>
    </div>
  );
};

export default EmployeesList;

{
  /* <div className={employeesStyle.employees__letterWrapper}>
          <p className={employeesStyle.employees__letter}>A</p>
          <p className={employeesStyle.employees__userName}>lol apapa</p>
          <p className={employeesStyle.employees__status}>
            <label>
              <input
                checked={true}
                type='radio'
                name='user_id'
                value='not-active'
              />
              not active
            </label>
            <label>
              <input type='radio' name='user_id' value='active' />
              active
            </label>
          </p>
        </div> */
}
