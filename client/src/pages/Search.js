import React, { useState, useEffect } from "react";
import API from "../utils/API";
import googleAPI from "../utils/googleAPI";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn";
import GoogleSearch from "../components/GoogleSearch";
import SearchContext from "../utils/searchContext";
import "./style.css";

function Search(props) {
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [googleBooks, setGoogleBooks] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {

    loadBooks()
    // loadGoogleResults("Harry+Potter")
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
    setFormObject({ ...formObject, [name]: value })
  };

  //  function handleFormSubmit(event) {
  //    event.preventDefault();
  //   if (formObject.title && formObject.author) {
  //      API.saveBook({
  //        title: formObject.title,
  //        author: formObject.author,
  //        synopsis: formObject.synopsis
  //      })
  //        .then(res => loadBooks())
  //        .catch(err => console.log(err));
  //    }
  //  };

  function handleFormSubmit(event, search) {
    event.preventDefault();
    if (formObject.search) {
      loadGoogleResults(formObject.search)

    }
  };

  function loadGoogleResults(search) {
    googleAPI.getBooks(search)
      .then(res => setGoogleBooks(res.data.items))
      .then(console.log())
      .catch(err => console.log(err))
  }


  return (
    <div>
      <form>
        <Input
          onChange={handleInputChange}
          name="search"
          placeholder="search a book"
          value={formObject.search}
        />
        <FormBtn
          disabled={!(formObject.search)}
          onClick={handleFormSubmit}
        >
          Search Book
              </FormBtn>
      </form>

      

      <div>
        {books.length ? (
          <List>
            {books.map(book => {
              return (
                

                <ListItem key={book._id}>
                  <div className="container-fluid border">
            <div className="row">

              <div className="col-sm-3">
                <img className="thumbNail"src={book.image} alt="bookthumbnail"></img>
              </div>

              <div className="col-sm-9">
                <div className="row">
              
                  <div className="col-sm-12">
                      <h5>{book.title}</h5>
                      <p>{book.author}</p>
                  </div>

                <div className="row">
                  <div className="col-sm-12">
                      <p>{book.description}</p>
                      <a href={book.link}>Amazon.com</a>
                  </div>  
                </div>
              </div>
            </div>
            </div>
          </div>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                </ListItem>
              );
            })}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </div>
      <div>
        {googleBooks.map(googleBook => {
          const buyLink = () => {
            if(googleBook.volumeInfo.saleInfo.buyLink) {
            return <a href={googleBook.volumeInfo.saleInfo.buyLink}>Buy this book for ${googleBook.volumeInfo.saleInfo.listPrice.amount}</a>
          } else {
            return <p>Book Not For Sale</p>
          }
        }
        return (
          <div className="container-fluid border">
            <div className="row">

              <div className="col-sm-2">
                <img className="thumbNail"src={googleBook.volumeInfo.imageLinks.smallThumbnail} alt="bookthumbnail"></img>
              </div>

              <div className="col-sm-10">
                <div className="row">
              
                  <div className="col">
                      <h5>{googleBook.volumeInfo.title}</h5>
                      <p>{googleBook.volumeInfo.authors}</p>
                  </div>

                <div className="row">
                  <div className="col">
                      <p>{googleBook.volumeInfo.description}</p>
                      <a href={googleBook.volumeInfo.previewLink}>Preview This Book</a>
                      <p>{googleBook.volumeInfo.saleablility}</p>
                      <div>{buyLink}</div>
                      
                      
                      
                  </div>  
                </div>
              </div>
            </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>

  )

}

export default Search;