//import Express
import express from 'express';


//Instantiate an Express application 
const app = express();


//Serve static files from the 'public' directory
app.use(express.static('public'));

//
app.use(express.urlencoded({ extended: true }));

//setting view engine
app.set('view engine', 'ejs');

//Define a port number for our server to listen on 
const PORT = 3000;


    // Array to store form data. memory database
    const guestbookstorage = [];



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

     app.post('/submit', (req, res) =>{ 
            console.log(req.body);

            //variables to help with validation
            const submission = { 
                name: req.body.name,
                company: req.body.company,
                Email: req.body.Email,
                meet: req.body.howdidwemeet,
                timestamp: new Date()
            }
            if (submission.name.trim() == "") //looks at field in submission variable and trims any white space at beg and end of word
                {
                    res.send("Invalid Input");
                    return;
                }

                if (submission.Email.trim() == "") //looks at field in submission variable and trims any white space at beg and end of word
                {
                    res.send("Invalid Input");
                    return;
                }

    // const { firstName, lastName, email } = req.body;
    guestbookstorage.push(submission); //everytime a submision is made it pushes to guestbookstorage after validation is made by if statmenent
    res.render('confirmation', {submission}); //allows submission data to be sent to the confirmation page 
    });   

                
        app.get('/admin/form', (req, res) => {
            res.render("admin", {guestbookstorage});
        });

    //Tell the server to listen on our specified port
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });

    //npm init -y is initiliazing packages like package.json
    //npm install express ejs adds ejs as a depency in the package.json file
    //npm install when a change to the app.js file is made server is made it refreshes the server automatically. 