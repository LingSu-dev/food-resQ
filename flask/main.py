from flask import Flask, render_template, request, jsonify, session, redirect, request

import os 
import openai 

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://food-resQ-admin:HnDnjPdhq9hJR8tv@fridge.29trfir.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Select the database and collection you want to work with
db = client['your_database_name']
users_collection = db['users']

# Function to add a new user to the database
def db_user(username, password):
    # Check if the user already exists
    existing_user = users_collection.find_one({'username': username})

    if existing_user:
        # User already exists, return None or an error code
        return None
    else:
        # User doesn't exist, create a new user document
        user_data = {
            'username': username,
            'password': password,
            'fridge': {}
        }
        # Insert the new user document into the collection
        result = users_collection.insert_one(user_data)
        # Return the user's unique ID (ObjectId)
        return str(result.inserted_id)

# Function to update a user's fridge
def db_user_fridge(username, fridge):
    # Update the 'fridge' field of the user document based on the provided userID
    users_collection.update_one({'username': username}, {'$set': {'fridge': fridge}})
    # Optionally, you can handle errors and return appropriate status


app = Flask(__name__)

@app.route('/')
def index():
    db_user("joee", "mama")
    db_user_fridge("joee", [["tomato", 1, "piece", "2000/03/09"], ["spy's shead", 1, "cranium", "N/A"]])
    return render_template('index.html')

@app.route('/api/ingredients', methods=["GET"])
def get_ingredient():
    # Get the username from the request (you may want to use user authentication)
    username = request.args.get('username')

    if username:
        # Find the user document in the collection based on the user_id
        user = users_collection.find_one({'username': username})

        if user:
            # Get the user's fridge contents
            fridge_contents = user.get('fridge', {})
            return jsonify(fridge_contents)
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'User ID not provided'}), 400

@app.route('/post', methods=["POST"])
def ask_recipe():
    pass


app.run(host='0.0.0.0', port=5000)