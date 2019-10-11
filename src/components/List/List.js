import React from 'react';
import './List.css';
import Icon from './../../assets/garbage.svg';
import Done from './../../assets/success.svg';
import Not from './../../assets/verified.svg';
import Empty from './../../assets/box.svg';

const List = props => {

    const listItems = props.list.length > 0 ? props.list.map((item) => {
        return (
            <div className="listItem" key={item.index}>
                {
                    <img alt="_done" className="done" src={item.done ? Done : Not} onClick={() => props.checkItem(item.index)} />
                }
                <p className="index flex fldc flc">{item.index}</p>
                <p className="content">{item.todo}</p>
                <p className="delete flex fldc flc">
                    <img alt="_just trash" src={Icon} onClick={() => props.deleteItem(item.index)} />
                </p>
            </div>
        )
    }
    ) : (
            <div className="emptyBox">
                <p>No data</p>
                <img src={Empty} alt="_just empty" />
            </div>
        );
    return (
        <div>
            {listItems}
        </div >
    )
}
export default List;