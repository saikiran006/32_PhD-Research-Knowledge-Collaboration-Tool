from flask import Flask, request, jsonify
from recommendations import recommendations

app = Flask(__name__)

@app.route('/searching', methods=['POST'])
def get_recommendations():
    data = request.json
    recommended_ids = recommendations(data["searchText"])
    return jsonify(recommended_ids)

if __name__ == '__main__':
    
    app.run(host='127.0.0.1', port=5000)
