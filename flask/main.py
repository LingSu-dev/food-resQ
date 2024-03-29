from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request, redirect, url_for, session, jsonify
from decouple import config
from bson import ObjectId
import bcrypt
import openai
import langchain
# from langchain.chat_models import ChatOpenAI as OpenAI
from langchain.llms import OpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.schema import AIMessage, HumanMessage, SystemMessage
import os
import logging
from flask_cors import CORS 

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = config('SECRET_KEY')
client = MongoClient(config('MONGO_URI'), server_api=ServerApi('1'))
db = client[config('MONGO_DB')]
users_collection = db['users']
ingredients_collection = db['ingredients']

os.environ["OPENAI_API_KEY"] = config('OPENAPIKEY')
# llm=OpenAI(temperature=0, model_name="gpt-3.5-turbo-16k-0613")
llm=OpenAI(temperature=0, model_name="gpt-3.5-turbo")

def is_authenticated():
    return 'username' in session

@app.before_request
def authentication_middleware():
    if not is_authenticated() and request.endpoint not in ['login', 'signup']:
        # Redirect to the login page if not authenticated
        print("reached middleware")
        return 'You are not logged in'

@app.route('/')
def home():
    return 'Welcome to the home page'

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    username = body.get("username")
    password = body.get("password")

    user = users_collection.find_one({'username': username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        session['username'] = username
        print(session['username'])
        return session['username']
    else:
        return jsonify({'error': 'Incorrect Credentials'}), 401


@app.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    username = body.get("username")
    password = body.get("password")
    
    existing_user = users_collection.find_one({'username': username})

    if not existing_user:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        users_collection.insert_one({'username': username, 'password': hashed_password})
        return username
    else:
        return jsonify({'error': 'User already exists'}), 400

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({}), 200

@app.route('/ingredients', methods=['POST'])
def create_ingredient():
    username = session['username']
    
    body = request.get_json()
    if not body:
        return jsonify({'error': 'Invalid JSON data in the request body'}), 400
    
    new_ingredient = {
        'username': username,
        'name': body.get("name"),
        'unit': body.get("unit"),
        'amount': body.get("amount"),
        'expiry_date': body.get("expiry_date")
    }

    # Insert the new ingredient and get its _id
    result = ingredients_collection.insert_one(new_ingredient)

    if result.acknowledged:
        return jsonify({'message': 'Ingredient created successfully', '_id': str(result.inserted_id)})
    else:
        return jsonify({'error': 'Ingredient creation failed'}), 500

@app.route('/ingredients/<_id>', methods=["POST"])
def update_ingredient(_id):
    body = request.get_json()
    if not body:
        return jsonify({'error': 'Invalid JSON data in the request body'}), 400
    
    ing_query = {"_id": ObjectId(_id)}
    new_values = {"$set":{'name': body.get("name"), 'unit': body.get("unit"), 'amount': body.get("amount"), 'expiry_date': body.get("expiry_date")}}
    result = ingredients_collection.update_one(ing_query, new_values)
    
    if result.modified_count == 1:
        return jsonify({'message': 'Ingredient updated successfully'})
    else:
        return jsonify({'error': 'Ingredient not found or update failed'}), 404
    

@app.route('/ingredients', methods=["GET"])
def get_user_ingredients():
    username = session['username']
    
    ingredients = list(ingredients_collection.find({'username': username}))
    ingredients_list = []
    for ingredient in ingredients:
        ingredients_list.append({
            '_id': str(ingredient['_id']),
            'name': ingredient['name'],
            'unit': ingredient['unit'],
            'amount': ingredient['amount'],
            'expiry_date': ingredient['expiry_date']
        })

    return jsonify(ingredients_list)
    

@app.route('/ingredients', methods=["DELETE"])
def delete_all_user_ingredients():
    username = session['username']

    result = ingredients_collection.delete_many({'username': username})

    if result.deleted_count > 0:
        return jsonify({'message': f'Deleted {result.deleted_count} ingredients for {username}'})
    else:
        return jsonify({'message': 'No ingredients found for deletion'})

@app.route('/ingredients/<_id>', methods=["DELETE"])
def delete_ingredient(_id):
    ingredient = ingredients_collection.find_one({'_id': ObjectId(_id)})
    if not ingredient:
        return jsonify({'error': 'Ingredient not found or unauthorized'}), 404

    # Delete the ingredient
    ingredients_collection.delete_one({'_id': ObjectId(_id)})

    return jsonify({'message': 'Ingredient deleted successfully'})



@app.route('/LLM/getRecipes', methods=["POST"])
def get_LLM_recipes():
    body = request.get_json()
    custom = str(body.get("customization"))
    preference = str(body.get("preference"))
    # recipes_numbers = str(body.get("recipe_numbers"))
    recipes_numbers = str(3)
    servings = str(3)
    username = session['username']
    
    ingredients = list(ingredients_collection.find({'username': username}))
    ingredients_list = []
    for ingredient in ingredients:
        ingredients_list.append({
            'name': ingredient['name'],
            'unit': ingredient['unit'],
            'amount': ingredient['amount'],
            'expiry_date': ingredient['expiry_date']
        })
    user_ingredients = str(ingredients_list)

    prompt = """You are a home cook who needs to use their ingredients in the fridge. Make sure you are not using ingredients just to use them, make extra sure that you are trying your best to not use ingredients that you do not have, and make sure to use ingredients that makes sense together. 
    In your fridge you have """+user_ingredients+""", you are to provide """+recipes_numbers+""" recipe(s) complete with cooking time. As a request from your family, they provided you with some requirements {customization: """+custom+""", preference: """+preference+"""}.
    Take those requirements into consideration when you're generating the recipes. Additionally, try to keep each step concise and limit the number of steps to 6 or below for each recipe.
    Instead of using recipe1, recipe2, etc., consider replacing it proper dish names according to the recipe.
    
    Once you generate the results, map everything onto a single JSON object, defined as follows
    {ingredients: {recipe1: {ingredient1: [amount, unit], ingredient2: [amount, unit], ...}, recipe2: {ingredient1: [amount, unit], ingredient2: [amount, unit], ...}, recipe3: {ingredient1: [amount, unit], ingredient2: [amount, unit], ...}}, instructions: {recipe1: [step1, step2, ..., stepn, estimated preparation time], recipe2: [step1, step2, ..., stepn, estimated preparation time], recipe3: [step1, step2, ..., stepn, estimated preparation time]}}

    Don't return any text, just the JSON object. In other words, your answer should start with { and end with }
    """

    logging.basicConfig(filename="std.log", 
					format='%(asctime)s %(message)s', 
					filemode='w') 

    #Let us Create an object 
    logger=logging.getLogger() 

    #Now we are going to Set the threshold of logger to DEBUG 
    logger.setLevel(logging.DEBUG) 

    #some messages to test
    logger.debug(prompt)
    logger.debug("\n")
    messages = [
        HumanMessage(
            content="prompt"
        ),
    ]
    print(prompt)
    # recipe=llm(messages)
    # recipe = prompt
    recipe = llm(prompt)
    logger.debug(recipe) 
    print(recipe)

    return recipe





app.run(host='0.0.0.0', port=5000)
