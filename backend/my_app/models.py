from __init__ import db
class Passenger(db.Model):
    __tablename__ = 'passengers'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name=db.Column(db.String(255),nullable=False)
    pclass=db.Column(db.Integer,nullable=False)
    sex=db.Column(db.String(6),nullable=False)
    age=db.Column(db.Float,nullable=False)
    fare=db.Column(db.Float,nullable=False)
    sibsp=db.Column(db.Integer,nullable=False)
    parch=db.Column(db.Integer,nullable=False)
    ticket=db.Column(db.String(20),nullable=True)
    cabin=db.Column(db.String(10),nullable=True)
    embarked=db.Column(db.String(1),nullable=False)
    survived = db.Column(db.Integer, nullable=False)


