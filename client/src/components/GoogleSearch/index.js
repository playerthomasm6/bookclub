import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";
import googleAPI from "../../utils/googleAPI";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function GoogleSearch(props) {
const [googleBooks, setGoogleBooks] = useState([]);
const [books, setBooks] = useState([]);

function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

function loadGoogleResults(search) {
    googleAPI.getBooks(search)
      .then(res => setGoogleBooks(res.data.items))
      .then(console.log())
      .catch(err => console.log(err))
  }

  function saveBookDB(title1, author1, description1, image1, preview1) {
    //console.log(title1, author1, description1, image1, preview1);
    //console.log(new Date(Date.now()))
      API.saveBook({
        title: title1,
        author: author1,
        desciption: description1,
        image: image1,
        link: preview1,
        date: new Date(Date.now())
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }


  return (
    <div>

        {googleBooks.map(googleBook => {
          const title = googleBook.volumeInfo.title;
          const author = googleBook.volumeInfo.authors;
          const description = googleBook.volumeInfo.description;
          const image = googleBook.volumeInfo.imageLinks.smallThumbnail;
          const preview = googleBook.volumeInfo.previewLink;
          const saleability = googleBook.volumeInfo.saleablility;
          const buyLink = () => {
            if(!googleBook.volumeInfo.saleInfo.buyLink) {
              return <p>NOT FOR SALE</p>
            } else {
              return googleBook.volumeInfo.saleInfo.buyLink
            }
          };
          const price = () => {
            if(!googleBook.volumeInfo.saleInfo.listPrice.amount) {
              return <p>NOT FOR SALE</p>
            } else {
              return googleBook.volumeInfo.saleInfo.listPrice.amount
            }
          };
      
        return (
          <div className="container-fluid border">
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
                      <div value={buyLink}>{buyLink}Is this showing up</div>
                      <div>{price}</div>
                       <button onClick={() => saveBookDB(title, author, description, image, preview)}>Save</button>
                      
                      
                      
                  </div>  
                </div>
              </div>
            </div>
            </div>
          </div>
        )
      })}
      </div>
)

}

export default GoogleSearch;
