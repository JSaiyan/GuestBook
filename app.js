//import Express
import express from 'express';
import mariadb from 'mariadb';
import { validateForm } from './services/validation.js';
import dotenv from 'dotenv';

dotenv.config();

//define our database credentials
const pool = mariadb.createPool({  //this can be hacked if shared
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

});

async function connect()
{
    try
    {
        const conn = await pool.getConnection();
        console.log('Connected to the database!')
        return conn;
    } 
    catch (err)
    {
        console.log(`Error connecting to the database ${err}`)
    }
}

//Instantiate an Express application 
const app = express();


//Serve static files from the 'public' directory
app.use(express.static('public'));

//
app.use(express.urlencoded({ extended: true }));

//setting view engine
app.set('view engine', 'ejs');

//Define a port number for our server to listen on 
const PORT = process.env.APP_PORT || 3000;


    // Array to store form data. memory database
   // const guestbookstorage = [];



//Define a "default" route for our home page 
app.get('/', (req,res) => 
    {
        //Send our home page as a response to the client
        res.render(`home`); //render works with ejs files res.send is for html
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

app.post('/submit', async (req, res) => 
{ 
           console.log(req.body);

            //variables to help with validation //client looks at the ID. Server looks at the name
            //
            const submission = 
            {  
                name: req.body.name,
                company: req.body.company,
                Email: req.body.Email,
                howdidwemeet: req.body.howdidwemeet,
                timestamp: new Date() 
            };

            const result = validateForm(submission); //result of validate method will be true or false. Tells form
        
            
                if(!result.isValid)
                    {
                        res.send(result.errors)
                        return;
                    }

                    const conn = await connect();

                    const insertQuery = await conn.query(`INSERT INTO 
                        guest(name, company, Email, howdidwemeet) 
                        VALUES(?,?,?,?)`, 
                        [submission.name,
                        submission.company,
                        submission.Email,
                        submission.howdidwemeet]);

                        res.render('confirmation', { submission });
});


    //Tell the server to listen on our specified port
    app.listen(PORT, () => 
        {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
