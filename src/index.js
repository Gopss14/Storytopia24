// const express = require("express")
// const path = require("path")
// const app = express()
// // const hbs = require("hbs")
// const LogInCollection = require("./mongodb")
// const port = process.env.PORT || 3000
// app.use(express.json())

// app.use(express.urlencoded({ extended: false }))

// const tempelatePath = path.join(__dirname, '../tempelates')
// const publicPath = path.join(__dirname, '../public')
// console.log(publicPath);

// app.set('view engine', 'hbs')
// app.set('views', tempelatePath)
// app.use(express.static(publicPath))


// // hbs.registerPartials(partialPath)


// app.get('/signup', (req, res) => {
//     res.render('signup')
// })
// app.get('/', (req, res) => {
//     res.render('login')
// })



// // app.get('/home', (req, res) => {
// //     res.render('home')
// // })

// app.post('/signup', async (req, res) => {
    
//     // const data = new LogInCollection({
//     //     name: req.body.name,
//     //     password: req.body.password
//     // })
//     // await data.save()

//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     const checking = await LogInCollection.findOne({ name: req.body.name })

//    try{
//     if (checking.name === req.body.name && checking.password===req.body.password) {
//         res.send("user details already exists")
//     }
//     else{
//         await LogInCollection.insertMany([data])
//     }
//    }
//    catch{
//     res.send("wrong inputs")
//    }

//     res.status(201).render("home", {
//         naming: req.body.name
//     })
// })


// app.post('/login', async (req, res) => {

//     try {
//         const check = await LogInCollection.findOne({ name: req.body.name })

//         if (check.password === req.body.password) {
//             res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
//         }

//         else {
//             res.send("incorrect password")
//         }


//     } 
    
//     catch (e) {

//         res.send("wrong details")
        

//     }


// })



// app.listen(port, () => {
//     console.log('port connected');
// })





// const express = require("express");
// const path = require("path");
// const app = express();
// const LogInCollection = require("./mongodb");
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const tempelatePath = path.join(__dirname, '../tempelates');
// const publicPath = path.join(__dirname, '../public');

// app.set('view engine', 'hbs');
// app.set('views', tempelatePath);
// app.use(express.static(publicPath));

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// app.get('/', (req, res) => {
//     res.render('login');
// });

// app.post('/signup', async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     };

//     try {
//         const checking = await LogInCollection.findOne({ name: req.body.name });

//         if (checking) {
//             // If the user already exists, send a response and stop execution
//             return res.send("User details already exist");
//         } else {
//             // If the user doesn't exist, insert new user data and render home
//             await LogInCollection.insertMany([data]);
//             return res.status(201).render("home", {
//                 naming: req.body.name
//             });
//         }
//     } catch (error) {
//         // Catch and handle errors, sending a response to the client
//         return res.send("Wrong inputs");
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const check = await LogInCollection.findOne({ name: req.body.name });

//         if (check && check.password === req.body.password) {
//             // If the login credentials are correct, render the home page
//             return res.status(201).render("home", {
//                 naming: `${req.body.password} + ${req.body.name}`
//             });
//         } else {
//             // If the password is incorrect, send a response
//             return res.send("Incorrect password");
//         }
//     } catch (e) {
//         // If user details are wrong or not found, send an error response
//         return res.send("Wrong details");
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



const express = require("express");
const path = require("path");
const app = express();
const User = require("./mongodb"); // Import MongoDB model

const port = process.env.PORT || 3000;

// Middleware to Parse Incoming Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Set Paths for Templates & Static Files
const templatePath = path.join(__dirname, "../tempelates"); 
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));

// ✅ Route: Signup Page
app.get("/signup", (req, res) => {
    res.render("signup");
});

// ✅ Route: Login Page
app.get("/", (req, res) => {
    res.render("login");
});

// ✅ Route: Handle Signup
app.post("/signup", async (req, res) => {
    console.log("📥 Received Signup Request:", req.body);

    const { name, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ name });

        if (existingUser) {
            console.log("⚠️ User Already Exists:", existingUser);
            return res.status(400).send("User details already exist");
        }

        // Create a new user
        const newUser = new User({ name, password });
        await newUser.save();
        console.log("✅ User Registered Successfully:", newUser);

        return res.status(201).render("home", { naming: newUser.name });
    } catch (error) {
        console.error("❌ Error Saving User:", error);
        return res.status(500).send("Error saving user");
    }
});

// ✅ Route: Handle Login
app.post("/login", async (req, res) => {
    console.log("📥 Received Login Request:", req.body);

    try {
        // Find the user by name
        const user = await User.findOne({ name: req.body.name });

        if (!user) {
            console.log("❌ User Not Found:", req.body.name);
            return res.status(404).send("User not found");
        }

        console.log("🔍 Found User in DB:", user);

        // Check password
        if (user.password === req.body.password) {
            console.log("✅ Login Successful:", user);
            return res.status(200).render("home", { naming: user.name });
        } else {
            console.log("❌ Incorrect Password");
            return res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error("❌ Error During Login:", error);
        return res.status(500).send("Error during login");
    }
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
