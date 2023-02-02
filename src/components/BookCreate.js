import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookCreate(){
    const { createBook } = useBooksContext();
    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        createBook(title);
        setTitle('');
    }

    return (
        <div className="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Title</label>
                <input 
                    type="text"
                    className='input'
                    value={title}   
                    onChange={handleTitleChange}
                />
                <button className='button'>Create!</button>
            </form>
        </div>
    )
}

export default BookCreate;