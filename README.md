# Project Name

> A project attempting to optimize a server/databse scheme to achieve the following metrics under load:
    Response Time: <= 2000ms,
    Throughput: > 100 rps on EC2,
    Error rate <= 1%

## Related Projects

  - https://github.com/Curve-Metrics/Proxy-Carousel-Optimization
  - https://github.com/Curve-Metrics/AffordabilityCalculator-Optimization
  - https://github.com/Curve-Metrics/Photos-Optimization

## Table of Contents

1. [API Endpoints](#APIEndpoints)
1. [Requirements](#requirements)
1. [Development](#development)

## API Endpoints

> GET API/homes/similar/:home_id  -  Primary endpoint. This endpoint would identify which listing was being viewed by its ID in the request parameters. It would then query information on this home (size, price, location) and find 16 similar homes within the database, and return those results in an array in its response body. Each home would be an object containing values for image url, price, address etc.

GET API/homes/nearby/:home_id  -  Other primary endpoint. This endpoint would identify which listing was being viewed by its ID in the request parameters. It would then query information on this home (size, price, location) and find 16 nearby homes within the database, and return those results in an array in its response body. Each home would be an object containing values for image url, price, address etc.

GET API/homes/liked/:user_id  -  This route takes a user's id in its request params and returns the homes this user has liked as an array of homes.

POST API/homes/liked/:home_id/:user_id - Creates a record in the users_listings table that records that the user has liked a home. The user and home are both identified by their respective ids in the request parameters.

DELETE API/homes/liked/:home_id/:user_id - Deletes a record in the users_listings table. The user and home are both identified by their respective ids in the request parameters.

POST API/users  -  This endpoint adds a user to the database. The user's information will be sent in the request body and the server will respond with a success or failure to add message.

PATCH API/users/:id - This endpoint would update a user's information. It would take a user's id in the request params and it would take the requested update in the body of the request.

DELETE API/users/:id - This endpoint removes the user identified in the request params from the database.

POST API/homes  -  This end point would be used for adding a home record to the database. It will take home info such as price, address, image urls etc in the request body.

PATCH API/homes/:id - This end point would be used for updating homes in the database. A likely use case would be prices being changed to meet market conditions or realtors uploading additional images of the home. This endpoint would take the ID of the home from the request parameters and the requested changes in an object in the request body. It would respond with a success or failure message based on if the database was able to make the requested updates.

DELETE API/homes/:id  -  This endpoint would be used for removing homes from the database. A likely use case would be when a home is sold or for whatever other reason removed from the market. It would take the home’s ID from the request params and delete the row in the database holding that id. It would respond with a success or failure based on whether it was able to find and delete the home record.


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

