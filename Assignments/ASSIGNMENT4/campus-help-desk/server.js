const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const file = path.join(__dirname, "requests.json");

app.use(express.json());
app.use(express.static("public"));

function readRequests() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function saveRequests(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Get all requests
app.get("/api/requests", (req, res) => {
  res.json(readRequests());
});

// Get one request
app.get("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const request = requests.find(r => r.id == req.params.id);

  if (!request) return res.status(404).json({ message: "Request not found" });
  res.json(request);
});

// Add request
app.post("/api/requests", (req, res) => {
  const requests = readRequests();

  const newRequest = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority
  };

  requests.push(newRequest);
  saveRequests(requests);
  res.status(201).json(newRequest);
});

// Update request
app.put("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const index = requests.findIndex(r => r.id == req.params.id);

  if (index === -1) return res.status(404).json({ message: "Request not found" });

  requests[index] = {
    ...requests[index],
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority
  };

  saveRequests(requests);
  res.json(requests[index]);
});

// Delete request
app.delete("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const newRequests = requests.filter(r => r.id != req.params.id);

  if (newRequests.length === requests.length) {
    return res.status(404).json({ message: "Request not found" });
  }

  saveRequests(newRequests);
  res.json({ message: "Request deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
