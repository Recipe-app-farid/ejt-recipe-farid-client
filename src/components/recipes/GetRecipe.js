// import React, { useState, useEffect, useContext } from "react";
// import { MainContext } from "../../context/MainContext";
// import axios from "axios";

// export default function GetRecipe() {
//     const [recipeData, setRecipeData] = useContext(MainContext)
//     const [recipes, setRecipes] = useState([]);


//     useEffect(()=>{
//         setRecipes(recipeData)
//     },[])

//         const handleView = (id) => {
//         const recipesClone = [...recipes];
//         recipesClone.forEach((recipe) => {
//             if (recipe.id === id) {
//                 recipe.viewing = !recipe.viewing;
//             } else {
//                 recipe.viewing = false;
//             }
//         });
//         setRecipes(recipesClone);
//     };


//     return(
//         <>
//                    <div className="recipes">
//                 {recipes.map((recipe) => (
//                     <div className="recipe" key={recipe.id}>
//                         <h3>{recipe.title}</h3>
//                         {recipe.viewing && (
//                             <div>
//                                 <img className="img" src={recipe.image} alt={recipe.desc} />
//                                 <h4>Ingredients</h4>
//                                 <ul>
//                                     {recipe.ingredients.map((ingredient, i) => (
//                                         <li key={i}>{ingredient}</li>
//                                     ))}
//                                 </ul>
//                                 <h4>Steps</h4>
//                                 <ol>
//                                     {recipe.steps.map((step, i) => (
//                                         <li key={i}>{step}</li>
//                                     ))}
//                                 </ol>
//                             </div>
//                         )}
//                         <div className="buttons">
//                             <button onClick={() => handleView(recipe.id)}>
//                                 View {recipe.viewing ? "less" : "more"}
//                             </button>
//                             <button
//                                 onClick={() => { }}
//                                 className="remove"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }