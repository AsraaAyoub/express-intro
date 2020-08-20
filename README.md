# Introduction to Express

Express is a minimal framework for building web applications with Node. It handles some of the stuff that is annoying to do with Node's built-in HTTP servers and has a nice model for including 3rd party code in your server.

This quick intro shows how to set up a basic server, and demonstrates some of the ways Express differs from vanilla Node.

## Setup

We're going to set up an Express server from scratch, so **do not clone this repo**.

1. Create a new directory on your computer
1. Run `npm init -y` to create a `package.json`
1. Run `npm install -D nodemon` so we don't have to keep restarting our server

## Using Express

First install Express:

```sh
npm install express
```

### Creating a server

Then create a `server.js` file. The way we create an Express server is quite similar to the built in Node one:

```js
const express = require("express");

const server = express();
```

We start the server listening on a specifc port:

```js
const express = require("express");

const server = express();

server.listen(3000, () =>
  console.log("Server listening on http:localhost:3000")
);
```

That's all we need for a functioning Express server that doesn't really do anything. Run `npx nodemon server.js` to start a auto-restarting server.

For comparison here's the simplest vanilla Node server:

```js
const http = require("http");

const server = http.createServer();

server.listen(3000, () =>
  console.log("Server listening on http:localhost:3000")
);
```

The initial setup is basically the same, but the default behaviour is a little more helpful. Visit http://localhost:3000 in your browser and you should see `Cannot GET /`. If you open the network tab and refresh you should see that the browser is receiving a `404` response from the server.

A vanilla Node server with no router would never send a response. Eventually the browser's request would just time out. Since you pretty much always want to send some kind of response Express includes a default `404` handler for missing routes.

### Adding routes

Vanilla Node servers have no built in way to handle requests for different URLs. You just end up with a big `if` or `switch` statement for every path. Since every app needs routing Express has this too. We can add routes using methods on the `server` object:

```js
server.get("/", (req, res) => {
  // handle request here
});
```

The first argument is the URL to match, and the second is a handler function that receives the request and response objects (just like in vanilla Node). In the Express docs/wider community these are often abbreviated to `req` and `res`, so we'll match that going forward.

The `server` object has a route method for each of the HTTP methods (e.g. `server.post`, `server.delete` etc). Here we're just handling `GET` requests to the `/` route.

### Sending responses

Express adds some extra stuff to the request and response objects. It adds a new method called `send` to make sending a response easier. This is similar to Node's `response.end` method, except it automatically sets the `content-type` and `content-length` headers for us. If you pass a string it'll set `text/html`, and if you pass an array or object it'll set `application/json`.

#### Sending HTML

```js
res.send("<h1>hello world</h1>");
```

This would be the equivalent in vanilla Node:

```js
response.writeHead(200, { "content-type", "text/html", "content-length": 20 });
response.end("<h1>hello world</h1>");
```

Add the response to your server, then refresh the page. You should see the "hello world" title. If you check the network tab you should see the response headers correctly include the `content-type` and `content-length`.

#### Sending JSON

Add a second route for `GET /api` that sends a JSON object with a `"message"` property of "hello world". Visit http://localhost:3000/api in your browser and you should see a JSON response of `{ "message": "hello world" }`. Check the network tab and you see see the `content-type` response header set to `application/json`.

#### Setting status codes

Express will default to a status code of `200` when you use `res.send` to send a response. If you need to set a different code you can use the `.status` method, which is chainable with `.send`:

```js
res.status(401).send("Unauthorised");
```

#### Redirects

Express also has a convenience method for redirecting. It looks works like this: `res.redirect("/some-url")`, and it will automatically set the status code to `302` and set the `location` header.

Add a new route that redirects `GET /hello` to the home route (`/`).

## Next steps

Express has lots more cool stuff, so head over to [Learn Express](http://github.com/oliverjam/learn-express) for a full workshop.
