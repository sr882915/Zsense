const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const port = process.env.PORT || 4000;
const User = require('./src/models/user');
const Customer = require('./src/models/customer');
const hbs = require('hbs');
const Razorpay = require('razorpay');
var favicon = require('serve-favicon')
const fastestValidator = require('fastest-validator')

const v = new fastestValidator();




const templatesPath = path.join(__dirname, "/templates/views");
const partialPath = path.join(__dirname, "/templates/partials");

// view engine     
app.set('view engine', 'hbs'); //for default path
app.set("views", templatesPath);
hbs.registerPartials(partialPath);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use(express.static(path.join(__dirname, "/public/")));
app.use("/public", express.static('public'));


var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};


app.get("/", sessionChecker, (req, res) => {
  res.redirect("/dashboard");
});

// write login route  
app.route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    var email = req.body.email
    var password = req.body.password
    try {
      var user = await User.findOne({ email: email }).exec();

      if (!user) {
        res.redirect("/login");
      }
      user.comparePassword(password, (error, match) => {
        if (!match) {
          res.redirect("/login");
        }
      });

      req.session.user = user;
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  })

app
  .route("/register")
  .get(sessionChecker, (req, res) => {
    res.render("register")
  })
  .post((req, res) => {

    var user = new User({
      name: req.body.rname,
      m_no: req.body.rnumber,
      email: req.body.remail,
      password: req.body.rpassword
    })

    user.save((err, docs) => {
      if (err) {
        res.redirect("/register");
      } else {
        console.log(docs)
        req.session.user = docs;
        res.redirect("/dashboard");
      }
    })
  });
// contact routing    
app
  .route("/contact")
  .post((req, res) => {
    if (req.session.user && req.cookies.user_sid) {

      var cust = new Customer({
        name: req.body.name,
        m_no: req.body.number,
        email: req.body.email,
        message: req.body.message
      })
      cust.save((err, docs) => {
        if (err) {
         
          res.send(err)
        } else {
          console.log(docs)
          req.session.user = docs;
          res.redirect("/");
        }
      })
    }else{
      res.send("Please go back to the homepage and login first as value our customers quary very seriously and it's our top priority to solve this problem")
    }

  });

// dashboard page   
app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render('dashboard');
  } else {
    res.redirect("/home");
  }
});
app.get('/home', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render('dashboard');
  } else {
    res.render('home');
  }
})
app.get('/pricing', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render('pricing');
  } else {
    res.render('login');
  }
})
// app.get('/pay', (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     res.render('pay');
//   } else {
//     res.render('login');
//   }
// })

app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect("/login");
  } else {
    res.redirect("/login")
  }
})
// privacy policy and others routing  
app.get('/privacy_policy', (req, res) => {
  res.render('privacyPolicy');
})
app.get('/about', (req, res) => {
  res.render('about');
})
app.get('/dmca', (req, res) => {
  res.render('dmca');
})
app.get('/terms', (req, res) => {
  res.render('terms');
})

app.get('*', function (req, res) {
  res.status(404).render('error');
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

