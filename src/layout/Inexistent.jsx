import React from 'react';

const Inexistent = (props) => {
    return (
        <div className='inexistent'>
            <div className='inexistent--img'>
                <img loading="lazy" src={props.img}></img>
            </div>
            <p>Chưa có {props.text} nào</p>
        </div>
    );
}

export default Inexistent;
