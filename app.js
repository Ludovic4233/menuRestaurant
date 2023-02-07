//correction: on déclare une constante qui contiendra l'export du module express
const express = require('express');
//correction: on déclare une constante qui contiendra l'export du module fs
const fs = require('fs');
//une fonction express qui créé une application express
const app = express();


//GET "/"
//Ex: http://localhost:3000/
app.get('/', (request, response) =>{
    //on utilise la réponse du middleware d'Express pour envoyez sur
    response.send('bienvenu sur le menu!');
});


//lorsqu'on suivra le routage /data une fonction sera appelé
//cette fonction utilise la fonction readfile() proposer par le module fs pour lire le fichier data.json.
app.get('/data', (request, response) => {
    fs.readFile('data.json', (err, data) =>{
        //une fonction est déclenché. Si la réponse à l'appelle de la fonction possède le status 500 un message d'erreur est renvoyé.
        //si la réponse possède le status 200. on transforme le le fichier data.json en objet json (JSON.parse(data)).
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



app.listen(3000, ()=>{
    console.log("l'application tourne sur le port 3000");
});
