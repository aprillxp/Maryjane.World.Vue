## Maryjane.World API Docs

## Models:

_User_

```
- email : string, required, unique, isEmail
- password : string, required
```

_Favorites_

```
- image : string
- title : string
- overview : text
- rating : integer
- count : integer
- date : date
- userId : integer
- tmdbId : integer
```

## Relationship :

> ### **One-to-Many**
>
> Relasi antara `User` dan `Favorite` adalah one to many [doc](https://sequelize.org/master/manual/advanced-one-to-many.html).

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /movies`
- `GET /movies/:id`

Routes below need authentication:

- `GET /favorites`
- `POST /favorites/:voucherId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /movies

Description:

- Fetch all movies from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 615656,
    "image": "https://image.tmdb.org/t/p/w500/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
    "title": "Meg 2: The Trench",
    "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
    "rating": 6.9,
    "count": 941,
    "date": "2023-08-02"
  },
  {
    "id": 976573,
    "image": "https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
    "title": "Elemental",
    "overview": "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    "rating": 7.8,
    "count": 1553,
    "date": "2023-06-14"
  },
  {
    "id": 346698,
    "image": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    "title": "Barbie",
    "overview": "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    "rating": 7.4,
    "count": 3492,
    "date": "2023-07-19"
  }
]
```

&nbsp;

## 4. GET /movies/:id

Description:

- Fetch all movies by id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- api_key:

```json
{
  "api_key": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (200 - OK)_

```json
{
  "id": 615656,
  "image": "https://image.tmdb.org/t/p/w500/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
  "title": "Meg 2: The Trench",
  "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
  "rating": 6,
  "count": 939,
  "date": "2023-08-02"
}
```

&nbsp;

## 5. GET /favorites

Description:

- Fetch all favorites list from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- api_key:

```json
{
  "api_key": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "image": "https://image.tmdb.org/t/p/w500/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
    "title": "Meg 2: The Trench",
    "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
    "rating": 6,
    "count": 939,
    "date": "2023-08-02T00:00:00.000Z",
    "userId": 1,
    "imdbId": 615656,
    "createdAt": "2023-08-30T08:20:29.856Z",
    "updatedAt": "2023-08-30T08:20:29.856Z"
  }
]
```

&nbsp;

## 6. POST /favorites/:MovieId

Description:

- Add movie to Favorites table

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- api_key:

```json
{
  "api_key": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Movie with title <title movie> has been added to favorites"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_
```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
