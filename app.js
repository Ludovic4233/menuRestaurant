//on déclare une constante qui contiendra l'export du module express
const express = require('express');
//on déclare une constante qui contiendra l'export du module fs
const fs = require('fs');
//une fonction express qui créé une application express
const app = express();
// On déclare une constante qui contiendra l'export du module body-parser
const bodyParser = require("body-parser");
// Je vais dire à Express d'utiliser bodyParser pour lire le contenue du body en json
app.use(bodyParser.json());


//c'est un route par défault qui renvois une chaine de caractère
//GET "/"
//Ex: http://localhost:3000/
app.get('/', (request, response) =>{
    //on utilise la réponse du middleware d'Express pour envoyez sur
    response.send('bienvenu sur le menu!');
});


//c'est une route qui va permettre d'afficher les données contenu dans le fichier data.json en JSON dans la requetes
//GET "/data"
//http://localhost:3000/data
app.get('/data', (request, response) => {
    fs.readFile('data.json', (err, data) =>{
        //on vas utiliser la méthode qui vient du module "fs" pour lire et retourner le contenue du fichier en chaine de caractère
        if(err){
            response.status(500).json({
                message: "Une erreur lors de la lecture des données",
                error: err
            });
        }else{
            response.status(200).json(JSON.parse(data));
        }
    });
});


//c'est une route qui permet de récupérer une data par son id
//GET "/data/:id"
//Ex: http://localhost:3000/data/1
app.get("/data/:id", (request, response) =>{
    //Je vais utiliser la méthode readfile du module fs pou pouvoir récupérer l'entièreté du fichier
    fs.readFile("data.json", (err, data) =>{
        //Je met une condition si il y a une erreur dans le callback
        if(err){
            //Je renvoie une réponse status 500 avec un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du menu",
                error: err,
            })
        }else{
            //Je parse la chaine de caractères en Json pour le transformez en JSON manipulable
            const jsonData = JSON.parse(data)
            //Je vais cherchez dans ce fichier si l'id correspondants en paramètres existe dans le contenue
            const dataId = jsonData.data.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
            //si on trouve un objet avec cet id
            if(dataId){
                //si on trouve un objet avec cet id
                response.status(200).json(dataId); 
            }else{
                //on renvoie une réponse avec un status 404 avec un message d'erreur
                response.status(404).json({
                    message: "Aucun plat trouvé avec cet id"
                })
            }
        }
    })
})

// C'est une route qui me permet d'insérer de la données dans mon fichier data.json
// POST "/data"
// Ex: http://localhost:3000/data
app.post("/data", (request, response) => {
    // lire le contenu du fichier
    fs.readFile("data.json", (err, data) => {
      // si une erreur sur la lecture du fichier
      if (err) {
        response.status(500).json({
          message: "Une erreur est survenue lors de la lecture des données",
        });
      } else {
        // stocker les données existante
        const existingData = JSON.parse(data);
        // rajouter ma donnée à moi
        existingData.data.push(request.body);
        // je vais reécrire le fichier avec les nouvelles données
        fs.writeFile("data.json", JSON.stringify(existingData), (writeErr) => {
          // si il ya une erreur au moment de l'écriture
          if (writeErr) {
            response.status(500).json({
              message: "Une erreur est survenue lors de l'écriture des données",
            });
          } else {
            response.status(200).json({
              message: "Les données ont été ajouter avec succès",
            });
          }
        });
      }
    });
  });


//on écoute le port sur lequel le server tourne
app.listen(3000, ()=>{
    console.log("l'application tourne sur le port 3000");
});
