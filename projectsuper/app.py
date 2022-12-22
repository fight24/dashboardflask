from .__init__ import create_app,db
from .models import data_sensor
from flask import  render_template,make_response,request
import eventlet
import json
from flask_mqtt import Mqtt
from flask_socketio import SocketIO
from flask_ngrok import run_with_ngrok

app = create_app()
run_with_ngrok(app)
eventlet.monkey_patch()
app.config['SECRET'] = 'my secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MQTT_BROKER_URL'] = 'g7616f69-internet-facing-0f07000e0e8c39f1.elb.ap-northeast-1.amazonaws.com'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = 'root'
app.config['MQTT_PASSWORD'] = 'root'
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_TLS_ENABLED'] = False
app.config['MQTT_CLEAN_SESSION'] = True

# Parameters for SSL enabled
# app.config['MQTT_BROKER_PORT'] = 8883
# app.config['MQTT_TLS_ENABLED'] = True
# app.config['MQTT_TLS_INSECURE'] = True
#app.config['MQTT_TLS_CA_CERTS'] = 'ca.crt'


mqtt = Mqtt(app)
socketio = SocketIO(app)

@app.route('/nhap')
def nhap():
    return render_template('nhap.html')
@app.errorhandler(404)
def not_found(e):
        return render_template("404.html")
@socketio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt.publish(data['topic'], data['message'])
    #print(json_str)
@socketio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt.subscribe(data['topic'])
    #print(json_str)
    #print('-'*10)
    #print(data['topic'])
    


@socketio.on('unsubscribe_all')
def handle_unsubscribe_all():
    mqtt.unsubscribe_all()


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
            topic=message.topic,
            payload=message.payload.decode()
        ) 
    topic= data['topic']
    message = data['payload']
    if topic != None or message != None:
        with app.app_context():
            new_data = data_sensor(topic=topic,message=message)
            db.session.add(new_data)
            db.session.commit() 
    socketio.emit('mqtt_message', data=data)
   
@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
    print(level,buf)
 


if __name__ == '__main__':
    # important: Do not use reloader because this will create two Flask instances.
    # Flask-MQTT only supports running with one instance
    socketio.run(app, port=5000, use_reloader=True, debug=True)
    
