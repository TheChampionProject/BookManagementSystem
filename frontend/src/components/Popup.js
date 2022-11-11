import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

export default function Popup({ show, setShow, book, setManagedBook }) {
    let emptyBook = {
        Title: "",
        Genre: "",
        Inventory: "",
        Price: "",
        Index: -1,
    };
    let addBook;
    let modalTitle = "";
    let buttonName = "";

    let autoFillTitle = "";
    let autoFillGenre = "";
    let autoFillCurrentI = "";
    let autoFillPrice = "";

    try {
        if (book !== null) {
            modalTitle = "Edit This Book";
            buttonName = "Edit Book";
            autoFillTitle = book.Title;
            autoFillGenre = book.Genre;
            autoFillCurrentI = book.Inventory;
            autoFillPrice = book.Price;
        } else {
            addBook = true;
            modalTitle = "Add a Book";
            buttonName = "Add Book";
        }
    } catch {}

    let [title, setTitle] = useState(autoFillTitle);
    let [genre, setGenre] = useState(autoFillGenre);
    let [currentI, setCurrentI] = useState(autoFillCurrentI);
    let [price, setPrice] = useState(autoFillPrice);

    let previousTitle = useRef();
    let previousGenre = useRef();
    let previousCurrentI = useRef();
    let previousPrice = useRef();

    useEffect(() => {
        previousTitle.current = title;
        previousGenre.current = genre;
        previousCurrentI.current = currentI;
        previousPrice.current = price;
    }, [title, genre, currentI, price]);

    useEffect(() => {
        // When there is a new book, autoFill fields will update
        setTitle(autoFillTitle);
        setGenre(autoFillGenre);
        setCurrentI(autoFillCurrentI);
        setPrice(autoFillPrice);
    }, [
        autoFillCurrentI,
        autoFillGenre,
        autoFillPrice,
        autoFillTitle,
        book,
    ]);

    let editBook = (e) => {
        e.preventDefault();

        if (addBook) {
            book = emptyBook; // Give book a value so it can be edited
        }

        book.Title = title;
        book.Genre = genre;
        book.Inventory = currentI;
        book.Price = price;
        setManagedBook(book);
        setShow(false);
    };

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <>
                            <div className="modal-body">
                                <label className="Popup">Title: </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <br />
                                <label className="Popup">Genre: </label>
                                <input
                                    type="text"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                />
                              
                                <br />
                                <label className="Popup">Inventory: </label>
                                <input
                                    type="text"
                                    value={currentI}
                                    onChange={(e) =>
                                        setCurrentI(e.target.value)
                                    }
                                />
                                <br />
                                <label className="Popup">Price: </label>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <br />
                            </div>
                        </>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            className="btn btn-success"
                            type="submit"
                            onClick={(e) => {
                                editBook(e);
                            }}
                        >
                            {buttonName}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
