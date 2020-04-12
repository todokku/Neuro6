import React from 'react';
import { Card, 
  Row,
  Col, } from 'antd';
import { Link } from 'react-router-dom';
import './User.css';
import Reminders from '../../components/Reminders/Reminders';
import Appointments from '../../components/Appointments/Appointments';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import { PromiseProvider } from 'mongoose';
//import { Row, Col} from 'antd';

const User = props => {
  const styles = {
    card: {
      maxHeight: '100%'
    },
    cardBody: {
      maxHeight: 400,
      overflow: 'auto'
    }
  };

  return (
    <div className='User'>
      
      <header className='User-Section'>
        <div className='all'>
          {/* <div className='left'> */}
          <Row gutter={[20, 8]}>
            <Col flex={4}>
              <Card align='left' title='Reminders' text-align='left'>
                <Reminders />
              </Card>
              <p>{'\n'}</p>
              <p>{' '}</p>
              <p>{'\n'}</p>
              <Card
                style={styles.card}
                bodyStyle={styles.cardBody}
                align='left'
                title='Appointments'
                text-align='left'
              >
                {/* <p className='site-card-demo-inner-p'>All Apointments</p> */}
                <Appointments email={props.email} />
              </Card>
            </Col>
          {/* </div> */}
          <Col span={1}>
            <p></p>
          </Col>
          {/* align='left' justifyContent='center' */}
          <Col flex={2}>
          <Card justify-content='center' title='Calendar'>
            <CalendarComponent align='center' email={props.email}/>
          </Card>
          </Col>
          </Row>
        </div>
      </header>
    </div>
  );
};

export default User;
