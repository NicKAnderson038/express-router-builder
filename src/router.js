const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const buildRoutes = (directoryPath, route) => {
  const rmRoutesFolder = route.replace('/routes', '')
  const setRoute = async (rStr) => {
    console.log('URL: ', rmRoutesFolder, rStr);
    await router.use(
      `${rmRoutesFolder}/${rStr === "index" ? "" : rStr}`, require(`.${route}/${rStr}`)
    );
  }
  console.log(directoryPath);
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    files.forEach((file) => {
      if (file.endsWith(".js")) {
        // console.log("FILE: ", file);
        setRoute(file.replace(".js", ""));
      } else {
        buildRoutes(path.join(__dirname, `${route}/${file}`), `${route}/${file}`);
      }
    });
  });
};
buildRoutes(path.join(__dirname, '/routes'), '/routes');

module.exports = router;
