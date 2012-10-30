var express = require('express'),
    http = require('http'),
    config = require('config'),
    cons = require('consolidate'),
    swig = require('swig'),
    connect = require('connect'),
    async = require('async'),
    pg = require('pg'),
    Router = require('reversable-router');

var funnel = require('./funnel.js');

var app = express();

app.use( connect.favicon( 'static/img/favicon.ico' ) ); //if pass custom favicon as path if you want (must be ico)
app.use( connect.logger('tiny') );
app.use( connect.errorHandler() );

var router = new Router();

app.locals( {
    'debug': true,
    'version': function() {
        return 0.1;
    },
    router: router
} );


app.engine( '.html', cons.swig );
//app.set( 'view engine', 'html' );
dbconf = {
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
};
db = new pg.Client( dbconf);
db.connect();
fi = new funnel.Funnel( db );


swig.init( {
    root: './views/',
    allowErrors: true,
    tags: require( './tags' ),
    extensions: {
        router: router,
    }
} );
app.set('views', './views');

function click( req, res, next ) {
    res.render( 'full_list.html', {} );
}
function filter_tag( req, res, next ) {
    res.render( 'full_list.html', {} );
}
function filter_source( req, res, next ) {
    res.render( 'full_list.html', {} );
}
function search_autocomplete( req, res, next ) {
    res.render( 'full_list.html', {} );
}
function searchy( req, res, next ) {
    res.render( 'full_list.html', {} );
}
function newstuff( req, res, next ) {
    res.render( 'full_list.html', {} );
}
function home( req, res, next ) {
    fi.listArticles( function( err, dbres ) {
        console.log( 'list some articles' );
        if( err ) {
            console.log( err );
        } else {
            rows = dbres.rows;
            res.render( 'full_list.html', { article_list: rows } );
        }
    } );
}

router.extendExpress(app);
router.registerAppHelpers(app);

app.get( '/click/:id', "click", click );
app.get( '/tag/:tag', "filter_tag", filter_tag );
app.get( '/source/:source', "filter_source", filter_source );
app.get( '/search_autocomplete', "search_autocomplete", search_autocomplete );
app.get( '/search', "search", searchy );
app.get( '/new/:since', "newstuff", newstuff );
app.get( '/', "home", home );


port = 3000;
app.listen( port );
console.log( "I'm running on port " + port );
