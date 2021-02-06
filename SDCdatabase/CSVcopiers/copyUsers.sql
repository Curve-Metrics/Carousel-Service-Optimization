COPY users(username, pword, first_name, last_name, email)
FROM '/Users/daniel/HR/SDC/Carousel-Service-Optimization/CSVfiles/users.csv'
DELIMITER ','
CSV HEADER;