import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/MainContext";
import axios from "axios";

export default function Recipe() {
    const [recipe, setRecipe] = useContext(MainContext)
    const [recipes, setRecipes] = useState([]);
    const [form, setForm] = useState({
        title: "",
        desc: "",
        ingredients: [],
        steps: [],
        image: "",
    });

    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/postrecipe"

    const [popupActive, setPopupActive] = useState(false);


    // useEffect(()=>{
    //     const getRecipe = async () => {
    //         try{
    //             const resp = await axios.get("/recipe" , {
    //                 withCredentials: true
    //             })
    //             setRecipe(resp.data)
    //         }catch(err){
    //             console.log(err)
    //         }
            
    //     }
    //     getRecipe()
    // },[])


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
            if (recipe.id === id) {
                recipe.viewing = !recipe.viewing;
            } else {
                recipe.viewing = false;
            }
        });
        setRecipes(recipesClone);
    };


        

    



    const recipeHandle = async (e) => {
        e.preventDefault()

        if (!form.title || !form.desc || !form.ingredients || !form.steps) {
            alert("Please fill out all fields");
            return;
            }
        console.log(form)

        
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


        
 
        
        // const fetchData = async () => {
        //     try{
        //         await axios({
        //             method: 'post',
        //             url: URL,
        //             data: {
        //                 title: form.title,
        //                 decs: form.desc,
        //                 ingredient: form.ingredients,
        //                 steps: form.steps
        //             },
        //         })
        //     }catch(err){
        //         console.log(err)
        //     }
        // }

        // fetchData()


                    
        setForm({
            title: "",
            desc: "",
            ingredients: [],
            steps: [],
            image: "",
            });
    }










    return (

        <>
            <h1>My recipes</h1>
            <button onClick={() => setPopupActive(!popupActive)}>Add recipe</button>

            <div className="recipes">
                {recipes.map((recipe) => (
                    <div className="recipe" key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        {recipe.viewing && (
                            <div>
                                <img className="img" src={recipe.image} alt={recipe.desc} />
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
                            <button onClick={() => handleView(recipe.id)}>
                                View {recipe.viewing ? "less" : "more"}
                            </button>
                            <button
                                onClick={() => { }}
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