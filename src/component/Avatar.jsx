import React from 'react';

const Avatar = ({photo,width}) => {
    return (
        <div className='avatar' style={{width:width}}>
<img src={photo} alt="avatar"/>
        </div>
    );
};

export default Avatar;