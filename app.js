// news api key: b8f1b48216104e52b3469867d63f9eac

const express = require('express');
const path = require('path');
const queries = require('./Queries');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b8f1b48216104e52b3469867d63f9eac');

//Init app
const app = express();

//Create body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Set public folder static
app.use(express.static(path.join(__dirname, 'public')));

//Set template engine to Pug for folder views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Routes

//Home
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page"
    });
});

//Headlines
app.get('/headlines', (req, res) => {
    if ((Object.keys(req.query).length !== 2)
        || !(queries.categories.includes(req.query.category))
        || !(queries.countries.includes(req.query.country))){
        res.redirect('/');
    } else {
        newsapi.v2.topHeadlines({
            category: req.query.category,
            country: req.query.country,
        }).then((succ, err) => {
            if(err) {
                console.log(err);
            } else {
                res.render('head', {
                    title: "Top Headlines Page",
                    results: succ.articles
                });
            }
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));