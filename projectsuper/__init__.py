from flask import Flask,render_template,url_for,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_compress import Compress


# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()
compress = Compress()
def create_app():
    app = Flask(__name__)
    compress.init_app(app)
    migrate = Migrate(app, db)
    app.config['SECRET_KEY'] = 'keyheremen'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.sqlite' #mssql+pyodbc://DESKTOP-UI1ST9R\SQLEXPRESS/flasksql

    db.init_app(app)
    from . import models

    with app.app_context():
        db.create_all()
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))
    

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
  
    return app