DROP DATABASE IF EXISTS meetup;

CREATE DATABASE meetup;
\connect meetup;
DROP TABLE IF EXISTS account;
CREATE TABLE account (
	id SERIAL PRIMARY KEY,
	name TEXT unique,
	email TEXT unique,
	username TEXT unique NOT NULL,
	password TEXT NOT NULL,
	created_on TIMESTAMP,
	last_login TIMESTAMP, 

);

CREATE TABLE event_preferences (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	sort_name TEXT NOT NULL,
	shortname TEXT NOT NULL
);

CREATE TABLE user_preferences (
	user_id int NOT NULL,
	preference_id int NOT NULL
);

CREATE TABLE user_event (
	account TEXT NOT NULL,
	event TEXT NOT NULL
);
