from flask import Flask, render_template, request, jsonify
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

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/ingredients', methods=["GET"])
def get_ingredient():
    pass

@app.route('/post', methods=["POST"])
def ask_recipe():
    pass


app.run(host='0.0.0.0', port=5000)