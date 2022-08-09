import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const MainContext = createContext();


export const MainContextProvider = (props) => {
    const [recipesData, setRecipesData] = useState({});

    useEffect(() => {
      
        const getRecipe = async () => {
          try {
            const resp = await axios.get("https://recipe-app-react-farid.netlify.app/getrecipe", {
              withCredentials: true,
            });
            setRecipesData(resp.data);
          } catch (err) {
            console.log(err.message);
          }
    
        };
    
        getRecipe();
      }, []);
      return (
        <MainContext.Provider
          value={[
            recipesData,
            setRecipesData,
          ]}
        >
          {props.children}
        </MainContext.Provider>
      )


}