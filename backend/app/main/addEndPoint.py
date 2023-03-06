from flask import Flask, make_response, request, jsonify, session
from flask_session import Session
from flask import request
from flask_login import login_required, current_user
from flask_login import login_user, logout_user
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import IntegrityError
from .. import db
from . import main
from ..models import User, Events
from .forms import UserForm, LoginForm

CORS(main)

@main.route("/")
def hi():
    return "hi"

@main.route('/signUpBackend', methods = ['POST'])
def add():
    form = UserForm()
    form.username = request.json['userName']
    form.fname = request.json['firstname']
    form.password = request.json['password'] 
    print(form.username)
    print(form.fname)
    print(form.password)
    print("validating information")

    print(form.data)
    # print(form.username.data)
    # print(form.fname.data)
    # print(form.username.data)
    if(form.validate):
        print("validated")
        username = form.username
        fname = form.fname
        pw = form.password
        
        try:
            createUser(username, pw, fname)
            print("createdUser!!!!!!")
            return jsonify({'success': 'Successfully registered!'})
        except IntegrityError:
            db.session.rollback()
            return jsonify({'409': 'Username already taken. Please choose a different username.'})

    return jsonify({
        '408' : 'enter your information pls'
    })

@main.route("/signInBackend", methods = ['POST'])
def login():
    print("hello, this is backend")

    form = LoginForm()
    form.username = request.json['userName']
    form.password = request.json['passWord'] 
    print(form.username)
    print(form.password)

    # form is validated
    if (form.validate):
        print("validated")
        try:
            user = User.query.filter_by(username = form.username).first()
        # if user and password is good
            if user is not None and user.verify_password(form.password):
                # print("about to login")
                login_user(user)
                # print(current_user.id)
                # print(current_user.username)
                # session["user_id"] = user.id
                # print(current_user.username)
                # print(session["user_id"])
                return jsonify({'success': 'Logged in!'})
            
            else:
                print("user not found")
                return jsonify({'300': 'Wrong username or password'})
        except:
        # else return error
            return jsonify({'301' : 'Invalid username or password.'})
        

    # form does not validate
    print("not validated, please enter your information")
    return jsonify({'mes' : 'Enter your login information'})

@main.route("/register", methods = ["GET", "POST"])
def userSignup():    
    # movies = Events.query.all()
    # if(current_user != None):
        # print(session["user_id"])
        # user = User.query.filter_by(username = "Chris").first()
        # login_user(user)
    
        # userid = session["user_id"]
        # print(userid)       
        # if user_id is None:
        #     return jsonify({"error": "User not logged in."})
        
        name = request.json['currUser']
        ename = request.json['title']
        print(name)
        print(ename)
        user = User.query.filter_by(username = name).first()
        event = Events.query.filter_by(eventName = ename).first()
        
        # print(name)

        if(user != None and event != None):
            registerEvent(user, event)
            return jsonify({"hello": "You have registered!"})
        
        return jsonify({"error": "somethings wrong"})


@main.route("/logoutBackend", methods=['GET'])
@login_required
def logout():
    print(current_user.username)
    logout_user()
    # print("logged out in backend")
    # session.pop("user_id")

    return jsonify({'success' : 'You have been logged out in backend too.'})

@main.route('/events', methods=['GET'])
def get_events():
    events = Events.query.all()
    event_list = []
    for event in events:
        event_dict = {}
        event_dict['id'] = event.id
        event_dict['title'] = event.eventName
        event_dict['description'] = event.eventDescription
        event_dict['start_time'] = event.eventDate
        event_list.append(event_dict)
    return jsonify({'events': event_list})

@main.route("/currentUserEvents", methods = ["GET","POST"])
def get_userEvents():
    name = request.json['currUser']
    user = User.query.filter_by(username = name).first()
    signedUpEvent = Events.query.filter_by(id = user.registered_event).first()
    # print(signedUpEvent.eventName)
    # print(user.firstname)
    return jsonify({"event": signedUpEvent.eventName,
                    "fname": user.firstname})


# create user
def createUser(username, password, fname):
    user = User(username = username, password=password, firstname = fname)
    db.session.add(user)
    db.session.commit()
    print("created a user")

# create event
def createEvents(name, date, description):
        event = Events(eventName=name, eventDate=date, eventDescription=description)
        db.session.add(event)
        db.session.commit()

# user registering event
def registerEvent(user, event):
    user.registered_event = event.id
    db.session.commit()






