DROP DATABASE IF EXISTS home_carousel;

CREATE DATABASE home_carousel;

\connect home_carousel;

CREATE TABLE users (
  id serial primary key,
  username varchar(80),
  pword varchar(80),
  first_name varchar(80),
  last_name varchar (80),
  email varchar(80)
);

CREATE TABLE home_info (
  id serial primary key,
  decreased boolean,
  dateListed date,
  imageurl varchar(80),
  price int,
  beds int,
  baths int,
  sqft int,
  street varchar(80),
  zipcode int,
  city varchar(80),
  state_name varchar(80),
  realtor varchar(80)
);

CREATE TABLE users_listings (
  id serial primary key,
  userID int REFERENCES users (id),
  home_id int REFERENCES home_info(id)
);


CREATE TABLE similar_relationships (
  id serial PRIMARY KEY,
  base_home_id int REFERENCES home_info (id),
  similar_home_id int REFERENCES home_info (id)
);

CREATE TABLE nearby_relationships (
  id serial PRIMARY KEY,
  base_home_id int REFERENCES home_info (id),
  nearby_home_id int REFERENCES home_info (id)
);

CREATE INDEX zipcode_similar_idx ON home_info (zipcode) INCLUDE (price, beds);
CREATE INDEX zipcode_new_idx ON home_info (zipcode) INCLUDE (dateListed);