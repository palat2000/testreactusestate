import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [movieLists, setMovieLists] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const searchMovie = async () => {
    const BASE_URL = "https://api.themoviedb.org/3";
    const url = `${BASE_URL}/search/keyword?query=${keyword}&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTRlMDY2MTQ1ZGRjMzIzZTkwOWNlN2MzZjMzN2ZkMyIsInN1YiI6IjY0ZjgyNTNmNGNjYzUwMTg2N2U5NTY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.my_Pa1viz9pKlY9lG_l3KI0NG4gbWY3zfo21OwUXWcc",
      },
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      console.log(data);
      setMovieLists(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (totalPages) searchMovie();
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie();
  };

  const handleClick = (n) => {
    setPage(n);
    // searchMovie();
  };
  console.log(page);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Keyword ?"
        />
        <button>Search</button>
      </form>
      <div className="list">
        {movieLists.map((movie) => (
          <div className="movie" key={movie.id}>
            {movie.name}
          </div>
        ))}
      </div>
      <div>
        {Array.from(Array(totalPages).keys()).map((n) => (
          <button onClick={() => handleClick(n + 1)} key={n}>
            {n + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
