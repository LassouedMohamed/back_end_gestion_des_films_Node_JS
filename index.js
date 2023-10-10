const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require("mysql2");
const bcrypt = require('bcryptjs');




app.use(cors({ credentials: true}));
app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.send("Welcome home");
});


// connection a la bd
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"db_films"
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connection done");
})

// CRUD Genre
app.get("/getGenre",(req, res)=> {
    const sql = "SELECT * FROM genre";
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("selectionner tout les genres");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.send(result);
    });
});

app.get("/getGenre/:id",(req, res)=> {
    const sql = "SELECT * FROM genre WHERE id ="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("selectionner un genre");
        res.send(result);
    });
});

app.post("/addGenre",(req, res)=> {
    const genre = req.body;
    const sql = "INSERT INTO genre set ?";
    const query = db.query(sql, genre, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("ajouter avec success");
    });
});

app.get("/deleteGenre/:id",(req, res)=> {
    const sql = "DELETE FROM genre WHERE id ="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.send("genre supprimer");
    });
});

app.post("/updateGenre/:id", (req, res) => {
    const genre = req.body
    const sql = "UPDATE genre SET ? WHERE id =" + (req.params.id);
    const query = db.query(sql, genre, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.send("modifier avec success");
    });
    
});


// CRUD Realisateur

app.get("/getRealisateur",(req, res)=> {
    const sql = "SELECT * FROM realisateur";
    const query = db.query(sql, (err, result) => { 
        if (err){
            throw err;
        }
        console.log("selectionner tout les realisateurs");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.send(result);
    });
});

app.get("/getRealisateur/:id",(req, res)=> {
    const sql = "SELECT * FROM realisateur WHERE id ="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("selectionner un realisateur");
        res.send(result);
    });
});

app.post("/addRealisateur",(req, res)=> {
    const realisateur = req.body;
    const sql = "INSERT INTO realisateur SET ?";
    const query = db.query(sql, realisateur, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("ajouter avec success");
    });
});

app.get("/deleteRealisateur/:id",(req, res)=> {
    const sql = "DELETE FROM realisateur WHERE id ="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("realisateur supprimer");
    });
});

app.post("/updateRealisateur/:id", (req, res) => {
    const realisateur = req.body
    const sql = "UPDATE realisateur SET ? WHERE id =" + (req.params.id);
    const query = db.query(sql, realisateur, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("modifier avec success");
    });
});

// CRUD FILM
app.get("/getFilm",(req, res)=> {
    const sql = "SELECT f.id, f.titre, f.description, g.type, annee_sortie, r.nom, duree, note  FROM film f, genre g, realisateur r where f.genre = g.id and f.realisateur= r.id";
    const query = db.query(sql, (err, result) => { 
        if (err) throw err;
        console.log("selectionner tout les films");
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.send(result);
    });
});

app.get("/getFilm/:id",(req, res)=> {
    const sql = "SELECT f.id, titre, description, g.type, annee_sortie, r.nom, duree, note  FROM film f, genre g, realisateur r where f.genre = g.id and f.realisateur= r.id and f.id="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) throw err;
        console.log("selectionner un film");
        res.send(result);
    });
});


app.post("/addFilm",(req, res)=> {
    const film = req.body;
    const sql = "INSERT INTO film SET ?";
    const query = db.query(sql, film, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("ajouter avec success");
    });
});

app.get("/deleteFilm/:id",(req, res)=> {
    const sql = "DELETE FROM film WHERE id ="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("film supprimer");
    });
});

app.post("/updateFilm/:id", (req, res) => {
    const film = req.body
    const sql = "UPDATE film SET ? WHERE id =" + (req.params.id);
    const query = db.query(sql, film, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("modifier avec success");
    });
});

//CRUD USER

app.get("/getUser",(req, res)=> {
    const sql = "SELECT * from user;";
    const query = db.query(sql, (err, result) => { 
        if (err) throw err;
        console.log("selectionner tout les Users");
        res.send(result);
    });
});

app.get("/getUser/:id",(req, res)=> {
    const sql = "SELECT * from user where id="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) throw err;
        console.log("selectionner un User ");
        res.send(result);
    });
});


app.post("/addUser", (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    const newpass = bcrypt.hashSync(body.password, salt);
    body.password = newpass;
    const sql = "INSERT INTO user SET ?";
    const query = db.query(sql, body, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("ajouter avec success");
    });
});

app.get("/deleteUser/:id",(req, res)=> {
    const sql = "DELETE FROM user WHERE id ="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("User supprimer");
    });
});

app.post("/updateUser/:id", (req, res) => {
    const user = req.body
    const sql = "UPDATE user SET ? WHERE id =" + (req.params.id);
    const query = db.query(sql, user, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("modifier avec success");
    });
});


//CRUD FAVORISE

app.get("/getFavorise",(req, res)=> {
    const sql = "SELECT * from favorise ";
    const query = db.query(sql, (err, result) => { 
        if (err) throw err;
        console.log("selectionner tout les favorises");
        res.send(result);
    });
});

app.get("/getFavorise/:idUser/:idFilm",(req, res)=> {
    const sql = "SELECT * from favorise iduser="+(req.params.idUser)+" and idfilm ="+(req.params.idFilm);
    const query = db.query(sql, (err, result) => { 
        if (err) throw err;
        console.log("selectionner un favorise ");
        res.send(result);
    });
});


app.post("/addFavorise", (req, res) => {
    const body = req.body;
    const sql = "INSERT INTO favorise SET ?";
    const query = db.query(sql, body, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("ajouter avec success");
    });
});

app.get("/deleteFavorise/:id",(req, res)=> {
    const sql = "DELETE FROM favorise WHERE id ="+(req.params.id);
    const query = db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        console.log("resultat");
        res.send("Favorise supprimer");
    });
});

// CONNEXION

app.post("/auth", (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    const newpass = bcrypt.hashSync(body.password, salt);
    body.password = newpass;
    const sql = "select * from user WHERE  email = "+"'"+body.email+"'" ;
    const query = db.query(sql, (err, result) => {
        if (err)
            throw err;
        res.send(result);
    })
    
})

app.listen(5000, () => {
    console.log("server is running on port 5000");
 });