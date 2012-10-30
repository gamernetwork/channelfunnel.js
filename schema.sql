CREATE TABLE content_article (
    id integer NOT NULL,
    source_id integer NOT NULL,
    status character varying(10) NOT NULL,
    is_duplicate boolean NOT NULL,
    duplicate_of_id integer,
    date_created timestamp with time zone NOT NULL,
    source_reference character varying(250) NOT NULL,
    source_url character varying(250),
    title text NOT NULL,
    num_comments integer NOT NULL,
    summary text NOT NULL,
    body text NOT NULL,
    image text NOT NULL,
    author text NOT NULL,
    date_published timestamp with time zone NOT NULL,
    duplicate_simscore double precision
);

CREATE SEQUENCE content_article_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE content_article_id_seq OWNED BY content_article.id;

CREATE TABLE content_source (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    scraper character varying(50) NOT NULL,
    scraper_config text NOT NULL,
    code character varying(50) NOT NULL,
    status character varying(10) NOT NULL
);


CREATE SEQUENCE content_source_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE content_source_id_seq OWNED BY content_source.id;

CREATE TABLE taggit_tag (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL
);

CREATE SEQUENCE taggit_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taggit_tag_id_seq OWNED BY taggit_tag.id;

CREATE TABLE taggit_taggeditem (
    id integer NOT NULL,
    tag_id integer NOT NULL,
    object_id integer NOT NULL,
    content_type_id integer NOT NULL
);

CREATE SEQUENCE taggit_taggeditem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE taggit_taggeditem_id_seq OWNED BY taggit_taggeditem.id;

ALTER TABLE ONLY content_article
    ADD CONSTRAINT content_article_pkey PRIMARY KEY (id);

ALTER TABLE ONLY content_article
    ADD CONSTRAINT content_article_source_reference_key UNIQUE (source_reference);

ALTER TABLE ONLY content_source
    ADD CONSTRAINT content_source_pkey PRIMARY KEY (id);

ALTER TABLE ONLY taggit_tag
    ADD CONSTRAINT taggit_tag_pkey PRIMARY KEY (id);

ALTER TABLE ONLY taggit_tag
    ADD CONSTRAINT taggit_tag_slug_key UNIQUE (slug);

ALTER TABLE ONLY taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_pkey PRIMARY KEY (id);

CREATE INDEX content_article_duplicate_of_id ON content_article USING btree (duplicate_of_id);

CREATE INDEX content_article_source_id ON content_article USING btree (source_id);

CREATE INDEX taggit_taggeditem_content_type_id ON taggit_taggeditem USING btree (content_type_id);

CREATE INDEX taggit_taggeditem_object_id ON taggit_taggeditem USING btree (object_id);

CREATE INDEX taggit_taggeditem_tag_id ON taggit_taggeditem USING btree (tag_id);

ALTER TABLE ONLY content_article
    ADD CONSTRAINT content_article_source_id_fkey FOREIGN KEY (source_id) REFERENCES content_source(id) DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE ONLY content_article
    ADD CONSTRAINT duplicate_of_id_refs_id_6aaa1afb FOREIGN KEY (duplicate_of_id) REFERENCES content_article(id) DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE ONLY taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_content_type_id_fkey FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE ONLY taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES taggit_tag(id) DEFERRABLE INITIALLY DEFERRED;

