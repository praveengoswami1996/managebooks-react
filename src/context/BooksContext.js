import { useState, useCallback, createContext } from "react";
//import axios from 'axios';
import Parse from 'parse/dist/parse.min.js';

const BooksContext = createContext();

function Provider({ children }){
    const [books, setBooks] = useState([]);
    console.log(books);
    /*
    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    }*/

    const fetchBooks = async () => {
        const MyBooks = Parse.Object.extend('Book');
        const query = new Parse.Query(MyBooks);

        const bookData = await query.find();
        
        const renderedBooks = bookData.map((book) => {
            const {id, attributes} = book;
            return {
                id, 
                ...attributes
            }
        });
        console.log(renderedBooks);
        setBooks(renderedBooks);
    }

    //useCallback gives a stable reference to the first copy of the function
    const memoizedFetchBooks = useCallback(
        fetchBooks,
        []
    );

    /*
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
    }*/

    const createBook = async (bookTitle) => {

        try {
            const Book = new Parse.Object('Book');
            Book.set('title', bookTitle);
            const createdBook = await Book.save();
            
            const { id, attributes } = createdBook;

            const updatedBooks = [
                ...books,
                {id, ...attributes}
            ]
            setBooks(updatedBooks);
            
        } catch (error) {
            console.log('Error saving new book: ', error);
        }
    
    }

    /*
    const deleteBook = async (id) => {
       //Deleting the book at json-server (from db.json file) 
       await axios.delete(`http://localhost:3001/books/${id}`)

       //Deleting the book from the books piece of state as well
       const updatedBooks = books.filter((book) => {
            return book.id !== id;
       });
       setBooks(updatedBooks);
    }*/

    const deleteBook = async (id) => {
        try {
            const MyBooks = Parse.Object.extend('Book');
            const query = new Parse.Query(MyBooks);
            
            const bookToDelete = await query.get(id);
            const response = await bookToDelete.destroy();
            if (response) {
                const updatedBooks = books.filter((book) => {
                    return book.id !== id;
                });
                setBooks(updatedBooks);
            }
        } catch (error) {
            alert('Error (Book not deleted): ', error);
        }
       
     }
    
    /* 
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
    }*/

    const updateBook = async (newTitle, bookId) => {
        
        try {
            const MyBooks = Parse.Object.extend('Book');
            const query = new Parse.Query(MyBooks);
            
            const bookToUpdate = await query.get(bookId);
            bookToUpdate.set('title', newTitle);

            const response = await bookToUpdate.save();
            if (response) {
                const {id, attributes} = response;
                const updatedBooks = books.map((book) => {
                    if (book.id === bookId) {
                        return {...book, id, ...attributes}
                    }
                    return book;
                });
                setBooks(updatedBooks);
                console.log(updatedBooks);
            }
        } catch (error) {
            alert('Error (Book not Updated): ', error);
        } 
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
