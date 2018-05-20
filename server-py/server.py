from flask import Flask, jsonify, request
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

users = [
    {
        "username": "iaml",
        "full_name": "Eduard Telezhnikov",
        "status": "online",
        "last_seen_at": None,
    },
    {
        "username": "everzilov",
        "full_name": "Evgeny Verzilov",
        "status": "offline",
        "last_seen_at": None,
    },
    {
        "username": "sergeyk555",
        "full_name": "Sergey K",
        "status": "offline",
        "last_seen_at": None,
    },
]


@app.route('/api/users/', methods=['GET'])
def user_list():
    return jsonify({
        "status": "OK",
        'payload': users,
    })


@app.route('/api/users/<string:name>/', methods=['GET', 'PUT'])
def user_detail(name):
    users_filtered = [user for user in users if user['username'] == name]
    if len(users_filtered) < 1:
        return jsonify({
            "status": "error",
            'error': "user not found",
        })
    user = users_filtered[0]
    if request.method == 'PUT':
        try:
            user['username'] = request.form["name"]
        except: 
            return jsonify({
                "status": "error",
                'error': "invalid username or request data",
            })
    return jsonify({
        "status": "OK",
        'payload': user,
    })


if __name__ == '__main__':
    socketio.run(app, debug=True)