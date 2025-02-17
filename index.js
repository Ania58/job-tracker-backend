const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");

const jobRoutes = require("./routes/jobTrackRoutes"); 

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", jobRoutes);














app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
})