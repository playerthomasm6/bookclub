import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn";

function Search(props) {
    const [books, setBooks] = useState([]);
    const [formObject, setFormObject] = useState({});

     useEffect(() => {
       
         loadBooks()
         console.log(books);
     }, [] 
     )
    
    // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res =>
         setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

   // Deletes a book from the database with a given id, then reloads books from the db
   function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

  
    return (
        <div>   
            <h6>Search for a book</h6>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                onChange={handleInputChange}
                name="description"
                placeholder="Description (required)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
         <div>
           
         {books.length ? (
              <List>
                {books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                        <img className="book-image" src={book.image}></img>
                        
                        <a href={book.link}>Amazon.com</a>
                        
                      </a>
                      <DeleteBtn onClick={() => deleteBook(book._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
         </div>
            
        </div>
        
    )
    
}

export default Search;