DROP DATABASE IF EXISTS election_db;
CREATE DATABASE election_db;
USE election_db;

CREATE TABLE candidates (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE parties (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  party_name VARCHAR(30) NOT NULL,
  party_description TEXT,
  PRIMARY KEY (id)
);