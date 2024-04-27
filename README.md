# IONA Cats

This project is a coding exercise for IONA's recruitment process. The app fetches data from the [Cats API](https://thecatapi.com/), allowing users to browse and display information about various cat breeds. Users can view a list of cats for a selected breed and access detailed information about individual cats.

## Getting Started

1. Prerequisites

- Node.js (v18.18.0 or higher)

2. Create an `.env` file and make sure to fill up the required envs based on `.env.example`.

```
VITE_API_URL=https://api.thecatapi.com/v1
```

3. Install dependencies

```bash
npm install
```

3. Run the app

```bash
npm run dev
```

The application will be accessible by default at http://localhost:5173/.

## Usage

- Select breed a breed from the dropdown to show the cats for the selected breed.
- Click `Load more` to load more cats on the selected breed.
- Click `View details` to show the detailed info of the selected cat.
- Click `Back` from the cat details page to go back to the home page that shows the list of cats from previous selected breed.

## Technologies used

- ReactJS (Vite)
- react-router-dom
- react-bootstrap
- axios
- Context API (for state management)
- styled-components (for styling)
- typescript
- eslint
- husky and lint-staged (for commit hooks)
