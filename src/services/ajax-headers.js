/**
 * We also have methods for retrieving data from server. In the case we access protected resources,
 * the HTTP request needs Authorization header.
 */
export default function ajaxHeaders() {
  let dataToken = JSON.parse(localStorage.getItem("data_token"));
  let entetes = {
    "Accept-Language": "fr",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (dataToken && dataToken.access_token) {
    entetes.Authorization = "Bearer " + dataToken.access_token;
  }
  return entetes;
}
