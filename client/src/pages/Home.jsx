// Home.js
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
// must npm i for react slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// images for slick carousel
import image1 from '../assets/firstcarousel.jpg';
import image2 from '../assets/secondcarousel.jpg';
import image3 from '../assets/thirdcarousel.jpg'
import '../styles/home.css';
// useState, Effect
import { useState, useEffect } from 'react';
// import mui
import { Grid, Pagination, Typography } from '@mui/material';
// hooks from apollo
import { useQuery } from '@apollo/client';
// import any queries and mutations
import { QUERY_ALL_BOOKS } from '../utils/queries';


function Home() {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
    };

    // using our query to get data from db
    const { loading, data, refetch } = useQuery(QUERY_ALL_BOOKS);
    // console.log(data);

    //   puts data into variable (it's an array), can access its properties from there
    const books = data?.getBooks.books || [];
    // console.log(books);
    const bookCount = data?.getBooks.bookCount || 0;
    // console.log(bookCount);
    const totalPages = Math.ceil(bookCount / 5);

    // useState for page number
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (event, page) => {
        setCurrentPage(page)
    }


    // data under the method of getBooks is an array of 589(currently) elements.

    // IF YOU WANT TO SEE BOOK DATA LOGGED, UNCOMMENT BELOW
    // if (loading) {
    //     console.log('Loading...');
    // } else {
    //     // Once data is available, accesses and logs single book and corresponding properties on the book object
    //     console.log(data);
    //     //change number in index for a different single book
    //     const oneBook = data?.getBooks[588];
    //     console.log('One Book:', oneBook.image.data);
    // }

    // logic to sift through pages of books
    useEffect(() => {
        const skip = (currentPage - 1) * 5;
        console.log(skip)
        refetch({ skip });
    }, [currentPage, refetch]);



    return (
        <>
            {/* Slick carousel */}
            <div className="top-home-div" style={{ marginBottom: '2rem' }}>
                <Slider {...settings}>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image2} alt="" />
                            <div className="text-overlay">
                                <p className="text-title">Plethora of free books, completely free </p>
                                {/* whiteSpace property prevent text of Liber from wrapping on small screens */}
                                <p>Welcome to <span style={{ fontFamily: 'Coventry Garden', whiteSpace: 'nowrap' }}>{'{'} L i b e r {'}'}</span>.<br /> Our extended collection of free, classic novels and reads are digitized and waiting to be discovered.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image1} alt="" />
                            <div className="text-overlay">
                                <p className="text-title">Interact with your e-reads</p>
                                <p>Join our fellow readers!<br /> Find and add free classics directly to your Bookshelf for ease of reading.<br /> Rate and discuss your favorite books! </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="overlay">
                            <img src={image3} alt="" />
                            <div className="text-overlay">
                                <p className="text-title">MyBookshelf</p>
                                <p>Add books directly to the MyBookshelf section.<br />Once a book is added, you can come back and read it whenever you like.<br />To gain access to the feature, sign up or log in Now! </p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            {/* all books div*/}
            <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                {loading ?
                    (
                        <p>Loading...</p>
                    ) :
                    (
                        <>
                        
                            <Grid container className="bottom-home-div">
                                {/* // parent div holding books */}
                                <Grid className="books-container" container spacing={1} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '5vw', border: 'double 10px #cae4df', marginLeft: '5rem', marginRight: '5rem', marginBottom: '2rem' }}>

                                    {/* each book will be in its own div */}
                                    {books.map((book, index) => (
                                        <Grid className="ind-book" item key={book._id} xs={2.3} sx={{ animationDelay: `${index * 0.3}s` }}>
                                            <Link to={`/singleBook/${book._id}`}>
                                                <img style={{ width: '100%', height: '25vw' }} src={`data:image/jpg;base64,${book.image.data}`} />
                                            </Link>
                                            <p className="home-book-titles" style={{ fontSize: '0.8rem', textWrap: 'wrap' }}>
                                                {book.title}
                                            </p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8abbb1" width="64px" height="64px">

  <path d="M17 2H7c-.553 0-1 .447-1 1v18c0 .553.447 1 1 1h10c.553 0 1-.447 1-1V3c0-.553-.447-1-1-1zM8 4h7v16H8V4zm10 18H9v-3h9v3zm0-5H9V5h9v12z"/>

  <rect x="9" y="6" width="6" height="14" fill="#fff"/>
</svg>

                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid item sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>

                                    <Pagination
                                        sx={{ button: { color: '#8abbb1' } }}
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={changePage}
                                        variant="outlined"
                                        color="success" />

                                </Grid>
                            </Grid>

                        </>
                    )
                }
            </Grid>


        </>
    );
}

export default Home;
