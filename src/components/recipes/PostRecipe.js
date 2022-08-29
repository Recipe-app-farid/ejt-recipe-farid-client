import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import {v4 as uuidv4} from "uuid"
import {images} from "../../constants"

export default function Recipe() {
    const [recipeData, setRecipeData] = useContext(MainContext)
    const [recipes, setRecipes] = useState([]);
    const [form, setForm] = useState({
        title: "",
        desc: "",
        ingredients: [],
        steps: [],
        image: "",
        _id: uuidv4(),
    });

    // const URL = import.meta.env.VITE_BACKEND_URL || "mongodb://localhost/ejt-recipe-app"
    const URL = "https://ejt-recipe-app.herokuapp.com/postrecipe"
    const [popupActive, setPopupActive] = useState(false);


    useEffect(()=>{
        const getRecipe = async () => {
            try{
                const resp = await axios.get("https://ejt-recipe-app.herokuapp.com/getrecipe" , {
                    withCredentials: true
                })
                setRecipes(resp.data)
            }catch(err){
                console.log(err)
            }
            
        }
        getRecipe()
    },[])




    useEffect(()=>{
        
    },[])

    const handleStepCount = () => {
        setForm({
            ...form,
            steps: [...form.steps, ""],
        });
    };

    const handleIngredientCount = () => {
        setForm({
            ...form,
            ingredients: [...form.ingredients, ""],
        });
    };


    const handleStep = (e, i) => {
        const stepsClone = [...form.steps];
        stepsClone[i] = e.target.value;
        setForm({
            ...form,
            steps: stepsClone,
        });
    };

    const handleIngredient = (e, i) => {
        const ingredientClone = [...form.ingredients];
        ingredientClone[i] = e.target.value;
        setForm({
        ...form,
        ingredients: ingredientClone,
        });
        };
        


    const handleView = (id) => {
        const recipesClone = [...recipes];
        recipesClone.forEach((recipe) => {
            if (recipe._id === id) {
                console.log("_id", recipe._id)
                recipe.viewing = !recipe.viewing;
            } else {
                recipe.viewing = false;
            }
        });
        setRecipes(recipesClone);
        console.log(recipesClone)
        console.log("id", id)
    };





    const recipeHandle = async (e) => {
        e.preventDefault()

        if (!form.title || !form.desc || !form.ingredients || !form.steps) {
            alert("Please fill out all fields");
            return;
            }
      
            const postRecipe = async () => {
                try {
                    const axiosResp = await axios.post(URL, form, {
                      withCredentials: true,
                    });
                    console.log("axiosResp.data:", form);
                    if (!axiosResp) {
                      console.debug("axiosResp.data:", axiosResp);
                    } else {
                      console.debug("axiosResp.data:", axiosResp);
                    }
                  } catch (error) {
                    console.log("Error while sending with axios", error);
                  }
            }
    
            postRecipe()

        setForm({
            title: "",
            desc: "",
            ingredients: [],
            steps: [],
            image: "",
            

            });
    }

    

    const deleteRecipe = (id) => {
        const deletedRec = recipes.filter(recipe => {
            
            return recipe._id !== id;
        })
        setRecipes(deletedRec)
        console.log("recipesVomDelete", recipes)
        

        const axiosdeleteRecipe = async () => {
            try {
                const axiosDeleteResp = await axios.delete(URL, {data: {_id : id}} ,{
                  withCredentials: true,
                });
                ;
                if (!axiosDeleteResp) {
                  console.debug("axiosDeleteResp.data:", axiosDeleteResp);
                } else {
                  console.debug("axiosDeleteResp.data:", axiosDeleteResp);
                }
              } catch (error) {
                console.log("Error while sending with axios", error);
              }
        }

        axiosdeleteRecipe()
   
    }






    return (

        <>
            <img className="bg-Home" src={images.bgImage} alt="" />


            <h1>My recipes</h1>
            <button onClick={() => setPopupActive(!popupActive)}>Add recipe</button>

            <div className="recipes">
                {recipes.map((recipe) => (
                    <div className="recipe" >
                        <h3>{recipe.title}</h3>
                        {recipe.viewing && (
                            <div className="recipe"> 
                                <img className="img" src={recipe.image} alt={recipe.desc} />
                                <p>{recipe.desc}</p>
                                <h4>Ingredients</h4>
                                <ul>
                                    {recipe.ingredients.map((ingredient, i) => (
                                        <li key={i}>{ingredient}</li>
                                    ))}
                                </ul>
                                <h4>Steps</h4>
                                <ol>
                                    {recipe.steps.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                        <div className="buttons">
                            <button onClick={() => handleView(recipe._id)}>
                                View {recipe.viewing ? "less" : "more"}
                            </button>
                            <button
                                onClick={() => {deleteRecipe(recipe._id)}}
                                className="remove"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {popupActive && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Add a new recipe</h2>
                        <form onSubmit={recipeHandle} >
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </div>

                           <div className="form-group">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    value={form.desc}
                                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Ingredients</label>
                                {form.ingredients.map((ingredient, i) => (
                                    <input
                                        type="text"
                                        key={i}
                                        value={ingredient}
                                        onChange={(e) => handleIngredient(e, i)}
                                    />
                                ))}
                                <button type="button" onClick={handleIngredientCount}>
                                    Add ingredient
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Steps</label>
                                {form.steps.map((step, i) => (
                                    <textarea
                                        type="text"
                                        key={i}
                                        value={step}
                                        onChange={(e) => handleStep(e, i)}
                                    />
                                ))}
                                <button type="button" onClick={handleStepCount}>
                                    Add Step
                                </button>
                            </div>
                            <div className="buttons">
                                <button onSubmit={() => recipeHandle()} type="submit">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="remove"
                                    onClick={() => setPopupActive(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}