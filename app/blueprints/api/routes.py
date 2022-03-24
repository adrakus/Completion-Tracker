from flask import make_response, request, g, abort
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from .import bp as api
from app.models import User, Game

#Auth Init
basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

#Basic Authentication
@basic_auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email.lower()).first()
    if user is None:
        return False
    g.current_user = user
    return user.check_hashed_password(password)

#Token Authentication
@token_auth.verify_token
def verify_token(token):
    user = User.check_token(token) if token else None
    g.current_user = user
    return g.current_user or None

#GET REQUESTS

#Login
@api.get('/login')
@basic_auth.login_required()
def login():
    g.current_user.get_token()
    return make_response(g.current_user.to_dict(), 200)

#User's Games
@api.get('/game')
@token_auth.login_required()
def get_games():
    return make_response({'games':g.current_user.games_to_dict()}, 200)

#Specific Game
@api.get('/game/<int:app_id>')
@token_auth.login_required()
def get_game(app_id):
    return make_response(g.current_user.game_to_dict(app_id), 200)

#POST REQUESTS

#Register User
@api.post('/user')
def post_user():
    '''
        Expected Payload:
            {
                'first_name' : STRING,
                'last_name' : STRING,
                'email' : STRING,
                'steam_id' : STRING,
                'password' : STRING
            }
    '''
    data = request.get_json()
    if User.query.filter_by(email=data.get('email')).first():
        abort(422)
    
    new_user = User()
    new_user.register(data)
    new_user.save()
    
    return make_response('success', 200)

#Save steam library upon registration or add new game
@api.post('/game')
@token_auth.login_required()
def post_games():
    '''
        Expected Payload:
        {
            'games' : [List of app_id's]
        }
    '''

    data = request.get_json()
    for app_id in data.get('games'):
        g.current_user.add_to_list(Game(app_id=app_id))
    
    return make_response('success', 200)

#PUT REQUESTS

#Edit User Info
@api.put('/user')
@token_auth.login_required()
def put_user():
    '''
        Expected Payload (Does not need all key value pairs):
            {
                'first_name' : STRING,
                'last_name' : STRING,
                'email' : STRING,
                'steam_id' : INTEGER,
                'password' : STRING
            }
    '''

    data = request.get_json()
    g.current_user.from_dict(data)
    g.current_user.save()

    return make_response('success', 200)

#Marks completion tags
@api.put('/game/<int:app_id>')
@token_auth.login_required()
def put_mark(app_id):
    '''
        Expected Payload:
            {
                'main' : BOOLEAN,
                'dlc' : BOOLEAN
            }
    '''

    data = request.get_json()
    g.current_user.mark_main(app_id) if data.get('main') else None
    g.current_user.mark_dlc(app_id) if data.get('dlc') else None

    return make_response('success', 200)

#DELETE REQUESTS

#Delete User
@api.delete('/user')
@token_auth.login_required()
def delete_user():
    g.current_user.delete()
    return make_response('success', 200)

#Delete Games
@api.delete('/game/<int:app_id>')
@token_auth.login_required()
def delete_game(app_id):
    g.current_user.remove_from_list(app_id)
    return make_response('success', 200)
