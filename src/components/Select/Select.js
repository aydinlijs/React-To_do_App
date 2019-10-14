import React, { useState, useEffect } from "react";
import './Select.css';

const Select = props => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      res
        .json()
        .then(res => setUsers(res))
        .then(setLoading(false));
    }
    fetchData();
  },[]);

  const renderUsers = users.map(item => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const renderLoading = loading ? <option>...loading</option> : null;

  return (
    <div className="rower">
      <select value={props.selected} onChange={props.changeSelect}>
        <option value="0">All</option>
        {renderLoading}
        {renderUsers}
      </select>
    </div>
  );
};

export default Select;
