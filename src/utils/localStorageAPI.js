export const saveToLocalStorage = (data) => {
  try {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem('reduxStore', stringifyData);
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const getFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('reduxStore');
    if (data == null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};
