import React from "react";

const EntryList = (props) => {
  let result = null;
  if (props.data().length !== 0) {
    result = props.data().map((el) => {
      return (
        <table className="table table-dark" key={el.id}>
          <thead>
            <tr className="tableHeader">
              <th scope="col">Item</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{el.name}</td>
              <td>{el.status}</td>
              <td>{el.priority}</td>
            </tr>
          </tbody>
        </table>
      );
    });
  } else {
    result = "There is no items...";
  }
  return <h2>{result}</h2>;
};

export default EntryList;
