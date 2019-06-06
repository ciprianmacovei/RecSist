from flask import Flask, request, jsonify, send_file
from rec import *
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/",  methods=['POST', 'GET'])
def root():
    if request.method == "POST":
        id = str(request.data).strip("'")
        id = id.strip("b")
        id = id[1:]
        newID = json.loads(id)
        arrayOfIds = itemRecommender(str(newID['id']))
        return jsonify(arrayOfIds)
    if request.method == "GET":
        return "This is the server! (GET)"
        

@app.route("/item", methods=['POST', 'GET'])
def manea():
    print(request.method)
    
    dict = {}
    message = "am intrat aici"


    return jsonify( manea=manea, message=message ), status




if __name__ == "__main__":
    dict = {}
    
    app.run(host='0.0.0.0')
