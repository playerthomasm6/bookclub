import React from "react";

const SearchContext = React.createContext({
  searchKey: "",
  handleBtnClick: () => {},
});

export default SearchContext;
