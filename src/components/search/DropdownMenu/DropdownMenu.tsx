import { useState, ChangeEvent, useEffect } from "react";
import fuzzysearch from "fuzzysearch";
import style from "./DropdownMenu.module.css";
import "@vscode/codicons/dist/codicon.css";

function DropdownMenu() {
  const [text, setText] = useState("");
  const [selectedList, setSelectedList] = useState<"favourites" | "all">("all");
  const [coins, setCoins] = useState<string[]>([]);
  const [favouriteCoins, setFavouriteCoins] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleListSelect = (list: "favourites" | "all") => {
    setSelectedList(list);
  };

  const handleAddToFavourite = (coin: string) => {
    setFavouriteCoins((prevFavourites) => {
      if (prevFavourites.includes(coin)) {
        return prevFavourites.filter((favourite) => favourite !== coin);
      } else {
        return [...prevFavourites, coin];
      }
    });
  };

  useEffect(() => {
    fetch("https://api-eu.okotoki.com/coins")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredCoins = coins.filter((coin) =>
    fuzzysearch(text.toLowerCase(), coin.toLowerCase())
  );

  return (
    <div className={style.container}>
      {/* search bar */}
      <div className={style.search}>
        <i className="codicon codicon-search"></i>

        <div className={style.searchContainer}>
          <input
            className={style.searchInput}
            type="text"
            placeholder="Search..."
            value={text}
            onChange={handleChange}
          />
          {text !== "" && (
            <button
              onClick={() => {
                setText("");
              }}
              className={style.searchClear}
            >
              <span>x</span>
            </button>
          )}
        </div>
      </div>
      {/* choose list to display */}
      <div className={style.listSelect}>
        <span
          className={`${style.listName} ${
            selectedList === "favourites" ? style.active : ""
          }`}
          onClick={() => handleListSelect("favourites")}
        >
          <i className="codicon codicon-star-full"></i>
          Favourites
        </span>
        <span
          className={`${style.listName} ${
            selectedList === "all" ? style.active : ""
          }`}
          onClick={() => handleListSelect("all")}
        >
          ALL Coins
        </span>
      </div>
      {/* display current list */}
      <div className={style.listContainer}>
        <div className={style.list}>
          {selectedList === "all"
            ? filteredCoins.map((coin) => (
                <div className={style.listItem} key={coin}>
                  <div
                    onClick={() => handleAddToFavourite(coin)}
                    className={style.addToFav}
                  >
                    <i
                      className={`codicon ${
                        favouriteCoins.includes(coin)
                          ? "codicon-star-full"
                          : "codicon-star-empty"
                      }`}
                    ></i>
                  </div>
                  <span className={style.itemText}>{coin}</span>
                </div>
              ))
            : favouriteCoins.length > 0 &&
              favouriteCoins.map((coin) => (
                <div className={style.listItem} key={coin}>
                  <div
                    onClick={() => handleAddToFavourite(coin)}
                    className={style.addToFav}
                  >
                    <i
                      className={`codicon ${
                        favouriteCoins.includes(coin)
                          ? "codicon-star-full"
                          : "codicon-star-empty"
                      }`}
                    ></i>
                  </div>
                  <span className={style.itemText}>{coin}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
