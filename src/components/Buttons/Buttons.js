import React from 'react';
import './Buttons.css';

const Buttons = (props) => {
    const buttons = ['All','Done','Left to do'];
    return(
        <div id="filterButtons">
            {
                buttons.map(b=>{
                    const key = buttons.indexOf(b) + 1;
                    const clase = key === props.activeFilter ? 'items active' : 'items';
                    return(
                        <button key={key} className={clase} onClick={()=>props.setFilter(key)}>{b}</button>
                    )
                })
            }
        </div>
    )
}

export default Buttons;