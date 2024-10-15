from app import db, app
from flask import jsonify
from app.models.MentalHealthClassification import MentalHealthClassification
from app.models.MentalHealthInput import MentalHealthInput
import nltk

def get_mental_health_results_by_user(user_id):
    # Validasi user_id
    if not user_id:
        return jsonify({"error": "Invalid user ID."}), 400

    try:
        # Query untuk mendapatkan semua input kesehatan mental berdasarkan user_id
        mental_health_inputs = MentalHealthInput.query.filter_by(user_id=user_id).all()
        
        if not mental_health_inputs:
            return jsonify({"error": "No mental health inputs found for this user."}), 404

        # List untuk menampung semua hasil kesehatan mental untuk pengguna
        mental_health_results = []

        for mental_health_input in mental_health_inputs:
            # Query untuk mendapatkan semua klasifikasi untuk input_id tertentu
            mental_health_classifications = MentalHealthClassification.query.filter_by(input_id=mental_health_input.id).all()
            
            for classification in mental_health_classifications:
                result = {
                    "input_id": mental_health_input.id,
                    "skin_tension": mental_health_input.skin_tension,
                    "body_temperature": mental_health_input.body_temperature,
                    "heart_rate": mental_health_input.heart_rate,
                    "systolic": mental_health_input.systolic,
                    "diastolic": mental_health_input.diastolic,
                    "sleep_time": mental_health_input.sleep_time,
                    "activities": mental_health_input.activities,
                    "activity_category": mental_health_input.activity_category,
                    "mood": mental_health_input.mood,
                    "mental_condition": classification.mental_condition,
                    "created_at": classification.created_at
                }
                mental_health_results.append(result)

        return jsonify({"user_id": user_id, "mental_health_results": mental_health_results}), 200

    except Exception as e:
        # Handle exceptions, such as database errors
        return jsonify({"error": str(e)}), 500
