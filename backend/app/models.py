from . import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from . import login_manager


class User(UserMixin, db.Model):
    # table #1: Users
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(64), unique = True, index = True)
    password_hash = db.Column(db.String(128))
    firstname = db.Column(db.String(64), index = True)
    registered_event = db.Column(db.Integer, db.ForeignKey("events.id"))

    def __repr__(self):
        return "<user %r>" % self.username

    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class Events(db.Model):
    # table #2: Events
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key = True)
    eventName = db.Column(db.String, index = True)
    eventDate = db.Column(db.Integer)
    eventDescription = db.Column(db.String(255), nullable=False)
    users = db.relationship("User", backref="event")


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


