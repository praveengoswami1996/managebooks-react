import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onSubmit }){
    const { updateBook } = useBooksContext();
    const [newTitle, setNewTitle] = useState(book.title);

    const handleNewTitleChange = (event) => {
        setNewTitle(event.target.value);
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit();
        updateBook(newTitle, book.id);
    }

    return (
        <form onSubmit={handleFormSubmit} className="book-edit">
            <label>Title</label>
            <input 
                type="text"
                className='input'
                value={newTitle}
                onChange={handleNewTitleChange}
            />
            <button className='button is-primary'>Save!</button>
        </form>
        
    )
}

export default BookEdit;