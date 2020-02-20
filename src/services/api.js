import { categories } from "./mock";

export const persistLocalStorage = (idx, data) => {
  return localStorage.setItem(idx, data);
};

export const getLocalStorage = async idx => {
  return await JSON.parse(localStorage.getItem(idx));
};

/* MOCK */
export const getCategories = async () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(categories);
    }, 2000)
  );
};

/*
  For external api uncomment this lines above and refact this methods
*/
/* FROM API */
//const API_URL = "";
/*
ex:
export const getUsers = async() => {
  let response = await fetch(`${API_URL}/${name}/repos`);
  let data = await response.json();
  return data;
}
*/
