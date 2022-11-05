import React, { useEffect, useState } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    set,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { firebaseConfig } from "../keys.js";
import BookRow from "./BookRow.js";

export default function BookTable({ setBook, setShow, managedBook }) {
    let [books, setBooks] = useState([]);

    useEffect(() => {
        initializeApp(firebaseConfig);
        const db = getDatabase();
        const dbRef = ref(db, "/");
        let databaseBooks = [];
        onValue(dbRef, async (snapshot) => {
            await snapshot.forEach((childSnapshot) => {
                databaseBooks.push(childSnapshot.val());
                setBooks(databaseBooks);
            });
        });
    }, []);

    useEffect(() => {
        if (managedBook == null) return;
        console.log(managedBook);
        initializeApp(firebaseConfig);
        const db = getDatabase();
        set(ref(db, "/" + managedBook[0].Index), {
            Title: managedBook[0].Title,
            Genre: managedBook[0].Genre,
            Inventory: managedBook[0].Inventory,
            InventoryWanted: managedBook[0].InventoryWanted,
            Price: managedBook[0].Price,
        });
    }, [managedBook]);

    return books.map((book, index) => {
        return (
            <BookRow
                key={index}
                book={book}
                index={index}
                setBook={setBook}
                setShow={setShow}
            />
        );
    });
}
