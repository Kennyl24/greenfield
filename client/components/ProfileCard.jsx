import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const ProfileCard = (props) => {
  return (
    <div className="card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sjvg567TeRTpVrueOai-GO3tLwyZ3HRZM8oNoBsBcbmsm-0Y2Q" 
        alt=""
        style={{ margin: '0 auto', width: '150px', height: '100px' }}
      />
      <p className="title">Hi {props.profile.name}</p>
      <p>{props.profile.age}</p>
      <p>{props.profile.username}</p>
      <p>{props.profile.location}</p>
      <Link style={{ fontWeight: 'bold' }} to={{ pathname: '/profile' }}>Go to my profile</Link>
    </div>
  );
};

export default ProfileCard;
