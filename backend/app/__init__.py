from flask import Flask, make_response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_session import Session
from config import config
from flask_login import LoginManager

login_manager = LoginManager()
login_manager.login_view = "main.login"
db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__)
    # initializing any Flask extensions or plugins 
    # with the app object instead of a Blueprint object.
    # Anything we want to do with App, must not do it with the blue print
    print(config[config_name])

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)
    # Session(app)

    # SQL table creating

    login_manager.init_app(app)
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    print("Hi, app created")
    # server_session = Session(app)

# need to register the blueprint (which has the two table models)
# Then create them
    with app.app_context():
        db.create_all()
        from app.main.addEndPoint import createEvents

        createEvents("Conference on Sustainable Development", 2023, "Join us for a 3-day conference on sustainable development, featuring keynote speakers, interactive workshops, and networking opportunities.")
        createEvents("Annual Charity Gala", 2023, "Dress up for a night of glitz and glamour at our annual charity gala, where we'll raise funds for a great cause.")
        # createEvents("Music Festival", 2023, "Get ready to dance the night away at our annual music festival, featuring top artists and performers.")
        # createEvents("Tech Summit", 2023, "Join us for a day of innovation and inspiration at our tech summit, where industry leaders will share their insights and expertise.")
        # createEvents("Art Exhibition", 2024, "Experience the beauty and creativity of local artists at our art exhibition, featuring a wide variety of works in different styles and mediums.")

        
    # app.run(port=8000, debug=True)
    return app


# SQL

