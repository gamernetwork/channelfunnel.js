urlpatterns = [
    url( r'^click/(?P<article_id>[^/\^?]+)$', 'channelfunnel.content.views.click', name='click' ),
    url( r'^tag/(?P<tag>[^/\^?]+)$', 'channelfunnel.content.views.filter_tag', name='filter_tag' ),
    url( r'^source/(?P<source>.+)$', 'channelfunnel.content.views.filter_source', name='filter_source' ),
    url( r'^search_autocomplete/$', 'channelfunnel.content.views.search_autocomplete', name='search_autocomplete' ),
    url( r'^search/$', 'channelfunnel.content.views.search', name='search' ),
    url( r'^new/(?P<since>.+)$', 'channelfunnel.content.views.new', name="new" ),
    url( r'^$', 'channelfunnel.content.views.home', name="home" ),
]
