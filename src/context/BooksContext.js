import { useState, useCallback, createContext } from "react";
import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }){
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('https://my-json-server.typicode.com/praveengoswami1996/managebooks-db/books');
        console.log(response);
        setBooks(response.data);
    }

    //useCallback gives a stable reference to the first copy of the function
    const memoizedFetchBooks = useCallback(
        fetchBooks,
        []
    );

    const createBook = async (title) => {
        //Adding new book to json-server (in db.json file)
        const response =  await axios.post('http://localhost:3001/books', {
            title
        });
      
        //Updating the 'books' piece of state with the response sent by json-server
        const updatedBooks = [
            ...books,
            response.data
        ]
        setBooks(updatedBooks);
    }

    const deleteBook = async (id) => {
       //Deleting the book at json-server (from db.json file) 
       await axios.delete(`http://localhost:3001/books/${id}`)

       //Deleting the book from the books piece of state as well
       const updatedBooks = books.filter((book) => {
            return book.id !== id;
       });
       setBooks(updatedBooks);
    }

    const updateBook = async (newTitle, id) => {
        //Updating Book record at json-server (in db.json file)
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        })

        //Updating the books piece of state with response sent by json-server
        const updatedBooks = books.map((book) => {
            if (book.id === id){
                return { ...book, ...response.data }
            }
            return book;
        });

        setBooks(updatedBooks);
    }

    const contextValuesToShare = {
        books,
        memoizedFetchBooks,
        createBook,
        deleteBook,
        updateBook
    }

    return (
        <BooksContext.Provider value={contextValuesToShare}>
            {children}
        </BooksContext.Provider>
    )
}

export { Provider };
export default BooksContext;
