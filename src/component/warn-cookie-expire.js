import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../context/user-context';

const WarnCookieExpire = (props) => {
  const [show, setShow] = useState(props.show);
  const {user, setUser} = useContext(UserContext);
  const [minute, setMinute] = useState(props.cookieTime.minute);
  const [second, setSecond] = useState(props.cookieTime.second);
  let interval = null;

  useEffect(() => {
    interval = setInterval(() => {
      if (second > 0)
        setSecond(second - 1);
      else if (minute > 0)
        setSecond(59);
  
      if (minute > 0 && second == 0)
        setMinute(minute - 1);
  
      if (minute <= 0 && second <= 0) {
        console.log('the user has left the desk - auto-logout');
        clearInterval(interval);
        window.location = '/sign-in'; // cycle user out of the SPA
      }
      //console.log('am i still running: ' + hour + ' ' + minute + ' ' + second);
    }, 1000);
    return () => clearInterval(interval); 
  }, [minute, second, show]);

  return (
    <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Session Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Current Session Expiring</h4>
        <p>The current session is about to expire in {minute}:{second < 10 ? ('0'+second) : second} from now.</p>
        <p>Click 'Continue' to extend the session by 10 more minutes, otherwise click 'Cancel' to allow session to expire.</p>
        <p>Doing a web browser reload will show this dialog again but you must extend the session to continue.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          fetch(process.env.WAREHOUSE_API + '/api/v1/auth/extend', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(response => response.json())
          .then(response => {
            clearInterval(interval);
            if (response.success) {
              setUser({
                jwt: response.jwt,
                email: response.payload.email,
                id: response.payload.id,
                name: response.payload.name,
                admin: response.payload.admin
              });
            }
            // recycle the user through SPA
            window.location = response.success ? window.location.pathname : '/';
          });
        }}>Continue</Button>
        <Button onClick={() => {
          setShow(false);
        }}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WarnCookieExpire;