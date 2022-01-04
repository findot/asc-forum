
CREATE TABLE accounts (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  
  username    VARCHAR(64)     NOT NULL,
  email       VARCHAR(256)    NOT NULL,
  password    VARCHAR(256)    NOT NULL,

  closed      BOOLEAN         NOT NULL DEFAULT FALSE,
  admin       BOOLEAN         NOT NULL DEFAULT FALSE,

  registered  DATETIME        NOT NULL DEFAULT NOW(),

  PRIMARY KEY (id),

  CONSTRAINT unique_username  UNIQUE(username),
  CONSTRAINT unique_email     UNIQUE(email),

  INDEX accounts_username_idx (username)
);


CREATE TABLE posts (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,

  author_id   INT UNSIGNED    NOT NULL,

  title       VARCHAR(128)    NOT NULL,
  content     VARCHAR(4096)   NOT NULL,
  highlighted BOOLEAN         NOT NULL DEFAULT FALSE,

  published   DATETIME        NOT NULL DEFAULT NOW(),

  PRIMARY KEY (id),

  FOREIGN KEY (author_id)     REFERENCES accounts(id) ON DELETE CASCADE,

  INDEX posts_title_idx (title),
  INDEX posts_published_idx (published)
);


CREATE TABLE comments (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,

  author_id   INT UNSIGNED    NOT NULL,
  post_id     INT UNSIGNED    NOT NULL,

  content     VARCHAR(4096)   NOT NULL,
  published   DATETIME        NOT NULL DEFAULT NOW(),

  PRIMARY KEY (id),

  FOREIGN KEY (author_id)     REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id)       REFERENCES posts(id)    ON DELETE CASCADE,

  INDEX comments_published_idx (published)
);


CREATE TABLE reports (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,

  author_id   INT UNSIGNED    NOT NULL,
  post_id     INT UNSIGNED    NOT NULL,

  content     VARCHAR(4096)   NOT NULL,
  published   DATETIME        NOT NULL DEFAULT NOW(),

  PRIMARY KEY (id),

  FOREIGN KEY (author_id)     REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id)       REFERENCES posts(id)    ON DELETE CASCADE,

  INDEX reports_published_idx (published)
);


CREATE TABLE posts_follows (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,

  account_id  INT UNSIGNED    NOT NULL,
  post_id     INT UNSIGNED    NOT NULL,

  PRIMARY KEY (id),

  FOREIGN KEY (account_id)    REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id)       REFERENCES posts(id)    ON DELETE CASCADE
);
