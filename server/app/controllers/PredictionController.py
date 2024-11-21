from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
import joblib  # type: ignore
from ml.text_classification import map_phrase_to_category, activities_mapping, mood_mapping  # type: ignore
import pandas as pd  # type: ignore
from app import db, response
from app.models.MentalHealthInput import MentalHealthInput
from app.models.MentalHealthClassification import MentalHealthClassification

# Load model and encoders
model = joblib.load("ml/mental_health_model.pkl")
le_activities = joblib.load("ml/le_activities.pkl")
le_mood = joblib.load("ml/le_mood.pkl")
le_condition = joblib.load("ml/le_condition.pkl")


def predict_mental_health():
    try:
        # Access request parameters
        data = request.get_json()

        skin_tension = float(data.get("skin_tension", 0))
        body_temp = float(data.get("body_temp", 0))
        heart_rate = float(data.get("heart_rate", 0))
        systolic = float(data.get("systolic", 0))
        diastolic = float(data.get("diastolic", 0))
        sleep_time = float(data.get("sleep_time", 0))
        activities_input = data.get("activity", "")
        mood_input = data.get("mood", "")

        # Classify activity and mood using text_classification functions
        activity_category = map_phrase_to_category(activities_input, activities_mapping)
        mood_category = map_phrase_to_category(mood_input, mood_mapping)

        # Transform the classified activity and mood into numerical labels
        encoded_activity = le_activities.transform([activity_category])[0]
        encoded_mood = le_mood.transform([mood_category])[0]

        # Prepare the input data for the ML model
        input_data = pd.DataFrame(
            {
                "Skin Tension": [skin_tension],
                "Body Temperature": [body_temp],
                "Heart Rate": [heart_rate],
                "Systolic": [systolic],
                "Diastolic": [diastolic],
                "Sleep Time": [sleep_time],
                "Activities": [encoded_activity],
                "Mood": [encoded_mood],
            }
        )
        mental_conditionSh = ''

        # Make prediction
        prediction = model.predict(input_data)

        # Decode the prediction
        mental_condition = le_condition.inverse_transform(prediction)[0]

        # Get current user
        current_user = get_jwt_identity()
        print("user", current_user)  # Untuk memastikan current_user berisi data yang benar
        user_id = current_user.get("id")

        # Save the input and result to the database
        new_input = MentalHealthInput(
            user_id=user_id,
            skin_tension=skin_tension,
            body_temperature=body_temp,
            heart_rate=heart_rate,
            systolic=systolic,
            diastolic=diastolic,
            sleep_time=sleep_time,
            activities=activities_input,
            activity_category=activity_category,
            mood=mood_input,
        )
        db.session.add(new_input)
        db.session.commit()

        # Optionally, you can create and save the classification result
        classification = MentalHealthClassification(
            input_id=new_input.id, mental_condition=mental_condition
        )
        db.session.add(classification)
        db.session.commit()

        return response.success(
            {
                "user": current_user,
                "hasil": mental_condition,
            },
            "Success predicting mental health condition and saving to database",
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
