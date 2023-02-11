import express from "express";
const app = express();
const PORT = 5000;
import fetch from "node-fetch";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/:url", async (req, res) => {
  console.log(req.query.url.replace(/ /g, "%20"));
  try {
    const response = await fetch(req.query.url.replace(/ /g, "%20"), {
      headers: req.headers,
      method: "GET",
    });
    try {
      res.send(await response.json());
    } catch (error) {
      console.log(error);
      res.send({ error: "Api Response is not proper" });
    }
  } catch (error) {
    console.log("error", error);
    res.send(error);
  }
});

app.post("/:url", (req, res) => {
  try {
    console.log(req.params.url, req.query);
    fetch(req.query.url.replace(/ /g, "%20"), {
      method: "POST",
      headers: req.headers,
      body: JSON.stringify(req.body),
    }).then((data) => data.json().then((d) => res.send(d)));
  } catch (e) {
    console.log("error", e);
    res.send({
      forward_url_error: "Something went wrong in forwarding the url",
    });
  }
});

app.listen(PORT, () => {
  console.log("Proxy server is running on port 5000");
});
