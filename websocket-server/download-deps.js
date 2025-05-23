const https = require("https");
const fs = require("fs");
const path = require("path");

const LIBS_DIR = path.join(__dirname, "src", "public", "libs");

if (!fs.existsSync(LIBS_DIR)) {
  fs.mkdirSync(LIBS_DIR, { recursive: true });
}

const files = [
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
    filename: "materialize.min.css",
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
    filename: "materialize.min.js",
  },
  {
    url: "https://fonts.googleapis.com/icon?family=Material+Icons",
    filename: "material-icons.css",
  },
];

files.forEach((file) => {
  https
    .get(file.url, (response) => {
      const filePath = path.join(LIBS_DIR, file.filename);
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on("finish", () => {
        console.log(`Downloaded: ${file.filename}`);
        fileStream.close();
      });
    })
    .on("error", (err) => {
      console.error(`Error downloading ${file.filename}:`, err);
    });
});
