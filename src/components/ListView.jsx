import React, { Component } from "react";

export default class ListView extends Component {
  handleClick = (e) => {
    e.preventDefault();
    if (document.querySelector(".input-value").value !== "") {
      this.props.handle(document.querySelector(".input-value").value);
      document.querySelector(".input-value").value = "";
    }
  };
  handleDelete = (id) => {
    this.props.delete(id);
  };
  handleChange = (id) => {
    let indx = document.querySelector("select").options.selectedIndex;
    let value = document.querySelector("select").options[indx].value;
    this.props.change(id, value);
  };
  render() {
    return (
      <div className="list-view">
        <h2>ListView</h2>
        <form className="form-inline">
          <input
            type="text"
            placeholder="What should I buy?"
            className="input-value"
          ></input>
          <button
            type="submit"
            className="btn btn-success"
            onClick={this.handleClick}
          >
            Add
          </button>
        </form>
        <ul className="list-group grocery-item-list">
          {this.props.data.map((el) => {
            return (
              <li className="list-group-item" key={el.id}>
                {el.name}
                <button
                  className="btn btn-danger"
                  id={el.name}
                  onClick={() => this.handleDelete(el.id)}
                >
                  Delete
                </button>
                <select name="" id="" onChange={() => this.handleChange(el.id)}>
                  <option>Choose...</option>
                  <option value="Have">Have</option>
                  <option value="Ran Out">Ran Out</option>
                </select>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
