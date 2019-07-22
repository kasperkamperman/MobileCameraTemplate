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


# #!/usr/bin/python
# import websocket
# import thread
# import time

# def on_message(ws, message):
#     print ("on_message: " + message)

# def on_error(ws, error):
#     print ("on_error: " + str(error))

# def on_close(ws):
#     print ("### closed ###")

# def on_open(ws):
#     def run(*args):
#         for i in range(30000):
#             time.sleep(1)
#             #ws.send("Hello %d" % i)
#         time.sleep(1)
#         ws.close()
#         print ("thread terminating...")
#     thread.start_new_thread(run, ())


# if __name__ == "__main__":
#     websocket.enableTrace(True)
#     ws = websocket.WebSocketApp("ws://localhost:5000/",
#                                 on_message = on_message,
#                                 on_error = on_error,
#                                 on_close = on_close)
#     ws.on_open = on_open

#     ws.run_forever()
