import React, { Component } from "react";
import ReactDOM from "react-dom";
import ListView from "./components/ListView";
import EntryList from "./components/EntryList";

class App extends Component {
  idCounter = 0;
  localData = localStorage.getItem("data");
  state = {
    grocery_list: [...JSON.parse(this.localData)],
  };
  handleClick = (value) => {
    const item = {
      id: this.idCounter++,
      name: value,
      priority: 0,
      status: "",
    };
    this.setState(({ grocery_list }) => {
      const newArray = [...grocery_list, item];
      return {
        grocery_list: newArray,
      };
    });
    this.localStorage();
  };

  handleDelete = (id) => {
    this.setState(({ grocery_list }) => {
      let indx = grocery_list.findIndex((el) => el.id === id);
      let newArray = [
        ...grocery_list.slice(0, indx),
        ...grocery_list.slice(indx + 1),
      ];
      return {
        grocery_list: newArray,
      };
    });
    this.localStorage();
  };

  handleChange = (id, value) => {
    this.setState(({ grocery_list }) => {
      let indx = grocery_list.findIndex((el) => el.id === id);
      let oldItem = grocery_list[indx];
      let newItem = {};
      if (value === "Ran Out") {
        newItem = { ...oldItem, priority: 1, status: "Ran Out" };
      } else if (value === "Have") {
        newItem = { ...oldItem, priority: 5, status: "Have" };
      } else {
        newItem = { ...oldItem, priority: 0, status: "" };
      }
      let newArray = [
        ...grocery_list.slice(0, indx),
        newItem,
        ...grocery_list.slice(indx + 1),
      ];
      return {
        grocery_list: newArray,
      };
    });
    this.localStorage();
  };

  filterByAlphabet = () => {
    this.setState(({ grocery_list }) => {
      const newArray = grocery_list.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      });
      return {
        grocery_list: newArray,
      };
    });
    this.localStorage();
  };

  filterByPrimary = () => {
    this.setState(({ grocery_list }) => {
      const newArray = grocery_list.sort((a, b) => a.priority - b.priority);
      return {
        grocery_list: newArray,
      };
    });
    this.localStorage();
  };

  entryList = () => {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    return data;
  };

  localStorage = () =>
    localStorage.setItem("data", JSON.stringify(this.state.grocery_list));

  render() {
    return (
      <div className="main">
        <div className="header">
          {this.localStorage()}
          <h1>Grocery Shop</h1>
          <button
            type="button"
            className="btn btn-primary entry"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={this.entryList}
          >
            Entry Test
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <EntryList data={this.entryList} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ListView
          data={this.state.grocery_list}
          handle={this.handleClick}
          delete={this.handleDelete}
          change={this.handleChange}
        />
        <div className="filter">
          <button className="btn btn-primary" onClick={this.filterByPrimary}>
            {" "}
            Filter By Priority
          </button>
          <button className="btn btn-primary" onClick={this.filterByAlphabet}>
            {" "}
            Filter Alphabetially
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
