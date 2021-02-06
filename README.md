# Perfect Query

> A project attempting to optimize a server/database scheme to achieve the following metrics under load:
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
<br></br>
### __Working With Homes__

__Add A Home__
* POST api/homes

__Success Status Code:__ 201

__Responses__

```json
    {
      "message": "Successfully added a listing."
    }
```

```json
    {
      "message": "Failed to add a listing."
    }
```

__Remove A Home__
* DELETE api/homes/:id

__Path Parameters__
* id | Home's ID

__Success Status Code:__ 200

__Responses__

```json
    {
      "message": "Successfully removed a listing."
    }
```

```json
    {
      "message": "Failed to remove a listing."
    }
```

__Update A Home__
* PATCH api/homes/:id

__Path Parameters__
* id | Home's ID

__Success Status Code:__ 200

__Responses__

```json
    {
      "message": "Successfully updated a listing."
    }
```

```json
    {
      "message": "Failed to update a listing."
    }
```

__Get Similar Homes & Get Nearby Homes__
* api/homes/similar/:id
* api/homes/nearby/:id

__Path Parameters__
* id | Home's ID

__Success Status Code:__ 200

__Response__

Responds with array of 10-20 home objects of shape:
```json
    {
      "id": "Int",
      "decreased" : "Boolean",
      "dateListed" : "Date",
      "imageurl" : "String",
      "price" : "Int",
      "beds" : "Int",
      "baths" : "Int",
      "sqft" : "Int",
      "street" : "String",
      "zipcode" : "Int",
      "city" : "String",
      "state_name" : "String",
      "realtor" : "String",
    }
```
<br></br>
### __Working With Users__

__Get A User__
* GET api/users/:id

__Path Parameters__
* id | User's ID

__Success Status Code:__ 200

__Responses__

```json
    {
      "id": "Int",
      "username": "String",
      "first_name": "String",
      "last_name": "String",
      "email": "String"
    }
```

__Add A User__
* POST api/users

__Success Status Code:__ 201

__Responses__

```json
    {
      "message": "Successfully added a User."
    }
```

```json
    {
      "message": "Failed to add a User."
    }
```

__Remove A User__
* DELETE api/users/:id

__Path Parameters__
* id | User's ID

__Success Status Code:__ 200

__Responses__

```json
    {
      "message": "Successfully removed a user."
    }
```

```json
    {
      "message": "Failed to remove user."
    }
```

__Update A User__
* PATCH api/homes/:id

__Path Parameters__
* id | User's ID

__Success Status Code:__ 200

__Responses__

```json
    {
      "message": "Successfully updated User."
    }
```

```json
    {
      "message": "Failed to update User."
    }
```

<br></br>
### __Tracking Which User's Like Which Homes__

__Get A User's Liked Homes__
* GET api/users/liked/:id

__Path Parameters__
* id | User's ID

__Success Status Code:__ 200

__Responses__

Responds with array of liked home objects of shape:
```json
    {
      "id": "Int",
      "decreased" : "Boolean",
      "dateListed" : "Date",
      "imageurl" : "String",
      "price" : "Int",
      "beds" : "Int",
      "baths" : "Int",
      "sqft" : "Int",
      "street" : "String",
      "zipcode" : "Int",
      "city" : "String",
      "state_name" : "String",
      "realtor" : "String",
    }
```

__Add A Home To A User's Liked List__
* POST API/homes/liked/:home_id/:user_id

__Path Parameters__
* home_id | Home's ID
* user_id | User's ID

__Success Status Code:__ 201

__Responses__
```json
    {
      "message": "Successfully added liked home to user's List."
    }
```

```json
    {
      "message": "Failed to add liked home to user's list."
    }
```

__Remove A Home From A User's Liked List__
* DELETE API/homes/liked/:home_id/:user_id

__Path Parameters__
* home_id | Home's ID
* user_id | User's ID

__Success Status Code:__ 200

__Responses__
```json
    {
      "message": "Successfully removed liked home from user's List."
    }
```

```json
    {
      "message": "Failed to remove liked home from user's list."
    }
```

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

