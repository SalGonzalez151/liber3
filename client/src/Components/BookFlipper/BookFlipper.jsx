import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ONE_BOOK } from '../../utils/queries';

import './BookFlipper.css';

const BookFlipper = () => {
    const { bookId } = useParams(); // Get the bookId from the URL
    const { loading, error, data } = useQuery(QUERY_ONE_BOOK, {
        variables: { id: bookId }, // Pass the bookId as a variable to the query
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { title, authors, text } = data.getSingleBook;

    // Function to remove introductory sentences
    const cleanText = (originalText) => {
        // Split the text based on the specified pattern
        const splitText = originalText.split(/Gutenberg eBook.*?www.gutenberg.org\./gs);

        // Join the parts after the pattern to get the cleaned text
        const cleanedText = splitText.slice(1).join('').trim();

        // Remove the additional sentences
        const finalCleanedText = cleanedText
            .replace(/If you are not located in the United States,[^]*?before using this eBook\./gs, '')
            .replace(/\*\*\* START OF THE PROJECT GUTENBERG EBOOK[^]*?\*\*\*/g, '');

        return finalCleanedText.trim();
    };

    const cleanedText = cleanText(text);

    return (
        <main className="unique-main-class">
            <div className="book unique-book-class">
                <div className="book-cover unique-book-cover-class">
                    <div className="unique-cover-div-class">
                        {/* title */}
                        <h1 className="unique-h1-class">{title}</h1>
                        <div className="separator unique-separator-class"></div>
                        {/* authors */}
                        <h2 className="unique-h2-class">by {authors.map(author => author.name).join(', ')}</h2>
                    </div>
                </div>
                <div className="book-content unique-book-content-class">
                    {/* the actual text from the book */}
                    <p className="unique-p-class">{cleanedText.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}</p>
                    {console.log(cleanedText)}
                </div>
            </div>
        </main>
    );
};

export default BookFlipper;
