import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    
    @staticmethod
    def init_app(app):
        app.config["SESSION_PERMANENT"] = False
        app.config["SESSION_TYPE"] = "filesystem"
        app.config["SECRET_KEY"] = "hard to guess string"
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "data.sqlite")

        
class DevelopmentConfig(Config):
    DEBUG = True
    PORT = 8000


class TestingConfig(Config):
    #testing initialization
    TESTING = True
    
class ProductionConfig(Config):
    #production initialization
    DEBUG = False
    
config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}


