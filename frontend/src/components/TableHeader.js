import React from "react";
import "../App.css";

export default function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Inventory</th>
                <th>Price</th>
                <th>Manage</th>
            </tr>
        </thead>
    );
}
