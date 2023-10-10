# Bookstor.

Currently live (deployed with Render) at [https://bookstor.onrender.com/](https://bookstor.onrender.com/).


## About the Project

This project is a reading list app, that allows the user to search the Google Books API for books, then add them to a reading list.

### Features:

- **Authentication**: Users can sign in using two sets of credentials:

  | Username | Password |
  | -------- | -------- |
  | testuser | password |
  | kristoff | lalicki  |

  Once the user is logged in, the app uses a JWT to authenticate requests to the backend API. There are a few other features related to authentication:

  - **Protected Routes**: The app uses a custom component to block access to routes that require authentication. If the user is not logged in, they will be redirected to the login page.

  - **Logout**: The user can log out of the app, which will remove the JWT from local storage and redirect them to the login page.

  - **Auto Logout**: The app will automatically log the user out if the JWT expires or becomes invalid (for example, if the backend server is forced to restart)

- **Search**: Users can search the Google Books API for books. The search results page allows the user to add each book to a list, or view a page with more details about the book.

- **Book Details**: Users can view more details about a book, including a description, the author, categories, and publication information.

- **Bookshelf**: Users can view their reading lists, which are stored in the backend database. The reading list page allows the user to remove books from the lists, move books between lists, or view a page with more details about the book.

## Tech

The frontend of this project is built with React. It uses Axios and SWR to fetch data from the backend API. It also uses Context API to store global state, including an auth token.

## How to Use

This project is currently deployed at [https://bookstor.onrender.com/](https://bookstor.onrender.com/). You can also run it locally.

There are two ways to run this project locally: with development servers, or with a production build.

### Development Servers

Running this project locally with development servers requires running two separate servers: one for the frontend, and one for the backend. This will require two terminal windows.

Start by installing and running the backend (in the root of the repository)

```
npm install
npm start
```

Then, in another terminal, install and run the frontend (in the `client` directory)

```
cd client
npm install
npm start
```

### Production Build

You can also run this project locally from a production build. In this case, the backend server (built with Express) will serve static HTML/CSS/JS assets for the frontend.

To do this, run the following command in the root of the repository to install the server dependencies and produce a production build of the frontend:

```
npm install
npm run build
```

Then, run the following command to start the backend:

```
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
