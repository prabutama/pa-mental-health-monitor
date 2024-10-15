from app import db, app
from flask import jsonify
from app.models.MentalHealthClassification import MentalHealthClassification
from app.models.MentalHealthInput import MentalHealthInput
import nltk

nltk.download('punkt_tab', download_dir='../ml/nltk_data')

def get_mental_health_results_by_user(user_id):
    # Query to find all mental health inputs based on user_id
    mental_health_inputs = MentalHealthInput.query.filter_by(user_id=user_id).all()
    
    if not mental_health_inputs:
        return jsonify({"error": "No mental health inputs found for this user."}), 404

    # List to hold all mental health classifications for the user
    mental_health_results = []

    for mental_health_input in mental_health_inputs:
        # Query to get all classifications for the specific input_id
        mental_health_classifications = MentalHealthClassification.query.filter_by(input_id=mental_health_input.id).all()
        
        for classification in mental_health_classifications:
            result = {
                "input_id": mental_health_input.id,
                "mental_condition": classification.mental_condition,
                "created_at": classification.created_at
            }
            mental_health_results.append(result)

    if not mental_health_results:
        return jsonify({"error": "No mental health classifications found for this user."}), 404
    
    if not user_id:
        return jsonify({"error": "Invalid user ID."}), 400


    return jsonify({"user_id": user_id, "mental_health_results": mental_health_results}), 200
