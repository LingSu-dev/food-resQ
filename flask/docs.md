# API Documentation

## POST /api/login

**Description**: Used to log in a user. Requires username and password as strings. Returns 200 for success, 401 for incorrect credentials, and 500 for a server error.

## POST /api/signup

**Description**: Used to sign up a new user. Requires username and password as strings. Returns 200 for success, 400 if the user exists, and 500 for a server error.

## GET /api/signout

**Description**: Used to sign out the currently logged-in user. No request data is required. Returns 200 for a successful signout.

## POST /api/ingredients

**Description**: Adds a new ingredient to the currently logged-in user's inventory. Requires JSON data with "name" (string), "amount" (float), "unit" (string), and "expiry_date" (string in yyyy/mm/dd format). Returns 201 for success, 400 for invalid data, 401 for missing or invalid authentication token, and 500 for a server error.

## POST /api/ingredients/<:_id>

**Description**: Updates an existing ingredient in the user's inventory. Requires JSON data with "name" (string), "amount" (float), "unit" (string), and "expiry_date" (string in yyyy/mm/dd format). Returns 200 for success, 400 for invalid data, 401 for missing or invalid authentication token, 404 if the ingredient is not found, and 500 for a server error.

## GET /api/ingredients

**Description**: Retrieves the current user's entire inventory of ingredients. No request data is required. Returns a JSON object with the user's ingredients in the "fridge" array. Requires authentication token in the cookie. Returns 200 for success, 401 for missing or invalid authentication token, and 500 for a server error.

## DELETE /api/ingredients/<:_id>

**Description**: Deletes an ingredient from the user's inventory. No request data is required. Returns 204 for success, 401 for missing or invalid authentication token, 404 if the ingredient is not found, and 500 for a server error.

## DELETE /api/ingredients

**Description**: Deletes all ingredients from the current user's inventory. No request data is required. Returns 204 for success, 401 for missing or invalid authentication token, and 500 for a server error.

## POST /api/LLM/users/:username=[]/getRecipes

**Description**: Performs a specific action with JSON data containing "customization" and "preference" (both as arrays of strings). The exact functionality is unspecified. Requires an authentication token in the cookie. Returns a placeholder response, 200 for success, 401 for missing or invalid authentication token, and 500 for a server error.

