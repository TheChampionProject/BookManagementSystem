import { Modal, Button, Table } from "react-bootstrap";
import React, { useRef, useState } from "react";
import axios from "axios";
import QueryResults from "./QueryResults.js";
import "../App.css";

export default function AddPopup({ showAddPopup, setShowAddPopup, setAlert }) {
    const [queryList, setQueryList] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const searchQuery = useRef("");

    const searchForBook = async (e) => {
        e.preventDefault();

        console.log(showTable);
        let query = await axios
            .post(process.env.REACT_APP_BACKEND_URL + "getSearchQueryBooks", {
                title: searchQuery.current.value,
            })
            .catch(() => {
                setAlert({
                    show: true,
                    message:
                        "There was a problem with your search query. Please refresh and try again.",
                    success: false,
                });
            });

        setShowTable(true);
        setQueryList(query.data);

        console.log(queryList);
    };
    return (
        <>
            <Modal show={showAddPopup} onHide={() => setShowAddPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Book</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <input
                            type="text"
                            placeholder="Search For a Title"
                            className="AddPopup"
                            ref={searchQuery}
                        />

                        <Button
                            variant="secondary"
                            className="btn btn-success"
                            type="submit"
                            onClick={(e) => {
                                searchForBook(e);
                            }}
                        >
                            Search
                        </Button>
                    </Modal.Body>
                </form>
                <Modal.Footer>
                    <Table style={{ display: showTable ? "" : "none" }}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            <QueryResults queryList={queryList} />
                        </tbody>
                    </Table>
                </Modal.Footer>
            </Modal>
        </>
    );
}
