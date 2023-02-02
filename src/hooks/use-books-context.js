//Creating a Custom Hook
import { useContext } from "react";
import BooksContext from "../context/BooksContext";

function useBooksContext(){
    return useContext(BooksContext);
}

export default useBooksContext;