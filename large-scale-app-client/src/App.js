import React, { useState } from "react";
import DataGridComponent from "./components/DataGridComponent";
import { Button } from "@mui/material";
import "./App.css";

function App() {
  const [entity, setEntity] = useState("Products");

  return (
    <div className="App">
      <h1>Large Scale App</h1>
      <div>
        <Button onClick={() => setEntity("Products")}>Products</Button>
        <Button onClick={() => setEntity("Orders")}>Orders</Button>
        <Button onClick={() => setEntity("Customers")}>Customers</Button>
        <Button onClick={() => setEntity("Inventory")}>Inventory</Button>
        <Button onClick={() => setEntity("Suppliers")}>Suppliers</Button>
      </div>
      <DataGridComponent entity={entity} />
    </div>
  );
}

export default App;
