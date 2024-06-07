// scripts/seedRecipes.js

const { MongoClient, ObjectId } = require('mongodb');

async function insertRecipe() {
  const client = new MongoClient('mongodb://localhost:27017');  // Replace with your MongoDB URI if different
  try {
    await client.connect();
    const db = client.db('yourDatabaseName');  // Replace with your actual database name
    const recipes = db.collection('recipes');
    const result = await recipes.insertOne({
      "_id": new ObjectId("666240d06c3ce648a36bbc66"),  // Use new ObjectId() to create an ObjectId
      "name": "Spaghetti Carbonara",
      "ingredients": [
        "200g spaghetti",
        "100g pancetta",
        "2 large eggs",
        "50g pecorino cheese",
        "50g parmesan cheese",
        "2 plump garlic cloves",
        "50g unsalted butter",
        "Sea salt and freshly ground black pepper"
      ],
      "instructions": "1. Cook the spaghetti. 2. Fry the pancetta. 3. Beat the eggs with cheese...",
      "user": new ObjectId("666243616c3ce648a36bbc6d")  // Ensure this ObjectId exists in your User collection
    });
    console.log('Recipe saved successfully:', result);
  } catch (err) {
    console.error('Error inserting recipe:', err);
  } finally {
    await client.close();
  }
}

insertRecipe();
