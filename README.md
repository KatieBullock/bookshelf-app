  <h1 align="center">Bookshelf App</h1>
  <p align="center">
    Let's read! Organize the books you want to read, the ones you currently are reading, and all of those you've already read with Bookshelf.
    <br />
    <a href="#">View Demo</a>
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

### Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Font Awesome](https://fontawesome.com/)
- [Node.js](https://nodejs.org/en/)
- JWT

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

Users can login using the username *harry* and the password *potter* or the username *hermione* and the password *granger*. After entering the correct credentials, users will be redirected to the bookshelf page. There they can see what books they have added to their "Want to Read", "Currently Reading", and "Read" shelves. Each book has a dropdown select box that users can use to move the book from one shelf to another or delete it altogether. The user can navigate to the search page where he can search a book title and hit enter. The app uses the Google Books API to search for books. The user will get results based on her query and she will be able to click on the book and be redirected to a more detailed page about the book. There she can add the book to a shelf on her bookshelf. If the user hits the back button, her previous search query will be saved and she can peruse some more. If the user hits the refresh button, she will remain logged in. If the user wishes to sign out, she can click the logout button in the upper right corner.

## Authors

- **Katie Bullock** - _Developed App_ -
  [KatieBullock](https://github.com/KatieBullock)

## Acknowledgements

- Thank you to Matina Patsos and Jamal Taylor with Albany Can Code for guidance and support on this project.
