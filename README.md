  <h1 align="center">Bookshelf App</h1>
  <p align="center">
    Let's read! Organize the books you want to read, the ones you currently are reading, and all of those you've already read with Bookshelf.
    <br />
    <h2 align="center"><a href="https://kb-bookshelf-app.herokuapp.com/">View Demo</a><h2>
  </p>
</p>
<br />

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

Bookshelf utilizes the Google Books API to help you search for books and categorize them on your bookshelf. Who doesn't want to have access to their bookshelf wherever they go?

This app was an exercise in
- authentication using the Context API and protected routes created with React Router. 
- state management using the useState hook both locally and with the Context API.
- API calls using axios and the useEffect hook.
- design using the component library Chakra UI.

### Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Font Awesome](https://fontawesome.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Node.js](https://nodejs.org/en/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)

## Getting Started

These instructions will get a copy of the project up and running on your local machine.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- yarn
  ```sh
  npm install --g yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/KatieBullock/bookshelf-app.git
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Run the app
   ```sh
   yarn start
   ```

## Usage

A user can login using the username *harry* and the password *potter* or the username *hermione* and the password *granger*. After entering the correct credentials, the user will be redirected to the bookshelf page. There she can see what books she has added to her "Want to Read", "Currently Reading", and "Read" shelves. Each book has a dropdown select box that the user can use to move the book from one shelf to another or delete it altogether. The user can navigate to the search page where they can search a book title. The app uses the Google Books API to search for books. The user will get results based on her query and she will be able to click on the book and be redirected to a more detailed page about the book. There she can add the book to a shelf on the bookshelf. If the user hits the back button, her previous search query will be saved and she can peruse some more. If the user hits the refresh button, she will remain logged in. If the user wishes to sign out, she can click the logout button in the upper right corner.

## Authors

- **Katie Bullock** - _Developed App_ -
  [KatieBullock](https://github.com/KatieBullock)

## Acknowledgements

- Thank you to Matina Patsos and Jamal Taylor with Albany Can Code for guidance and support on this project.
