// import React, { Component } from "react";
// import SearchField from "./components/searchField/SearchField";
// import SearchResult from "./components/searchResult/SearchResult";
// import Nominations from "./components/nominations/Nominations";
// import "./App.scss";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// let items = [];

// toast.configure();

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       movies: [],
//       nominations: [],
//       searchField: "",
//       disabled: [],
//     };
//   }

//   componentDidMount() {
//     localStorage.getItem("disabled") &&
//       this.setState({
//         disabled: JSON.parse(localStorage.getItem("disabled")),
//       });

//     localStorage.getItem("Nomination") &&
//       this.setState({
//         nominations: JSON.parse(localStorage.getItem("Nomination")),
//       });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchField !== this.state.searchField) {
//       fetch(
//         `http://www.omdbapi.com/?s=${this.state.searchField}&apikey=4ce50211#`
//       )
//         .then((response) => response.json())
//         .then((movie) => this.setState({ movies: movie.Search }))
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }

//   handleStorageDisable = (itemId) => {
//     items.push(itemId);
//     localStorage.setItem("disabled", JSON.stringify(items));
//   };

//   handleDisabled = (imdbID) => {
//     this.handleStorageDisable(imdbID);
//     this.setState({
//       disabled: [...this.state.disabled, imdbID],
//     });
//   };

//   addItem = (item) => {
//     this.setState({
//       nominations: [...this.state.nominations, item],
//     });
//   };

//   deleteItem = (itemId) => {
//     const nominations = this.state.nominations.filter(
//       (item) => item.id !== itemId
//     );
//     this.setState({
//       nominations,
//     });
//   };

//   removeDisable = (itemId) => {
//     const disabled = JSON.parse(localStorage.getItem("disabled"));

//     let results = disabled.filter((item) => {
//       return item !== itemId;
//     });

//     localStorage.setItem("disabled", JSON.stringify(results));
//     this.setState({
//       disabled: results,
//     });
//   };

//   handleChange = (event) => {
//     event.preventDefault();
//     this.setState({ searchField: event.target.value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   notify = () => {
//     toast("You have made 5 nominations already");
//   };

//   render() {
//     const {
//       movies,
//       nominations,
//       disabled,
//       handleSubmit,
//       searchField,
//     } = this.state;
//     console.log(searchField.length);

//     let disableButton;
//     if (nominations.length === 5) {
//       disableButton = true;
//       this.notify();
//     }

//     return (
//       <div className="container-fluid b">
//         <div className="row search-container d-flex justify-content-center align-items-end">
//           <div className="col-md-8">
//             <form onSubmit={handleSubmit}>
//               <SearchField
//                 name="search"
//                 placeholder="search movies"
//                 handleChange={this.handleChange}
//               />
//             </form>
//           </div>
//         </div>
//         <div className="row result">
//           <div className="col-md-4 order-md-2 nomination-box ">
//             <Nominations
//               nominations={nominations}
//               deleteItem={this.deleteItem}
//               removeDisable={this.removeDisable}
//             />
//           </div>
//           <div className="col-md-7  order-md-1 row-container j">
//             {movies &&
//               movies.map((movie) => {
//                 return (
//                   <div key={movie.imdbID} className="movie-container">
//                     {" "}
//                     <div
//                       className="card mt-3"
//                       style={{
//                         backgroundImage: `url(${movie.Poster})`,
//                       }}
//                     ></div>
//                     <div className="mini-card">
//                       <div className="title"> {movie.Title}</div>
//                       <div className="year"> {movie.Year}</div>
//                     </div>
//                     <div className="button-container">
//                       <button
//                         key={movie.imdbID}
//                         disabled={
//                           this.state.disabled.indexOf(movie.imdbID) !== -1 ||
//                           disableButton
//                         }
//                         className="btn btn-primary mt-3"
//                         onClick={() => {
//                           this.addItem({
//                             title: movie.Title,
//                             id: movie.imdbID,
//                             year: movie.Year,
//                           });
//                           this.handleDisabled(movie.imdbID);
//                         }}
//                       >
//                         Nominate
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import SearchField from "./components/searchField/SearchField";
import SearchResult from "./components/searchResult/SearchResult";
import Nominations from "./components/nominations/Nominations";
import "./App.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ReactBootStrap from "react-bootstrap";
import { Spinner } from "react-bootstrap";
let items = [];

toast.configure();

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      nominations: [],
      searchField: "",
      disabled: [],
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
        `http://www.omdbapi.com/?s=${this.state.searchField}&apikey=4ce50211#`
      )
        .then((response) => response.json())
        .then((movie) => this.setState({ movies: movie.Search }))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleStorageDisable = (itemId) => {
    items.push(itemId);
    localStorage.setItem("disabled", JSON.stringify(items));
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

  handleSubmit = (e) => {
    e.preventDefault();
  };

  notify = () => {
    toast("You have made 5 nominations already");
  };

  render() {
    const {
      movies,
      nominations,
      disabled,
      handleSubmit,
      searchField,
    } = this.state;

    let disableButton;
    if (nominations.length === 5) {
      disableButton = true;
      this.notify();
    }

    let itemsToRender;

    if (movies && movies.length > 0) {
      itemsToRender = movies.map((movie) => {
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
                  this.state.disabled.indexOf(movie.imdbID) !== -1 ||
                  disableButton
                }
                className="btn btn-primary mt-3"
                onClick={() => {
                  this.addItem({
                    title: movie.Title,
                    id: movie.imdbID,
                    year: movie.Year,
                  });
                  this.handleDisabled(movie.imdbID);
                }}
              >
                Nominate
              </button>
            </div>
          </div>
        );
      });
    } else if (searchField.length === 0) {
      itemsToRender = (
        <div className="row animation d-flex justify-content-center align-items-center">
          <div class="card d-flex justify-content-center ">
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
            <h1 className="text-center">Shoppie Awards</h1>
            <form onSubmit={handleSubmit}>
              <SearchField
                name="search"
                placeholder="search movies"
                handleChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="row result">
          <div className="col-md-4 order-md-2 nomination-box ">
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
