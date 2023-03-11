// importing DB connection file
import "./config/database.js";
import app from "./config/app.js";
import "dotenv/config";

import { addComment, getComments, getVideo, register, signin, updateLike } from './controllers/index.js';

const PORT = process.env.PORT || 9002;

app.get("/", (req, res) => {
    res.send("hello from Vercel");
});

app.post("/register", register);
app.post("/signin", signin);

app.get("/getVideo", getVideo);
app.post("/updateLike", updateLike);

app.get("/getComments", getComments);
app.post("/addComment", addComment);

app.listen(PORT, () => {
    console.log("We are running on port 9002");
});