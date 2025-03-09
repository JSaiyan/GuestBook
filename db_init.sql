CREATE DATABASE guestbook;
USE guestbook;

CREATE TABLE guest
(
	id INT auto_increment,
	name VARCHAR(255),
    company VARCHAR(255),
    Email VARCHAR(255),
    howdidwemeet VARCHAR(255),
	PRIMARY KEY(id)
);

INSERT INTO guest(name, company, Email, howdidwemeet)
VALUES('You', 'Can', 'Do', 'It'); 
                       

