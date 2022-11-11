import React from "react";
import "../App.css";
export default function BookRow({
    book,
    number,
    setBook,
    setShow,
    setManagedBook,
}) {
    const edit = (e) => {
        e.preventDefault();
        setBook(book);
        setShow(true);
    };

    const checkout = (e) => {
        e.preventDefault();
        let newBook = book.Inventory--;
        setManagedBook(newBook);
    };
    return (
        <tr>
            <td>{number}</td>
            <td>{book.Title}</td>
            <td>{book.Genre}</td>
            <td className="Inventory">{book.Inventory}</td>
            <td>${book.Price}</td>
            <td>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => edit(e)}
                >
                    Edit
                </button>
            </td>
            <td>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => checkout(e)}
                >
                    Checkout
                </button>
            </td>
        </tr>
    );
}
