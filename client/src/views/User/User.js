import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import Reminders from '../../components/Reminders/Reminders';
import Appointments from '../../components/Appointments/Appointments';
import UserNavBar2 from '../../components/UserNavBar2/UserNavBar2';
import Calendar from '../../components/Calendar/Calendar';

function User() {
  return (
    <div className='User'>
      <div className='navBar2'>
        <UserNavBar2 />
      </div>
      <header className='User-Section'>
        <div className='all'>
          <div className='left'>
            <Reminders />
            <Appointments />
          </div>
          <Calendar />
        </div>
      </header>
    </div>
  );
}

export default User;