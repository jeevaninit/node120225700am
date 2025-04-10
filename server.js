const express=require('express');
const app=express();
const cors = require('cors');
const db=require('./connectdb')

app.use(cors());

app.listen(4500,()=>{
console.log("Server started 4500....");
})


 app.get('/home',(req,res)=>{
res.send("Hello am from get test info....");
}) 

 app.get('/home',(req,res)=>{
    db.getMobiles()
    .then((mobiles)=>{
    res.send(mobiles)
    })
    .catch(()=>{
    res.send("erro")
    })
    
    });

    // Route to fetch mobile details by ID
app.get('/home/:id', (req, res) => {
  const mobileId = req.params.id; // Get the id from the URL
  db.getMobileById(mobileId) // Call the function to fetch mobile details by ID
      .then((mobile) => {
          if (mobile.length > 0) {
              res.send(mobile); // If mobile with the given ID exists, send it
          } else {
              res.status(404).send({ message: "Mobile not found" }); // If no mobile found, send 404
          }
      })
      .catch((err) => {
          console.error(err); // Log the error
          res.status(500).send({ message: "Error fetching mobile details" });
      });
});


    app.post('/home',(req,res)=>{
        db.addMobiles()
        .then((mobiles)=>{
        res.send(mobiles)
        })
        .catch(()=>{
        res.send("erro")
        })
        
        })
        /* 
        abcdefghijklmnopqrstuvwxyz
12345678901234567890-=          
        */
