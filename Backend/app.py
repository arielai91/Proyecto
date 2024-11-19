# Para el despliegue en EC2 se necesitara de gunicorn y se ingresara lo siguiente: gunicorn -w 4 -b 0.0.0.0:8000 app:app
# Para el despliegue en Windows solo se necesita ejecutar el archivo app.py

import os
from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_cors import CORS
import random
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__, static_folder='../Frontend')
CORS(app)  # Habilitar CORS para todas las rutas

# Establecer la clave secreta desde una variable de entorno
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

# Configuración de Flask-Mail utilizando variables de entorno
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail = Mail(app)

verification_codes = {}

@app.route('/')
def index():
    return send_from_directory(app.static_folder + '/html', 'index.html')

@app.route('/send_code', methods=['POST'])
def send_code():
    email = request.json['email']
    verification_code = str(random.randint(100000, 999999))
    verification_codes[email] = verification_code
    msg = Message('Verification Code', sender=os.getenv('MAIL_USERNAME'), recipients=[email])
    msg.body = f'Your verification code is {verification_code}'
    mail.send(msg)
    return jsonify({'message': 'Verification code sent to your email.'}), 200

@app.route('/verify_code', methods=['POST'])
def verify_code():
    data = request.json
    email = data['email']
    code = data['code']
    if email in verification_codes and verification_codes[email] == code:
        return jsonify({'message': 'Verification successful!'}), 200
    else:
        return jsonify({'message': 'Invalid verification code.'}), 400

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory(app.static_folder + '/html', path)

@app.route('/css/<path:path>')
def serve_css(path):
    return send_from_directory(app.static_folder + '/css', path)

@app.route('/js/<path:path>')
def serve_js(path):
    return send_from_directory(app.static_folder + '/js', path)

@app.route('/content/<path:path>')
def serve_content(path):
    return send_from_directory(app.static_folder + '/content', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)