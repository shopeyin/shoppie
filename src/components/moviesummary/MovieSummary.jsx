import React, { Component } from "react";

class MovieSummary extends Component {
  constructor(props) {
    super(props);
  }
  addingItem = (item) => {
    this.props.addItem(item);
  };

  handlingDisabledButtion = (itemId) => {
    this.props.handleDisabled(itemId);
  };
  render() {
    const { movie } = this.props;
    return (
      <div key={movie.imdbID} className="movie-container">
        {" "}
        <div
          className="card mt-3"
          style={{
            backgroundImage: `url(${movie.Poster})`,
          }}
        ></div>
        <div className="mini-card">
          <div className="title"> {movie.Title}</div>
          <div className="year"> {movie.Year}</div>
        </div>
        <div className="button-container">
          <button
            key={movie.imdbID}
            disabled={
              this.props.disabled.indexOf(movie.imdbID) !== -1 || this.props.disableButton
            }
            className="btn btn-primary mt-3"
            onClick={() => {
              this.addingItem({
                title: movie.Title,
                id: movie.imdbID,
                year: movie.Year,
              });
              this.handlingDisabledButtion(movie.imdbID);
            }}
          >
            Nominate
          </button>
        </div>
      </div>
    );
  }
}

export default MovieSummary;
