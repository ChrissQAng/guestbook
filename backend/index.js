import express from "express";
import cors from "cors";
import { readList, writeList } from "./filesystem.js";

const app = express();
app.use(cors());
app.use(express.static("uploads")); // brauche ich evtl. nicht!
app.use(express.json());
app.use((req, _, next) => {
  console.log("new request", req.method, req.url);
  next();
});

// endpoint: GET all

app.get("/api/v1/guestbook", (_, res) => {
  readList()
    .then((list) => res.status(200).json(list))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not read whole guest list" })
    );
});

// endpoint: POST

app.post("/api/v1/guestbook", (req, res) => {
  readList()
    .then((list) => {
      const idArray = list.map((item) => item.id);
      const newId = Math.max(...idArray) + 1;
      const newListItem = {
        id: newId,
        firstName: req.body.firstName,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      };
      const newList = [...list, newListItem];
      writeList(newList)
        .then((newList) => res.status(200).json(newList))
        .catch((err) =>
          res
            .status(500)
            .json({ err, message: "Could not write new list entry" })
        );
    })
    .catch((err) => console.log(err));
});

const PORT = 3004;
app.listen(PORT, () => console.log("server ready at port:", PORT));
