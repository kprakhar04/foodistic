const ROOT_URL = "./data";
export const apiCall = (endPoint) => {
  return fetch(`${ROOT_URL}/${endPoint}`).catch((err) => {
    console.log(err);
  });
};
