import { useEffect } from 'react';
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import useBooksContext from './hooks/use-books-context';

// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'szgySYmz6OqBcaPtw2JbtkG7uXBQVqjrOjQwFJBu';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'WBCTIo2Mz56vk70oReXqbaqLKhWzwbCHhPxkSyZp';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


function App(){
    const { memoizedFetchBooks } = useBooksContext();

    //fetchBooks() will only be called on first render
    useEffect(() => {
        memoizedFetchBooks();
    }, [memoizedFetchBooks]);
    
      
    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList />
            <BookCreate />
        </div>
    )
}

export default App;