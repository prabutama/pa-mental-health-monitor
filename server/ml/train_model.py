import pandas as pd 
from sklearn.model_selection import train_test_split 
from sklearn.preprocessing import LabelEncoder 
from sklearn.ensemble import RandomForestClassifier 
from sklearn.metrics import classification_report 
import joblib 

# Membaca dataset dari file CSV
df = pd.read_csv("mental_health_conditions.csv")

# Menghapus baris yang mengandung nilai kosong (NaN) agar data bersih
df = df.dropna()  

# Menginisialisasi LabelEncoder untuk kolom kategorikal
le_activities = LabelEncoder()
le_mood = LabelEncoder()
le_condition = LabelEncoder()

# Mengonversi nilai kategorikal menjadi numerik menggunakan LabelEncoder
df["Activities"] = le_activities.fit_transform(df["Activities"])
df["Mood"] = le_mood.fit_transform(df["Mood"])
df["Mental Condition"] = le_condition.fit_transform(df["Mental Condition"])

# Mendefinisikan fitur (X) dan target (y)
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

# Membagi data menjadi data pelatihan (80%) dan data pengujian (20%)
# random_state digunakan agar pembagian data konsisten
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Menginisialisasi RandomForestClassifier dengan 100 pohon
# Random state digunakan untuk menghasilkan hasil yang konsisten
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Melatih model menggunakan data pelatihan
model.fit(X_train, y_train)

# Melakukan prediksi menggunakan data pengujian
predictions = model.predict(X_test)

# Mendapatkan kelas unik yang ada di y_test dan prediksi untuk laporan klasifikasi
unique_classes = sorted(set(y_test) | set(predictions))
print(f"Unique classes in y_test: {set(y_test)}")
print(f"Unique classes in predictions: {set(predictions)}")

# Mengonversi kelas menjadi string agar mudah dibaca dalam laporan
target_names = [str(label) for label in unique_classes]

# Menampilkan laporan klasifikasi yang mencakup presisi, recall, dan f1-score
# Laporan ini membantu memahami performa model pada setiap kelas
print(classification_report(y_test, predictions, target_names=target_names, labels=unique_classes))

# Menyimpan model yang sudah dilatih dan LabelEncoder ke dalam file .pkl
# Tujuannya agar model dapat digunakan kembali untuk prediksi di masa depan tanpa perlu pelatihan ulang
joblib.dump(model, "mental_health_model.pkl")
joblib.dump(le_activities, "le_activities.pkl")
joblib.dump(le_mood, "le_mood.pkl")
joblib.dump(le_condition, "le_condition.pkl")
