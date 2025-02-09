//import Express
import express from 'express';

//Instantiate an Express application 
const app = express();

//Serve static files from the 'public' directory
app.use(express.static('public'));

//
app.use(express.urlencoded({ extended: true }));



//Define a port number for our server to listen on 
const PORT = 3000;


                // Array to store form data. memory database
                const guestbookStorage = [];



//Define a "default" route for our home page 
app.get('/', (req,res) => 
    {
        //Send our home page as a response to the client
        res.sendFile(`${import.meta.dirname}/views/home.html`);
    });

 /*   //confirmation page route
    app.post('/', (req, res) =>
        {
            //post
            res.sendFile(`${import.meta.dirname}/views/home.html`);
        });
    */
/*
    //Define a "thank you" route
    app.post('/thankyou', (req, res) => {
            //send our thank you page
            res.sendFile(`${import.meta.dirname}/views/thankyou.html`);
        });
    */

     app.post('/submit', (req, res) =>{
            console.log(req.body);
            guestbookStorage.push(req.body);
            res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
        });   

                
        app.get('/admin/form', (req, res) => {
            res.send(guestbookStorage);
        });

    //Tell the server to listen on our specified port
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });