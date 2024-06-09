import { useState } from "react";
import style from "./Search.module.css";
import "@vscode/codicons/dist/codicon.css";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

function Search() {
  const [isDropdownOpen, seIsDropdownOpen] = useState(false);
  return (
    <div className={style.container}>
      <div
        className={`${style.searchButton} ${
          isDropdownOpen ? style.active : ""
        }`}
        onClick={() => {
          seIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <i className="codicon codicon-search"></i>
        <span>Search</span>
      </div>

      {isDropdownOpen && <DropdownMenu />}
    </div>
  );
}

export default Search;
