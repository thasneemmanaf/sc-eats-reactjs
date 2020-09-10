import "./App.css";
import React, { useState, useCallback } from "react";
import Actions from "./Actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import data from "./data.json";

library.add(faChevronDown);

function App() {
  console.log("app");
  const [restaurants, setRestaurants] = useState([]);

  // Explore effect! (for classfull, this was related to componentWillMount, componentDidMount side effects) )
  React.useEffect(() => {
    setRestaurants(data.restarants);
    console.log("app-useEffect");
  }, []);

  const [restuarantName, setName] = useState("");

  return (
    <div className="App">
      <header>
        <nav>
          <a href="/">
            SC<span style={{ color: "#06c167" }}>eats</span>
          </a>
        </nav>
        <Actions setRestaurants={setRestaurants} restaurants={restaurants} />
        <form className="searchFood" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for food"
            value={restuarantName}
            onBlur={(e) => setName(e.target.value)}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              // TODO - future implementation
            }}
          >
            Search
          </button>
        </form>
      </header>
      <div className="restaurants">
        {restaurants.map((restaurant) => {
          return (
            <section key={restaurant.id}>
              <img src={restaurant.img} alt="" />
              <h2>{restaurant.name}</h2>
              <p className="description">{restaurant.description}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default App;
