const express = require("express")
const app = express()
const port = 3000 || process.env.PORT

app.use(express.json());

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})