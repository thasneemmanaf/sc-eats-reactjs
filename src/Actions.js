import React, { useState, useEffect } from "react";
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./data.json";

const Actions = (props) => {
  const { setRestaurants } = props;
  console.log("action");
  const [showSortSelector, setSortSelector] = useState(false);
  const [showPriceRangeSelector, setPriceRangeSelector] = useState(false);
  const [showDietaryChoiceSelector, setDietaryChoiceSelector] = useState(false);
  const [dietarySelections, setDietarySelections] = useState([]);

  // Show/hide sort selector button
  const handleOnClickSortSelector = () => {
    setSortSelector(!showSortSelector);
    setPriceRangeSelector(false);
    setDietaryChoiceSelector(false);
  };

  // Show/hide price range selector button
  const handleOnClickPriceSelector = () => {
    setPriceRangeSelector(!showPriceRangeSelector);
    setSortSelector(false);
    setDietaryChoiceSelector(false);
  };

  // Show/hide Dietary choice selector button
  const handleOnClickDietarySelector = () => {
    setDietaryChoiceSelector(!showDietaryChoiceSelector);
    setPriceRangeSelector(false);
    setSortSelector(false);
  };

  // Filter restaurants based on Price/Dietary choice
  const handleGeneralFiltering = (restaurants, selection, typeOfFilter) => {
    restaurants = data.restarants;
    let filteredRestaurants = [];
    let filteredRestaurantIds = [];

    // Get filtered restaurants and corresponding ids
    restaurants.forEach((restaurant) => {
      restaurant.menu.forEach((menuItem) => {
        menuItem.items.forEach((item) => {
          if (typeOfFilter == "priceFilter") {
            const [selectedMinPrice, selectedMaxPrice] = getMinAndMaxPrice(
              selection
            );
            if (
              item.price >= selectedMinPrice &&
              item.price <= selectedMaxPrice
            ) {
              if (!filteredRestaurantIds.includes(restaurant.id)) {
                filteredRestaurantIds.push(restaurant.id);
                filteredRestaurants.push(restaurant);
              }
            }
          } else if (typeOfFilter == "dietaryFilter") {
            if (
              selection.includes(item.typeOfMeal) &&
              !filteredRestaurantIds.includes(restaurant.id)
            ) {
              filteredRestaurantIds.push(restaurant.id);
              filteredRestaurants.push(restaurant);
            }
          }
        });
      });
    });
    setRestaurants(filteredRestaurants);
  };

  // Get min and max prices based on buttons($, $$, $$$, $$$$)
  const getMinAndMaxPrice = (priceRange) => {
    let selectedMaxPrice;
    let selectedMinPrice;
    if (priceRange === "$") {
      selectedMinPrice = 0;
      selectedMaxPrice = 100;
    } else if (priceRange === "$$") {
      selectedMinPrice = 100;
      selectedMaxPrice = 200;
    } else if (priceRange === "$$$") {
      selectedMinPrice = 200;
      selectedMaxPrice = 250;
    } else if (priceRange === "$$$$") {
      selectedMinPrice = 250;
      selectedMaxPrice = 300;
    } else {
      throw new Error("Incorrect selection");
    }
    return [selectedMinPrice, selectedMaxPrice];
  };

  //  Sort button: To sort restaurants based on popularity,rating and delivery time
  const handeGeneralSorting = (restaurants, sortBy) => {
    restaurants = data.restarants;
    let func;
    if (sortBy === "maxDeliveryTime") {
      func = (a, b) => a[sortBy] - b[sortBy]; // not that easy?
    } else {
      func = (a, b) => b[sortBy] - a[sortBy];
    }
    setRestaurants([...restaurants].sort(func));
  };

  //  Dietary Choice button: To filter restaurants based on vegetarian,vegan and non vegan
  const handleDietaryFiltering = (restaurants, selection) => {
    const newSelection = [...dietarySelections];
    // Add items when it is checked  and remove items when unchecked
    if (selection.checked) {
      newSelection.push(selection.value);
    } else {
      const index = newSelection.indexOf(selection.value);
      if (index > -1) {
        newSelection.splice(index, 1);
      }
    }
    setDietarySelections(newSelection);
    handleGeneralFiltering(restaurants, newSelection, selection.name);
  };

  //  Price Range button: To filter restaurants based on price range
  const handlePriceFiltering = (restaurants, selection) => {
    const priceRange = selection.value;
    handleGeneralFiltering(restaurants, priceRange, selection.name);
  };

  return (
    <div className="actions">
      {/* Sort button */}
      <span className="button-group">
        <button onClick={handleOnClickSortSelector}>
          <span>Sort</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showSortSelector && (
          <div>
            <label>
              Most popular{" "}
              <input
                value="popularity"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
            <label>
              Rating{" "}
              <input
                value="rating"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
            <label>
              Delivery time{" "}
              <input
                value="maxDeliveryTime"
                type="radio"
                name="generalSort"
                onChange={(event) =>
                  handeGeneralSorting(
                    props.restaurants,
                    event.currentTarget.value
                  )
                }
              />
            </label>
          </div>
        )}
      </span>
      {/* TODO */}
      {/* <!-- Implement as assignment for Thursday --> */}

      {/* Price range button */}
      <span className="button-group">
        <button onClick={handleOnClickPriceSelector}>
          <span>Price Range</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showPriceRangeSelector && (
          <div className="buttons">
            <button
              value="$"
              name="priceFilter"
              onClick={(event) =>
                handlePriceFiltering(props.restaurants, event.currentTarget)
              }
            >
              $
            </button>
            <button
              value="$$"
              name="priceFilter"
              onClick={(event) =>
                handlePriceFiltering(props.restaurants, event.currentTarget)
              }
            >
              $$
            </button>
            <button
              value="$$$"
              name="priceFilter"
              onClick={(event) =>
                handlePriceFiltering(props.restaurants, event.currentTarget)
              }
            >
              $$$
            </button>
            <button
              value="$$$$"
              name="priceFilter"
              onClick={(event) =>
                handlePriceFiltering(props.restaurants, event.currentTarget)
              }
            >
              $$$$
            </button>
          </div>
        )}
      </span>

      {/* Dietary choice button */}
      <span className="button-group">
        <button onClick={handleOnClickDietarySelector}>
          <span>Dietary choice</span> <FontAwesomeIcon icon={"chevron-down"} />
        </button>
        {showDietaryChoiceSelector && (
          <div>
            <label>
              Vegetarian
              <input
                value="vegetarian"
                type="checkbox"
                name="dietaryFilter"
                onChange={(event) =>
                  handleDietaryFiltering(props.restaurants, event.currentTarget)
                }
              />
            </label>
            <label>
              Vegan
              <input
                value="vegan"
                type="checkbox"
                name="dietaryFilter"
                onChange={(event) =>
                  handleDietaryFiltering(props.restaurants, event.currentTarget)
                }
              />
            </label>
            <label>
              Non-Vegan
              <input
                value="non vegan"
                type="checkbox"
                name="dietaryFilter"
                onChange={(event) =>
                  handleDietaryFiltering(props.restaurants, event.currentTarget)
                }
              />
            </label>
          </div>
        )}
      </span>
    </div>
  );
};
export default Actions;
