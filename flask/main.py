from flask import Flask, render_template, request, jsonify
import os 
import openai 

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