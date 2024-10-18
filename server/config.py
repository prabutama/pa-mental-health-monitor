import os 

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    HOST = str(os.environ.get('DB_HOST'))
    DATABASE = str(os.environ.get('DB_DATABASE'))
    USERNAME = str(os.environ.get('DB_USERNAME'))
    PASSWORD = str(os.environ.get('DB_PASSWORD'))
    PORT = str(os.environ.get('DB_PORT', '5432'))  

    JWT_SECRET_KEY = str(os.environ.get('JWT_SECRET'))
    SECRET_KEY = str(os.environ.get('SECRET_KEY'))

    # Tambahkan port dalam URI
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://' + USERNAME + ':' + PASSWORD + '@' + HOST + ':' + PORT + '/' + DATABASE
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
