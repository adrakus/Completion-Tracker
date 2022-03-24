from app import db
import secrets
from datetime import datetime as dt, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

#User Table
class User(db.Model):
    
    #Columns
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    email = db.Column(db.String(), unique=True)
    steam_id = db.Column(db.String(), unique=True)
    password = db.Column(db.String())
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    modified_on = db.Column(db.DateTime, onupdate=dt.utcnow)
    token = db.Column(db.String, index=True, unique=True)
    token_exp = db.Column(db.DateTime)
    games_list = db.relationship('Game', cascade='all, delete, delete-orphan', lazy='dynamic')

    #Repr
    def __repr__(self):
        return f'<User: {self.user_id} | {self.email}>'
    
    #Hashes User Password
    def hash_password(self, original_password):
        return generate_password_hash(original_password)
    
    #Check User Password
    def check_hashed_password(self, login_password):
        return check_password_hash(self.password, login_password)
    
    #Gives User a Token
    def get_token(self, exp=86400):
        current_time = dt.utcnow()
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(seconds=exp)
        self.save()
        return self.token
    
    #Revokes User Token
    def revoke_token(self):
        self.token_exp = dt.utcnow() - timedelta(seconds=61)
    
    #Checks User Token
    @staticmethod
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if not user or user.token_exp < dt.utcnow():
            return None
        return user
    
    #Register User
    def register(self, data):
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.steam_id = data['steam_id']
        self.password = self.hash_password(data['password'])
    
    #Edit User Info
    def from_dict(self, data):
        for field in ['first_name', 'last_name', 'email', 'steam_id', 'password']:
            if field in data:
                if field == 'password':
                    setattr(self, field, self.hash_password(data[field]))
                else:
                    setattr(self, field, data[field])
    
    #Return User Info
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email' : self.email,
            'steam_id' : self.steam_id,
            'created_on' : self.created_on,
            'modified_on' : self.modified_on,
            'token' : self.token
        }
    
    #Return All Games w/ Info
    def game_to_dict(self, app_id):
        game = self.games_list.filter_by(app_id=app_id).first()
        return {'app_id':game.app_id, 'main_complete':game.main_complete, 'dlc_complete':game.dlc_complete}

    #Return A Game w/ Info
    def games_to_dict(self):
        games = self.games_list
        return [{'app_id':game.app_id, 'main_complete':game.main_complete, 'dlc_complete':game.dlc_complete} 
                for game in games] if len(list(games))>0 else ['empty']
    
    #Adds Game to List
    def add_to_list(self, game):
        self.games_list.append(game)
        db.session.commit()

    #Removes Game from List
    def remove_from_list(self, app_id):
        game = self.games_list.filter_by(app_id=app_id).first()
        self.games_list.remove(game)
        db.session.commit()

    #Marks main_complete
    def mark_main(self, app_id):
        game = self.games_list.filter_by(app_id=app_id).first()
        game.main_complete = not game.main_complete
        db.session.commit()
    
    #Marks dlc_complete
    def mark_dlc(self, app_id):
        game = self.games_list.filter_by(app_id=app_id).first()
        game.dlc_complete = not game.dlc_complete
        db.session.commit()
    
    #Deletes User
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    #Saves User
    def save(self):
        db.session.add(self)
        db.session.commit()

#Games table
class Game(db.Model):
    
    #Columns
    app_id = db.Column(db.Integer, primary_key=True)
    main_complete = db.Column(db.Boolean, default=False)
    dlc_complete = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), primary_key=True)
