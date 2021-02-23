import React, { useState, useEffect } from "react";
import API from "../utils/API";
import googleAPI from "../utils/googleAPI";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn";
// import GoogleSearch from "../components/GoogleSearch";
import SearchContext from "../utils/searchContext";
import "./style.css";

function Search() {
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [googleBooks, setGoogleBooks] = useState([]);
  const [search, setSearch] = useState({});
  const [savedBook, setSavedBook] = useState({})

  useEffect(() => {

    loadBooks()
    // loadGoogleResults("Harry+Potter")
    console.log(books);
  }, []
  )
  useEffect(() => {
    
    console.log(savedBook);
    API.saveBook(savedBook)
    .then(res => loadBooks())
    .catch(err => console.log(err));
  }, [savedBook]
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

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.search) {
      loadGoogleResults(formObject.search)
      console.log(formObject.search)
    }
  };

  function loadGoogleResults(search) {
    googleAPI.getBooks(search)
      .then(res => setGoogleBooks(res.data.items))
      .then(console.log(googleBooks))
      .catch(err => console.log(err))
  }

   function saveBookDB() {   
       API.saveBook({savedBook})
         .then(res => loadBooks())
         .catch(err => console.log(err));
     }
   


  return (
    <div className="container-fluid">
      <form>
        <Input
          onChange={handleInputChange}
          name="search"
          placeholder="search a book"
          
        />
        <FormBtn disabled={!(formObject.search)} onClick={handleFormSubmit}>Search Book</FormBtn>
      </form>

      

      <div className="row">
        <div className="col-sm-6">
        <h1>Saved Books</h1>
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
      <div className="col-sm-6">
      {googleBooks.map(googleBook => {
          const title = googleBook.volumeInfo.title;
          const author = googleBook.volumeInfo.authors;
          const description = googleBook.volumeInfo.description;
          const image = googleBook.volumeInfo.imageLinks.smallThumbnail;
          const preview = googleBook.volumeInfo.previewLink;
          const saleability = googleBook.volumeInfo.saleablility;
          // const buyLink = () => {
          //   if(!googleBook.volumeInfo.saleInfo.buyLink) {
          //     return <p key={title}>NOT FOR SALE</p>
          //   } else {
          //     return googleBook.volumeInfo.saleInfo.buyLink
          //   }
          // };
          // const price = () => {
          //   if(!googleBook.volumeInfo.saleInfo.listPrice.amount) {
          //     return <p>NOT FOR SALE</p>
          //   } else {
          //     return googleBook.volumeInfo.saleInfo.listPrice.amount
          //   }
          // };
      
        return (
          <div key={title + author} className="border">
            <div className="row">

              <div className="col-sm-2">
                <img 
                className="thumbNail"
                src={image} 
                alt="bookthumbnail"
                data-a
                ></img>
              </div>

              <div className="col-sm-10">
                <div className="row">
              
                  <div className="col">
                      <h5>{title}</h5>
                      <p>{author}</p>
                  </div>

                <div className="row">
                  <div className="col">
                      <p>{description}</p>
                      <a href={preview}>Preview This Book</a>
                      <p>{saleability}</p>
                      {/* <div value={buyLink}>{buyLink}Is this showing up</div>
                      <div>{price}</div> */}
                       <button onClick={() => setSavedBook(
                         {
                          title: title,
                          author: author.toString(),
                          desciption: description,
                          image: image,
                          link: preview,
                          })}>Save</button>
                      
                      
                      
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
    </div>

  )

}

export default Search;