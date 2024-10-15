import pandas as pd  # type: ignore
from sklearn.model_selection import train_test_split  # type: ignore
from sklearn.preprocessing import LabelEncoder  # type: ignore
from sklearn.ensemble import RandomForestClassifier  # type: ignore
from sklearn.metrics import classification_report  # type: ignore
import joblib  # type: ignore

# Load dataset
df = pd.read_csv("ml/mental_health_conditions.csv")

# Handle missing values (if any)
df = df.dropna()  # Or use other methods like imputation if needed

# Convert categorical variables to numerical
le_activities = LabelEncoder()
le_mood = LabelEncoder()
le_condition = LabelEncoder()

df["Activities"] = le_activities.fit_transform(df["Activities"])
df["Mood"] = le_mood.fit_transform(df["Mood"])
df["Mental Condition"] = le_condition.fit_transform(df["Mental Condition"])

# Define features and target variable
X = df[
    [
        "Skin Tension",
        "Body Temperature",
        "Heart Rate",
        "Systolic",
        "Diastolic",
        "Sleep Time",
        "Activities",
        "Mood",
    ]
]
y = df["Mental Condition"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
predictions = model.predict(X_test)

# Check the unique values in y_test and predictions
unique_classes = sorted(set(y_test) | set(predictions))
print(f"Unique classes in y_test: {set(y_test)}")
print(f"Unique classes in predictions: {set(predictions)}")

# Ensure target_names matches the number of classes
target_names = [str(label) for label in unique_classes]

# Print classification report
print(classification_report(y_test, predictions, target_names=target_names, labels=unique_classes))

# Save model and encoders
joblib.dump(model, "ml/mental_health_model.pkl")
joblib.dump(le_activities, "ml/le_activities.pkl")
joblib.dump(le_mood, "ml/le_mood.pkl")
joblib.dump(le_condition, "ml/le_condition.pkl")
