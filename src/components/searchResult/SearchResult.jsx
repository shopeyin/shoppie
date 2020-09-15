// import React from "react";
// import MovieSummary from "../moviesummary/MovieSummary";
// // function SearchResult({ movies }) {
// //   console.log(movies);
// //   let items;
// //   if (movies) {
// //     items = movies.filter((item, idx) => {
// //       return idx < 5;
// //     });
// //     console.log(items.length);
// //   }

// //   return (
// //     <div>
// //       {items &&
// //         items.map((movie) => {
// //           return <MovieSummary key={movie.imdbID} movie={movie} />;
// //         })}
// //     </div>
// //   );
// // }

// function SearchResult({ movies }) {
//   console.log(movies);
//   let itemsToRender;
//   if (movies) {
//     itemsToRender = movies
//       .filter((movie, index) => index < 5)
//       .map((movie) => {
//         return <MovieSummary key={movie.imdbID} movie={movie} />;
//       });
//     console.log(itemsToRender.length);
//   } else if (movies && movies === undefined) {
//     itemsToRender = <div>No movie found</div>;
//   } else {
//     itemsToRender = (
//       <h3 className="card-title ml-3 mt-2 text-info">Loading....</h3>
//     );
//   }

//   return (
//     <div>
//       <h3>{itemsToRender}</h3>
//     </div>
//   );
// }

// export default SearchResult;
