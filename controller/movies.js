const mu = require("../lib/mongoUtils");

const getMovies = (callback) => {
  mu.then((client) => {
    client
      .db("reactive")
      .collection("movies")
      .find({})
      .toArray((err, data) => {
        callback(data);
      });
  });
};

const notifyChanges = (callback) => {
  mu.then((client) => {
    const cursor = client
      .db("reactive")
      .collection("movies")
      .watch()
      .on("change", (change) => {
        console.log("Collection changing");
        getMovies((data) => {
          console.log(data);
          callback(JSON.stringify(data));
        });
      });
  });
};

const movie = { getMovies, notifyChanges };

module.exports = movie;
