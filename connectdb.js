const sql=require('mysql2');

const con=sql.createConnection(
{
host:'localhost',
user:'root',
password:'jeevan',
database:'test'
})
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
  
  // Route to fetch all mobiles
  app.get('/home', (req, res) => {
    db.getMobiles()
        .then((mobiles) => {
            res.send(mobiles);
        })
        .catch(() => {
            res.send("error");
        });
  });
  
    function addMobiles(i,n,p,r,s){

		return new Promise(function(success,reject){
		con.query(`insert into mobile(id,name,price,ram,storage) value (?,?,?,?,?)`,[i,n,p,r,s],function(err,rows,col){
		
		if(err){
		reject(err)
		}
		else {
		success(rows)
		}
		})
		
		})
		
		}
 /*         addMobiles(5,'Jeevan Konduru','20000','5GB','60GB');
        module.exports={
            addMobiles
            } 
        */