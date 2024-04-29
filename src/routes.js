import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPitstop from "./pages/loginPitstop/LoginPitstop"

function Rotas() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />
                    </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;