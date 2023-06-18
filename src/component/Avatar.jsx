import React from 'react';

const Avatar = ({photo}) => {
    return (
        <div className='avatar'>
<img src={photo} alt="avatar"/>
        </div>
    );
};

export default Avatar;