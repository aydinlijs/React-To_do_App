import React from "react";
import "./List.css";
import Icon from "./../../assets/garbage.svg";
import Done from "./../../assets/success.svg";
import Not from "./../../assets/verified.svg";
import Empty from "./../../assets/box.svg";

const List = props => {
  const userFiltered =
    parseInt(props.user) !== 0
      ? props.list.filter(t => t.userId === parseInt(props.user))
      : props.list;

  const listItems =
    userFiltered.length > 0 ? (
      userFiltered.map(item => {
        return (
          <div className="listItem flex flexbw" key={item.id}>
            {
              <img
                alt="_done"
                className="done"
                src={item.completed ? Done : Not}
                onClick={() => props.checkItem(item.id)}
              />
            }
            <p className="index flex fldc flc">{item.id}</p>
            <p className="content">{item.title}</p>
            <p className="delete flex fldc flc">
              <img
                alt="_just trash"
                src={Icon}
                onClick={() => props.deleteItem(item.id)}
              />
            </p>
          </div>
        );
      })
    ) : (
      <div className="emptyBox flex flc">
        <p>No data</p>
        <img src={Empty} alt="_just empty" />
      </div>
    );

  return <div className="padder">{props.loading ? <div className="emptyBox flex flc">...Loading</div> : listItems}</div>;
};
export default List;
