from .__init__ import db
from flask_login import UserMixin
from datetime import datetime
import pytz

t = datetime.now
class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))


class data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime,default=t)
    topic = db.Column(db.String(1000))
    def __repr__(self) :
        return f"data('{self.date}','{self.topic}')"

class mpu6050_1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime,default=t)
    serial = db.Column(db.String(1000))
    Ax = db.Column(db.Integer)
    Ay = db.Column(db.Integer)
    Az = db.Column(db.Integer)
    Gx = db.Column(db.Integer)
    Gy = db.Column(db.Integer)
    Gz = db.Column(db.Integer)
    Temp = db.Column(db.Integer)
    def __repr__(self) :
        return f"mpu6050_1('{self.serial}','{self.Ax}','{self.Ay}','{self.Az}','{self.Gx}','{self.Gy}','{self.Gz}','{self.Temp}')"
        
class bh1750_1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime,default=t)
    serial = db.Column(db.String(1000))
    lux = db.Column(db.Integer)
    def __repr__(self):
        return f"bh1750_1('{self.serial}','{self.lux}')"

class data_sensor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime,default=t)
    topic = db.Column(db.String(1000))
    message= db.Column(db.String(1000))
    def __repr__(self):
        return f"data_sensor('{self.topic}','{self.message}')"



    
    

