# React Auth Component

A modular auth component for react apps.

The component should work as a standalone react component so it
has all the functions it needs included inside a single controller,
the idea behind this being it can be turned into an nmp package and
shared across projects.

It currently requires a 'username' and a 'password' param but that
can be adapted to be abstracted out in a future version.

This app was built with `react-create-app` and works alongside this
[serverless service](https://github.com/dantame/interview-authentication-service).

The user can log in with the right username and password and the Auth 
component will render a custom view as well save the username to the
browser store to allow reloading.

I tried out some unit testing for this project just to give myself 
some exposure to it so you can run `npm test` to test all the components
in the app.

Run the above authentication service then run this app using `npm start`.

You can also configure the endpoints for dev or staging etc backend endpoints
in `src/lib/config.js`.
