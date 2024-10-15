import uuid
from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, ENUM

class MentalHealthClassification(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    input_id = db.Column(db.String(36), db.ForeignKey('mental_health_input.id'), default=lambda: str(uuid.uuid4()), nullable=False)
    mental_condition = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return f'<MentalHealthClassification {self.classification} for Input {self.input_id}>'
