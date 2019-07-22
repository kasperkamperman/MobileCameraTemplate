from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('client-event')
def test_message(message):
    print("test_message:")
    print(message)
    time.sleep(1)
    emit('server-event', {'data': message['data'] + 1})

@socketio.on('connect')
def test_connect():
    print("test_connect:")
    emit('server-event', {'data': 0})

@socketio.on('disconnect')
def test_disconnect():
    print("test_disconnect:")

if __name__ == '__main__':
    socketio.run(app, port=5000)