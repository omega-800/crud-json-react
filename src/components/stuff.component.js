import React, { Component } from "react";
import StuffDataService from "../services/stuff.service";


export default class Stuff extends Component{
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getStuff = this.getStuff.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateStuff = this.updateStuff.bind(this);
    this.deleteStuff = this.deleteStuff.bind(this);

    this.state = {
      currentStuff: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getStuff(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStuff: {
          ...prevState.currentStuff,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentStuff: {
        ...prevState.currentStuff,
        description: description
      }
    }));
  }

  getStuff(id) {
    StuffDataService.get(id)
      .then(response => {
        this.setState({
          currentStuff: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentStuff.id,
      title: this.state.currentStuff.title,
      description: this.state.currentStuff.description,
      published: status
    };

    StuffDataService.update(this.state.currentStuff.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentStuff: {
            ...prevState.currentStuff,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStuff() {
    StuffDataService.update(
      this.state.currentStuff.id,
      this.state.currentStuff
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The stuff was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteStuff() {    
    StuffDataService.delete(this.state.currentStuff.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/stuffs')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentStuff } = this.state;

    return (
      <div>
        {currentStuff ? (
          <div className="edit-form">
            <h4>Stuff</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentStuff.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentStuff.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentStuff.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentStuff.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStuff}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStuff}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Stuff...</p>
          </div>
        )}
      </div>
    );
  }
}
