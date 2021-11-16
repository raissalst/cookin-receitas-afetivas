import { Box } from "@chakra-ui/layout";
import { HeaderWelcome } from "../../components/HeaderWelcome";
import { useSharedRecipes } from "../../providers/recipes";
import HeaderLogo from "../../components/HeaderLogo/index";
import { SearchBox } from "../../components/SearchBox";
import Menu from "../../components/Menu";
import { CardsList } from "../../components/CardsList";
import { useEffect } from "react";
import EmptyFavoritesPage from "../../components/EmptyFavoritesPage";

const RecipesFavorite = () => {
  const {
    recipes,
    recipeFavorites,
    recipesSharedFound,
    setRecipesSharedFound,
    searchForRecipePublic,
    getFavoriteRecipes,
    searchForRecipeFavorite,
    recipesFavoritesFound,
    setRecipesFavoritesFound,
  } = useSharedRecipes();

  const user = localStorage.getItem("@cookin:user") || "";
  const userId = JSON.parse(user).id;

  useEffect(() => {
    getFavoriteRecipes(userId);
  }, [recipes]);

  return (
    <Box>
      <HeaderWelcome />
      <HeaderLogo />
      <Menu index={2} />
      {recipeFavorites.length === 0 ? (
        <EmptyFavoritesPage />
      ) : (
        <>
          <SearchBox functionToSearch={searchForRecipeFavorite} />
          <CardsList
            state={recipeFavorites}
            stateOfSearchedRecipes={recipesFavoritesFound}
            setStateOfSearchedRecipes={setRecipesFavoritesFound}
            typeCard="heart"
          />
        </>
      )}
    </Box>
  );
};

export default RecipesFavorite;