import uuid
from app import db
from datetime import datetime



class MentalHealthInput(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), default=lambda: str(uuid.uuid4()), nullable=False)
    skin_tension = db.Column(db.Float, nullable=False)
    body_temperature = db.Column(db.Float, nullable=False)
    heart_rate = db.Column(db.Float, nullable=False)
    systolic = db.Column(db.Float(7), nullable=False)
    diastolic = db.Column(db.Float(7), nullable=False)
    sleep_time = db.Column(db.Float, nullable=False)  # hours of sleep
    activities = db.Column(db.String(50))
    activity_category = db.Column(db.String(20))
    mood = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.now)

    # Relationship with MentalHealthClassification
    classification = db.relationship('MentalHealthClassification', backref='input', uselist=False)

    def __repr__(self):
        return f'<MentalHealthInput {self.id} for User {self.user_id}>'
