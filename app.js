const express = require('express');
const app = new express();
const cors =require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const BookModel = require('./src/model/bookModel');
const AuthorModel = require('./src/model/authorModel');
const UserModel = require('./src/model/registerModel');
const mongoose = require('mongoose');
const registerData = require('./src/model/registerModel');
const port = process.env.PORT || 3000;
const MongoURI = "mongodb+srv://userOne:1234@cluster0.vpzga.mongodb.net/LibraryMEAN?retryWrites=true&w=majority";

    mongoose.connect(MongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then((res)=>{console.log("MongoDB Connected");})

app.use(express.static('./dist/Library-App'));
app.use(express.json());
app.use(cors());

// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,'../Frontend/src/assets/uploads');
//     },
//     filename: (req,file,cb)=>{
//         cb(null,Date.now() + file.originalname);
//     }
// });

// const upload = multer({
//     storage:storage,
//     limits:{
//         fieldSize:1024 * 1024 * 3
//     }
// });

    // const verifyToken = (req,res,next)=>{
    //     if(!req.headers.authorization){
    //         return res.status(401).send("Unauthorized Request")
    //     }
    //     let token = req.headers.authorization.split('')[1]
    //     if(token ==='null'){
    //         return res.status(401).send("Unauthorized Request")
    //     }
    //     let payload = jwt.verify(token,'secretKey')
    //     console.log(payload);
    //     if(!payload){
    //         return res.status(401).send("Unauthorized Request")
    //     }
    //     req.userId = payload.subject
    //     next()
    // }



    // BOOK ROUTES
    app.get('/api/books',(req,res)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE"); 
        BookModel.find()
        .then((books)=>{
            res.send(books);
        });
    });

    // SINGLE BOOK
    app.get('/api/books/:i',(req,res)=>{
    
        const id = req.params.i;
        // console.log("Book Id = " + id);   //Testing
        BookModel.findOne({_id:id})
        .then((book)=>{
            // console.log(book);    //Testing
            res.send(book);
        
        });
        
    });

    // ADD BOOK:
    app.post('/api/addBook',(req,res)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE"); 
        // console.log("Book data = "+req.body.book);   //Testing

        var book = {
            bookTitle:req.body.book.bookTitle,
            bookAuthor:req.body.book.bookAuthor,
            pages:req.body.book.pages,
            publishedDate:req.body.book.publishedDate,
            genre:req.body.book.genre,
            lang:req.body.book.lang,
            img:req.body.book.img
        };
        var book = new BookModel(book);
        book.save();

    });

    // UPDATE book
    app.put('/api/updateBook',(req,res)=>{
        console.log(req.body);
        id = req.body._id,
        bookTitle = req.body.bookTitle,
        bookAuthor = req.body.bookAuthor,
        pages = req.body.pages,
        publishedDate = req.body.publishedDate,
        genre = req.body.genre,
        lang = req.body.lang,
        img = req.body.img

        BookModel.findByIdAndUpdate({_id:id},
                                    {$set:{"bookTitle":bookTitle,
                                            "bookAuthor":bookAuthor,
                                            "pages":pages,
                                            "publishedDate":publishedDate,
                                            "genre":genre,
                                            "lang":lang,
                                            "img":img }})
            .then(()=>{
                res.send();
            })
    });

    // DELETE BOOK:
    app.delete('/api/deleteBook/:i',(req,res)=>{
        id = req.params.i;
        BookModel.findByIdAndDelete({"_id":id})
        .then(()=>{
            console.log("Delete Book success");
            res.send()
        });
    });


    // AUTHORS ROUTE------------------------------------------------------------
    // DISPLAY AUTHORS - GET API:
    app.get('/api/authors',(req,res)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE"); 

        AuthorModel.find()
        .then((authors)=>{
            res.send(authors);
            // console.log("From DB" + authors);
        });
    });

    // GET AUTHOR ID & DISPLAY SINGLE AUTHOR:
        app.get('/api/authors/:i',(req,res)=>{
            let id = req.params.i;
            // console.log("Author ID from Backend = "+id);
            AuthorModel.findOne({_id:id})
            .then((author)=>{
                // console.log("Author Data from Backend = "+author);
                res.send(author);
            });
        });

        // ADD AUTHOR API:
        app.post('/api/addAuthor',async(req,res)=>{
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE"); 

            var author = new AuthorModel({
                authorName: req.body.author.authorName,
                nationality : req.body.author.nationality,
                a_dob : req.body.author.a_dob,
                a_gender : req.body.author.a_gender,
                works : req.body.author.works,
                img: req.body.author.img
            });

            // console.log("Upload = "+req.body.author); 
            try{
                author = await author.save();

            }
            catch(err){
                console.error(err);
            }
        });

        // UPDATE AUTHOR:
        app.put('/api/updateAuthor',(req,res)=>{
            console.log(req.body);
            id = req.body._id,
            authorName = req.body.authorName,
            nationality = req.body.nationality,
            a_dob = req.body.a_dob,
            a_gender = req.body.a_gender,
            works = req.body.works,
            lang = req.body.lang,
            img = req.body.img

            AuthorModel.findByIdAndUpdate({_id:id},
                {$set:{"authorName":authorName,
                        "nationality":nationality,
                        "a_dob":a_dob,
                        "a_gender":a_gender,
                        "works":works,
                        "img":img }})
                .then(()=>{
                res.send();
                })
        });

        // DELETE AUTHOR:
        app.delete('/api/deleteAuthor/:i',(req,res)=>{
            id = req.params.i;
            AuthorModel.findByIdAndDelete({"_id":id})
            .then(()=>{
                console.log("Delete Author success");
                res.send()
            });
        });

        
    // REGISTER USER---------------------------------------------
    app.post('/api/registerUser',async(req,res)=>{
        console.log(req.body.user);
        var user = UserModel({
            name:req.body.user.name,
            mob:req.body.user.mob,
            email:req.body.user.email,
            pass:req.body.user.pass,
            // re_pass:req.body.user.re_pass
        });
        try{
            user = await user.save();
            res.send();
        }
        catch(err){
            console.error("Error from Backend = "+err);
        }
    });
    // app.post('/loginUser',async(req,res)=>{
    //     res.header("Access-Control-Allow-Origin","*");
    //     res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE"); 
    //     console.log(req.body.loguser);
    //     let email = req.body.loguser.email;
    //     const user =await UserModel.findOne({email})
    //     // TO BE DONE----------------------------------------------------
    // });

    // LOGIN USER-----------------------------------------------------------
    app.post('/api/login',(req,res)=>{
        let userDetails = req.body;
        let adminEmail = 'admin';
        let adminPass ='123456'

        if(userDetails.email ==='admin' && userDetails.pass ==='123456'){
            let payload = {subject:adminEmail+adminPass}
            let tokenAdmin = jwt.sign(payload,'ADMIN-KEY');
            // console.log("token admin = "+tokenAdmin);  //Testing
            res.status(200).send({tokenAdmin});
            console.log("Admin Logged in");
        }
        else{
            registerData.findOne({email:userDetails.email,pass:userDetails.pass},(err,user)=>{
                if(err){
                res.status(401).send("Something went wrong, No response")
                }
                else if(!user){
                    res.status(401).send("Invalid User Details")
                }
                else if(user){
                    let userPayload = {subject:userDetails.email+userDetails.pass}
                    let tokenUser = jwt.sign(userPayload,"USER-KEY")
                    res.send({tokenUser})
                    console.log("user logged in");
                }
                else{
                    console.log("Login Failed");
                    res.send();
                    
                }
            })
        }

        // if(!userCredentials.email){
        //     res.status(401).send("Invalid Email/Username");
        // }
        // else if(userCredentials.pass!==userDetails.pass) {
        //     res.status(401).send("Invalid Password")
        // }
        // else{
        //     let payload = {subject:userCredentials.email+userCredentials.pass}
        //     let token = jwt.sign(payload,'secretKey')
        //     res.status(200).send({token});
        // }
    });

    // PRIMARY ROUTE FOR STATIC FILES----------------------------------------
    app.get('/*',(req,res)=>{
        res.sendFile(path.join(__dirname + '/dist/Library-App/index.html'));
    });




    app.listen(port,()=>{console.log("Server ready at " +port);});