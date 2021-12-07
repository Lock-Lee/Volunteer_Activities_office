const GROBAL = {
  // BASE_SERVER: {
  //   URL: "http://rvscs.com/phaisithong-backend/api/",
  //   URL_UPLOAD: "http://rvscs.com/phaisithong-backend/api/upload/index.php",
  // },

  BASE_SERVER: {
    URL: "http://localhost/api/api/",
    URL_UPLOAD: "http://localhost/api/api/upload/index.php",
  },

  ACCESS_TOKEN: {
    "x-access-token": localStorage.getItem("x-access-token"),
  },
};

export default GROBAL;
