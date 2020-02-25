import React from "react";
const useStateWithLocalStorage = (localStorageKey, defaultVal = "") => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey)) ||
      JSON.stringify(defaultVal)
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);
  return [value, setValue];
};

export default useStateWithLocalStorage;
