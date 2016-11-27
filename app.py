from flask import *
from flask_login import UserMixin, LoginManager, login_required, current_user, login_user, logout_user
from Model.dModel import *
from functools import wraps
import requests

app = Flask(__name__)
app.secret_key = 'super secret string'  # Change this!
login_manager = LoginManager()

login_manager.init_app(app)
login_manager.session_protection = "strong"
login_manager.login_view = "login"
login_manager.login_message = "Please LOG IN"
login_manager.login_message_category = "info"


class User(UserMixin):
    pass


def to_json(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        get_fun = func(*args, **kwargs)
        return json.dumps(get_fun)

    return wrapper


def query_user(username):
    user = UserAccounts.query.filter_by(UserName=username).first()
    if user:
        return True
    return False


def query_FBuser(FBuserID):
    FBuser = UserAccounts.query.filter_by(FBuserID=FBuserID).first()
    if FBuser:
        return True
    return False


@login_manager.user_loader
def user_loader(username):
    if query_user(username) or query_FBuser(username):
        user = User()
        user.id = username
        return user
    return None


@app.route('/')
@app.route('/index', methods=['GET'])
@login_required
def index():
    user_id = session.get('user_id')
    user = UserAccounts.query.filter_by(FBuserID=user_id).first()

    if user:
        if user.UserName == None:
            data = requests.get(
                "https://graph.facebook.com/me?fields=id,name,email&access_token=" + user.FBAccessToken)
            if data.status_code == 200:
                user.UserName = data.json()['name']
                db.session.add(user)
                db.session.commit()
                FBuser = data.json()['name']
        else:
            FBuser = user.UserName
    else:
        FBuser = ""

    return render_template("index.html", FBuser=FBuser)


@app.route('/login', methods=['GET', 'POST'])
def login():
    user_id = session.get('user_id')

    if request.method == 'GET':
        return render_template("login.html")

    if (current_user.is_authenticated and query_user(user_id)) or query_FBuser(user_id):
        return redirect(url_for('index'))

    username = request.form['username']
    user = UserAccounts.query.filter_by(UserName=username).first()
    if user == None:
        return render_template("login.html", error="username or password error")
    pw_form = UserAccounts.psw_to_md5(request.form['password'])
    pw_db = user.Password
    if pw_form == pw_db:
        user = User()
        user.id = username
        login_user(user, remember=True)
        flash('Logged in successfully')
        return redirect(url_for('index'))
    return render_template("login.html", error="username or password error")


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template("register.html")
    username = request.form['username']
    password = request.form['password']
    newAccount = UserAccounts(UserName=username, Password=password, FBuserID="", FBAccessToken="")
    db.session.add(newAccount)
    db.session.commit()
    return redirect(url_for("index"))


@app.route('/API_check_UserNameExist', methods=['POST'])
@to_json
def API_check_UserNameExist():
    username = request.json['username']
    user = UserAccounts.query.filter_by(UserName=username).first()
    if user == None:
        return "44"
    return "11"


@app.route('/API_FB_login', methods=['POST'])
@to_json
def API_FB_login():
    userID = request.json['userID']
    accessToken = request.json['accessToken']
    FBuserID_Exist = UserAccounts.query.filter_by(FBuserID=userID).first()
    if FBuserID_Exist == None:
        newAccount = UserAccounts(UserName=None, Password=None, FBuserID=userID, FBAccessToken=accessToken)
        db.session.add(newAccount)
        user = User()
        user.id = userID
        login_user(user, remember=True)
    else:
        FBuserID_Exist.FBAccessToken = accessToken
        db.session.add(FBuserID_Exist)
        user = User()
        user.id = FBuserID_Exist.FBuserID
        login_user(user, remember=True)
    db.session.commit()
    return "11"


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host="localhost", debug=True)
