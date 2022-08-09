import React ,{ useState, useEffect } from "react";
import {Route ,Routes , Navigate} from "react-router-dom"
import { MainContextProvider } from "../context/MainContext";
import PostRecipe from "./recipes/PostRecipe"
// import GetRecipe from "./recipes/GetRecipe"




const App = () => {
  
    return (
        <>
        <div className="App">
            <MainContextProvider>
                <Routes>
                    <Route path="/" element={<PostRecipe/>} />
                    {/* <Route path="/getrecipe" element={<GetRecipe/>} /> */}
                </Routes>
            </MainContextProvider>
        </div>
        </>
    );
};

export default App;