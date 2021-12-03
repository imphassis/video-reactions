const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");

const LanguagesController = require("./controllers/LanguageController");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/languages", LanguagesController);

require("./sockets/votes")(io);

http.listen(PORT, () => console.log("App listening on PORT %s", PORT));
