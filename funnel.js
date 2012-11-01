// funnel database layer

exports.Funnel = function( db ) {

    this.db = db;

    this.listArticles = function(limit, callback) {
        this.db.fetchAll('SELECT content_article.*, content_source.title as source_title, content_source.code as source_code FROM content_article inner join content_source ON content_article.source_id = content_source.id LIMIT ?', [limit], callback);
    }
    this.newArticles = function(since, callback) {
        this.db.fetchAll('SELECT content_article.*, content_source.title as source_title, content_source.code as source_code FROM content_article inner join content_source ON content_article.source_id = content_source.id', [since], callback);
    }

}

