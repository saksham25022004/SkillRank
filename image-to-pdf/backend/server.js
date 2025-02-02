const express = require("express");

const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const generate = require("./routes/generateRoutes");
app.use('/api', generate);

app.listen(port, () => console.log(`Server running on ${port}`));
