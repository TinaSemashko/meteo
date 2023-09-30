export const APIKey = process.env.REACT_APP_API_KEY?.replace(
  /['"]+/g,
  ""
).replace(";", "");
