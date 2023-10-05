const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes')
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router)

app.listen(PORT, () => {
  console.log(`I love you ${PORT}`);
});