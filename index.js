import express from "express";

const app = express();

const port = 5000;
 
app.use (express.json());

let users = [
{id:1 , name: "bahal"},
{id:2 , name: "suus"}
];


app.get("/api/users" , (req, res) => {
    res.json(users);
});

app.get("/api/users/id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});


// POST create data
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update all data of a user
app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name; // replace whole name
  res.json(user);
});

// PATCH update part of user
app.patch("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.body.name) user.name = req.body.name; // update only name if provided
  res.json(user);
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

app.listen(port, () => console.log(`server running on port ${port}`));