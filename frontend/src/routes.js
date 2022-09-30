import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create from "./pages/Create";
import Show from "./pages/Show"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Create />} />
                <Route path="/listar" element={<Show />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes