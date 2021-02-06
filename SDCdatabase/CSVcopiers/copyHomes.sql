COPY home_info(decreased, dateListed, imageurl, price, beds, baths, sqft, street, zipcode, city, state_name, realtor)
FROM '/Users/daniel/HR/SDC/Carousel-Service-Optimization/CSVfiles/home_info.csv'
DELIMITER ','
CSV HEADER;