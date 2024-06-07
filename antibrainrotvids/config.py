class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'antibrainrotvids_scrt'
    JWT_SECRET_KEY = 'antibrainrotvids_scrt'
