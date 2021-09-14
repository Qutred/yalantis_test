import React, { useEffect } from 'react';
import employeesStyle from './employees.module.scss';
import EmployeesBirthday from './EmployeesBirthday';
import EmployeesList from './EmployeesList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/features/userSlice';
import Loading from '../Loading/Loading';

const Employees = () => {
  const { users, isLoading, activeUsersIds } = useSelector(
    (state) => state.userSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  return (
    <>
      {isLoading === 'LOADING' ||
      (isLoading === 'IDLE' && users.length === 0) ? (
        <Loading />
      ) : (
        <div className={employeesStyle.employees}>
          <EmployeesList users={users} activeUsersIds={activeUsersIds} />
          <EmployeesBirthday users={users} activeUsersIds={activeUsersIds} />
        </div>
      )}
      ;
    </>
  );
};

export default Employees;
