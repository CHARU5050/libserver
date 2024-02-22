const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'123',
    database:'library',
})

app.post('/add', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const subject = req.body.subject;
    const date = req.body.date;
    db.query('INSERT INTO lib (title, author, subject, date) VALUES (?, ?, ?, ?)', [title, author, subject, date], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            console.log("inserted");
            res.send("Values are inserted");
        }
    });
});


app.get('/books',(req,res)=>{

    db.query('SELECT * FROM lib',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);

        }

    })

})
