from phe import paillier
import boto3
import uuid
from flask import Flask, redirect, session, url_for, request, render_template, jsonify,json
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS,cross_origin
import os, io
import pandas as pd
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import google.auth

app = Flask(__name__)
# app.secret_key = os.environ.get("FLASK_SECRET_KEY", default=None)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
# # Set up the Google Sign-In API
# client_id = "1009663622847-ufo5db5r6608f6gal70un80qv7fcd7de.apps.googleusercontent.com"
# client_secret = "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"
# if client_id and client_secret:
#     app.config["GOOGLE_CLIENT_ID"] = client_id
#     app.config["GOOGLE_CLIENT_SECRET"] = client_secret
# else:
#     raise ValueError("Missing environment variables for Google Sign-In")


db = SQLAlchemy(app)

class Files(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_filename = db.Column(db.String(10000))
    filename = db.Column(db.String(10000))
    bucket = db.Column(db.String(10000))
    region = db.Column(db.String(10000))

class UserData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10000))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10000))
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    rbc = db.Column(db.Integer)
    hema = db.Column(db.Integer)
    wbc = db.Column(db.Integer)

# Generate a new keypair
public_key, private_key = paillier.generate_paillier_keypair()


# Define the homepage route
# @app.route("/")
# def main():
#     # Render a login button that redirects to the Google Sign-In page
#     flow = Flow.from_client_config(client_id, scopes=["openid", "email", "profile"])
#     auth_url, state = flow.authorization_url(access_type="offline")
#     session["state"] = state
#     return f'<a href="{auth_url}">Log in with Google</a>'

# # Define the Google Sign-In callback route
# @app.route("/google-login/callback")
# def google_callback():
#     # Verify the state parameter to prevent CSRF attacks
#     state = session.pop("state", None)
#     if state != request.args.get("state"):
#         return redirect(url_for("index"))

#     # Exchange the authorization code for an access token
#     flow = Flow.from_client_config(app.config["GOOGLE_CLIENT_ID"], app.config["GOOGLE_CLIENT_SECRET"], scopes=["openid", "email", "profile"])
#     flow.redirect_uri = url_for("google_callback", _external=True)
#     authorization_response = request.url

@app.route("/user", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paitentData = request.json
        print(paitentData)
        paitent = UserData()
        # Encrypt the data
        paitent.name = paitentData['name']
        paitent.age = paitentData['age']
        paitent.gender = paitentData['gender']
        paitent.height = paitentData['height']
        paitent.weight = paitentData['weight']
        paitent.rbc = paitentData['rbcCount']
        paitent.hema = paitentData['haemoglobinCount']
        paitent.wbc = paitentData['wbcCount']

        # # Encrypt the data
        # encrypted_data = {}
        # for key, value in paitentData.items():
        #     if isinstance(value, int):
        #         encrypted_value = public_key.encrypt(value)
        #         encrypted_data[key] = encrypted_value.ciphertext()
        #     else:
        #         encrypted_data[key] = value

        # Encrypt the data
        encrypted_data={}
       
        
        plaintext_string = json.dumps(paitentData)
        plaintext_number = int.from_bytes(plaintext_string.encode(), byteorder='little')
        ciphertext_number = public_key.encrypt(plaintext_number)
        ciphertext_string = str(ciphertext_number.ciphertext())
        
        encrypted_data['cipherText']=ciphertext_string
        # print(encrypted_data)
        new_filename = uuid.uuid4().hex
    
        file_name = new_filename+".json"
        with open(file_name, 'w') as f:
            json.dump(encrypted_data, f)
        bucket_name = "paitents-data"
        s3 = boto3.resource("s3")
        with open(file_name, 'rb') as data:
            print(data)
            s3.Bucket(bucket_name).upload_fileobj(data, file_name)

        # file = Files(original_filename="encrypted_data", filename=file_name,
        #     bucket=bucket_name, region="us-east-2")

        # db.session.add(file)
        db.session.add(paitent)
        db.session.commit()
        os.remove(file_name)
    return "file uploaded"

# <div>{{ file.original_filename }} - <a href="https://{{ file.bucket }}.s3.{{ file.region }}.amazonaws.com/{{ file.filename }}">{{ file.filename }}</a></div>
@app.route("/admin")
def admin():
    # bucket_name = "paitents-data"
    # s3 = boto3.resource("s3")

    # for obj in s3.Bucket(bucket_name).objects.all():
    #     # print(obj.key)
    #     fileName = obj.key
    #     s3.Bucket(bucket_name).download_file(Key = fileName, Filename = fileName)
    #     with open(fileName, 'r') as f:
    #         data = json.load(f)
    #         print(data)
    #         ciphertext_number = paillier.EncryptedNumber(public_key, int(data['cipherText']))
            
    #         decrypted_number = private_key.decrypt(paillier.EncryptedNumber(public_key,ciphertext_number.ciphertext()))
            

    #         # Convert the decrypted numerical representation back to the original string
    #         decrypted_string = decrypted_number.to_bytes((decrypted_number.bit_length() + 7) // 8, byteorder='little').decode()

    #         # Convert the decrypted string back to JSON format
    #         decrypted_data = json.loads(decrypted_string)
            
    #         print(decrypted_data)
    #     os.remove(fileName)

    allUserData = UserData.query.all()
    serialized_data = []
    for user in allUserData:
        serialized_data.append({
        'id': user.id,
        'name': user.name,
        'age'   : user.age, 
        'gender': user.gender,
        'height':  user.height, 
        'weight' :  user.weight, 
        'rbc':  user.rbc,
        'hema':  user.hema ,
        'wbc':  user.wbc
        })
    json_data = json.dumps(serialized_data)
    print(json_data)
    return json_data

if __name__=='__main__':
    app.run(debug=True, port ='5000')


