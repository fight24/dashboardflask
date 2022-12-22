from unicodedata import name
from flask import Blueprint, render_template
from flask_login import login_required, current_user
from .__init__ import db
from .models import data_sensor

main = Blueprint('main', __name__)


@main.route('/')
def home():
        return render_template('HomeBase.html',name = "home")

@main.route('/dashboard')
@login_required
def dashboard():
        return render_template('map.html',name=current_user.name)

@main.route('/table')
@login_required
def table():
        return render_template('table.html')
@main.route('/profile')
@login_required
def profile():
        return render_template('profile.html')
@main.route('/work')
@login_required
def work():
        return render_template('work.html')
@main.route('/info')
@login_required
def info():
    datas = data_sensor.query.all()
    msg =[]
    for msg in datas:
        msg = msg.message
    return  render_template('info.html',name = msg)