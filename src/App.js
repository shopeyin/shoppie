import React, { Component } from "react";
import SearchField from "./components/searchField/SearchField";

import Nominations from "./components/nominations/Nominations";
import "./App.scss";
import MovieSummary from "./components/moviesummary/MovieSummary";
import * as ReactBootStrap from "react-bootstrap";
import { Spinner } from "react-bootstrap";

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      nominations: [],
      searchField: "",
      disabled: [],
      message: false,
    };
  }

  componentDidMount() {
    localStorage.getItem("disabled") &&
      this.setState({
        disabled: JSON.parse(localStorage.getItem("disabled")),
      });

    localStorage.getItem("Nomination") &&
      this.setState({
        nominations: JSON.parse(localStorage.getItem("Nomination")),
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchField !== this.state.searchField) {
      fetch(
        `https://www.omdbapi.com/?s=${this.state.searchField}&apikey=4ce50211#`
      )
        .then((response) => response.json())
        .then((movie) => this.setState({ movies: movie.Search }))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  items = [];

  handleStorageDisable = (itemId) => {
    this.items.push(itemId);
    localStorage.setItem("disabled", JSON.stringify(this.items));
  };

  handleDisabled = (imdbID) => {
    this.handleStorageDisable(imdbID);
    this.setState({
      disabled: [...this.state.disabled, imdbID],
    });
  };

  addItem = (item) => {
    this.setState({
      nominations: [...this.state.nominations, item],
    });
  };

  deleteItem = (itemId) => {
    const nominations = this.state.nominations.filter(
      (item) => item.id !== itemId
    );
    this.setState({
      nominations,
    });
  };

  removeDisable = (itemId) => {
    const disabled = JSON.parse(localStorage.getItem("disabled"));

    let results = disabled.filter((item) => {
      return item !== itemId;
    });

    localStorage.setItem("disabled", JSON.stringify(results));
    this.setState({
      disabled: results,
    });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchField: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const {
      movies,
      nominations,
      disabled,

      searchField,
    } = this.state;

    let disableButton;

    if (nominations.length === 5) {
      disableButton = true;
    }

    let itemsToRender;

    if (movies && movies.length > 0) {
      itemsToRender = movies.map((movie) => {
        return (
          <MovieSummary
            movie={movie}
            addItem={this.addItem}
            handleDisabled={this.handleDisabled}
            disabled={this.state.disabled}
            disableButton={disableButton}
          />
        );
      });
    } else if (searchField.length === 0) {
      itemsToRender = (
        <div className="row animation d-flex justify-content-center align-items-center">
          <div className="card d-flex justify-content-center ">
            <h3 className="text-center">Search for Movies to Nominate</h3>
          </div>
        </div>
      );
    } else {
      itemsToRender = (
        <div className="row animation d-flex justify-content-center align-items-center">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
      );
    }

    return (
      <div className="container-fluid b">
        <div className="row search-container d-flex justify-content-center align-items-end">
          <div className="col-md-8">
            <h1 className="text-center">
              Shoppie Awards{" "}
              {nominations.length === 5 ? (
                <div
                  id="notification"
                  className="card mt-3 text-center notification"
                  style={{ height: "5rem" }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="card-title ml-3 mt-3 text-info d">
                      <h5>
                        You have made 5 nominations already, you can no longer
                        add till you delete
                      </h5>
                    </div>
                  </div>
                </div>
              ) : null}{" "}
            </h1>
            <form onSubmit={this.handleSubmit}>
              <SearchField
                name="search"
                placeholder="search movies"
                handleChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="row result">
          <div className="col-md-4 order-md-2 nomination-box " id="nominate">
            <Nominations
              nominations={nominations}
              deleteItem={this.deleteItem}
              removeDisable={this.removeDisable}
            />
          </div>
          <div className="col-md-7  order-md-1 row-container j">
            {itemsToRender}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
