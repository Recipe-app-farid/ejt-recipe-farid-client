import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const MainContext = createContext();


export const MainContextProvider = (props) => {
    const [recipes, setRecipes] = useState({});

    useEffect(() => {
      
        const getRecipe = async () => {
          try {
            const resp = await axios.get("/recipe", {
              withCredentials: true,
            });
            setRecipes(resp.data);
          } catch (err) {
            console.log(err.message);
          }
    
        };
    
        getRecipe();
      }, []);
      return (
        <MainContext.Provider
          value={[
            recipes,
            setRecipes,
          ]}
        >
          {props.children}
        </MainContext.Provider>
      )


}