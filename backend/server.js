require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

const todosch = require('./model/taskschema');
const port = 3000

app.use(express.json())
app.use(cors());

mongoose.connect(process.env.database_url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get('/', async (req, res) => {
    try {
        let data = await todosch.find({}, { title: 1, date: 1, mark: 1 ,_id:1 })
        res.json(data);
    } catch (error) {
         res.status(500).json({ error: err.message });
    }

})
app.post('/task', async(req, res) => {
       
          try {
            let a = await todosch.create({
                title: req.body.title,
                date:req.body.date,
                mark:req.body.mark
            })
            res.status(201).json(a);
          } catch (error) {
            res.status(500).json({error: error.message})
          }
})
app.patch('/edit_task/:id', async (req, res) => {
    try {
    const id = req.params.id;

    const updated = await todosch.findByIdAndUpdate(
      id,
      { mark: req.body.mark },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})
app.delete('/delete/:id', async (req, res) => {
    try {
    const id = req.params.id;

    let result = await todosch.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
