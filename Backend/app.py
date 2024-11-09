from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

app.secret_key = 'your_secret_key'

# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'jostingamer98@gmail.com'
app.config['MAIL_PASSWORD'] = 'crtr etze hpnc ikcn'

mail = Mail(app)

verification_codes = {}

@app.route('/')
def index():
    return send_from_directory('../Frontend/html', 'registro.html')

@app.route('/send_code', methods=['POST'])
def send_code():
    email = request.json['email']
    verification_code = str(random.randint(100000, 999999))
    verification_codes[email] = verification_code
    msg = Message('Verification Code', sender='jostingamer98@gmail.com', recipients=[email])
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
def send_static(path):
    return send_from_directory('../Frontend', path)

if __name__ == '__main__':
    app.run(debug=True)