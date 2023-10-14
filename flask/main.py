from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask, request, redirect, url_for, session, jsonify
from decouple import config
from bson import ObjectId
import bcrypt

app = Flask(__name__)
app.secret_key = config('SECRET_KEY')
client = MongoClient(config('MONGO_URI'), server_api=ServerApi('1'))
db = client[config('MONGO_DB')]
users_collection = db['users']
ingredients_collection = db['ingredients']

def is_authenticated():
    return 'username' in session

@app.before_request
def authentication_middleware():
    if not is_authenticated() and request.endpoint not in ['login', 'signup']:
        # Redirect to the login page if not authenticated
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
        return redirect(url_for('profile'))
    else:
        return jsonify({'error': 'Incorrect Credentials'}), 401


@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']

    existing_user = users_collection.find_one({'username': username})

    if not existing_user:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        users_collection.insert_one({'username': username, 'password': hashed_password})
        session['username'] = username
        return redirect(url_for('profile'))
    else:
        return jsonify({'error': 'User already exists'}), 400

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

@app.route('/profile')
def profile():
    return f'Welcome, {session["username"]}'

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


app.run(host='0.0.0.0', port=5000)
