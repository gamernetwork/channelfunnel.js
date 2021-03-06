var express = require('express'),
    http = require('http'),
    config = require('config'),
    cons = require('consolidate'),
    swig = require('swig'),
    connect = require('connect'),
    async = require('async'),
    dbi = require('node-dbi'),
    XRegExp = require('xregexp').XRegExp,
    Router = require('reversable-router');

var funnel = require('./funnel.js');

var app = express();

app.set('views', './views');
app.use( express.favicon( 'static/img/favicon.ico' ) ); //if pass custom favicon as path if you want (must be ico)
app.use( express.logger('dev') );
app.use( express.errorHandler() );
app.use( express.bodyParser() );
app.engine( '.html', cons.swig );
//app.set( 'view engine', 'html' );
app.locals( {
    'debug': true,
    'version': function() {
        return 0.1;
    },
    router: router
} );

var router = new Router();



dbconf = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
};
db = new dbi.DBWrapper( 'pg', dbconf);
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
    fi.listArticles( 20, function( err, dbres ) {
        if( err ) {
            console.log( err );
        } else {
            rows = dbres;
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

app.use(require('stylus').middleware(__dirname + '/static'));
app.use( express.static( __dirname + "/static" ) );

port = 3000;
app.listen( port );
console.log( "I'm running on port " + port );
