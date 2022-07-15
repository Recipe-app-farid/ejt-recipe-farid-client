import React ,{ useState, useEffect } from "react";
import {Route ,Routes , Navigate} from "react-router-dom"
import { MainContextProvider } from "../context/MainContext";
import PostRecipe from "./recipes/PostRecipe"




const App = () => {
  
    return (
        <>
        <div className="App">
            <MainContextProvider>
                <Routes>
                    <Route path="/postrecipe" element={<PostRecipe/>} />
                    
                </Routes>
            </MainContextProvider>
        </div>
        </>
    );
};

export default App;