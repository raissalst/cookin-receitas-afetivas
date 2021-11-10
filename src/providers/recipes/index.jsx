import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { api } from "../../services/api";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlcmxzdEBlbWFpbC5jb20iLCJpYXQiOjE2MzY1NzMwNTcsImV4cCI6MTYzNjU3NjY1Nywic3ViIjoiMyJ9.GaMz7T7HSl2fCnsKuklzhw9dgxwZcBM4BTZ2xtYA2jM";

  //lendo/puxando receitas públicas
  const getSharedRecipes = () => {
    api
      .get("/recipes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data);
        setRecipes([...response.data]);
      })
      .catch((error) => console.log(error));
  };

  //adicionando receitas públicas (compartilhamento)
  //vou receber de parâmetro o corpo do receita privada e adicionar 2 campos de favorites e id da receita privada
  const shareRecipe = (data) => {
    const { title, ingredients, instructions, category, author, userId, id } =
      data;
    api
      .post(
        "/recipes",
        {
          title: title,
          ingredients: ingredients,
          instructions: instructions,
          category: category,
          author: author,
          userId: userId,
          favorites_users: [],
          myrecipesId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        //toast de sucesso de compartilhamento
        // setRecipes([...recipes,...response.data]);
      })
      .catch((error) => console.log(error));
  };

  //deletando ou retirando compartilhamento de receitas públicas
  const deleteOrUnshareSharedRecipes = (id) => {
    api
      .delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        //toast de sucesso em deletar/descompartilhar
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSharedRecipes();
  }, [recipes]);

  return (
    <RecipesContext.Provider
      value={{
        getSharedRecipes,
        deleteOrUnshareSharedRecipes,
        shareRecipe,
        recipes,
        setRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useSharedRecipes = () => {
  return useContext(RecipesContext);
};
