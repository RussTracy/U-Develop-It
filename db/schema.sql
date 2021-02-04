DROP DATABASE IF EXISTS election_db;
CREATE DATABASE election_db;
USE election_db;

CREATE TABLE parties (
  id INTEGER(11) UNSIGNED AUTO_INCREMENT NOT NULL,
  party_name VARCHAR(30) NOT NULL,
  party_description TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE candidates (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL,
  party_id INTEGER(11) UNSIGNED,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);
