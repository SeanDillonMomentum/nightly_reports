import React from "react";
const useStateWithLocalStorage = (localStorageKey, defaultVal = "") => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey)) ||
      JSON.stringify(defaultVal)
  );
  React.useEffect(() => {
    // console.log(value);
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

export default useStateWithLocalStorage;
