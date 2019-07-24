from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import time
from sonar import *
import asyncio, concurrent.futures

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
loop = asyncio.get_event_loop()

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('client-event')
def test_message(message):
    loop.run_until_complete(test_message_async(message))
            
async def test_message_async(message):    
    print("test_message:")
    print(message)
    print("wating for button press")
    while True:
        distance = await sonar_sample()
        print (distance)
        if distance < 35 and distance > 8:
            print("Im here:", distance)
            emit('server-event', {'data': distance})
            return

@socketio.on('connect')
def test_connect():
    print("test_connect:")
    sonar_init()
    emit('server-event', {'data': 0})

@socketio.on('disconnect')
def test_disconnect():
    sonar_close()
    print("test_disconnect:")

if __name__ == '__main__':
    socketio.run(app, port=5000)
    loop.close()
