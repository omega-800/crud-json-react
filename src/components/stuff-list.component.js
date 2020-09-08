
import React, { Component } from "react";
import StuffDataService from "../services/stuff.service";
import { Link } from "react-router-dom";

export default class StuffsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStuffs = this.retrieveStuffs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStuff = this.setActiveStuff.bind(this);
    this.removeAllStuffs = this.removeAllStuffs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      stuffs: [],
      currentStuff: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveStuffs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveStuffs() {
    StuffDataService.getAll()
      .then(response => {
        this.setState({
            stuffs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStuffs();
    this.setState({
      currentStuff: null,
      currentIndex: -1
    });
  }

  setActiveStuff(stuff, index) {
    this.setState({
      currentStuff: stuff,
      currentIndex: index
    });
  }

  removeAllStuffs() {
    StuffDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    StuffDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          stuffs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, stuffs, currentStuff, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Stuffs List</h4>

          <ul className="list-group">
            {stuffs &&
              stuffs.map((stuff, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveStuff(stuff, index)}
                  key={index}
                >
                  {stuff.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllStuffs}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentStuff ? (
            <div>
              <h4>Stuff</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentStuff.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentStuff.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentStuff.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/stuffs/" + currentStuff.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Stuff...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
