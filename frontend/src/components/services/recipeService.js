import axios from 'axios';

const API_URL = '/api/recipes';

export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addRecipe = async (recipeData) => {
  const response = await axios.post(API_URL, recipeData);
  return response.data;
};

