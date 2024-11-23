from sqlite3 import IntegrityError
from app.models.User import User
from app.models.MentalHealthClassification import MentalHealthClassification
from app.models.MentalHealthInput import MentalHealthInput
import datetime
import re

from flask import request
from flask_jwt_extended import *

from app import response, app, db


def singleObject(data):
    data = {
        "id": data.id,
        "name": data.name,
        "email": data.email,
        "role": data.role,
        "age": data.age,
        "gender": data.gender,
    }

    return data


def register():
    try:
        data = request.get_json()
        # Ambil data dari form request
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        gender = data.get("gender")
        age = data.get("age")
        role = "user"

        # Validasi input
        if not all([name, email, password, gender, age]):
            return response.BadRequest([], "Semua field harus diisi")

        # Validasi format email
        email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
        if not re.match(email_regex, email):
            return response.BadRequest([], "Format email tidak valid")

        # Cek apakah email sudah terdaftar
        user_exists = User.query.filter_by(email=email).first()
        if user_exists:
            return response.BadRequest([], "Email sudah terdaftar")

        # Buat objek User baru
        new_user = User(
            name=name, email=email, password=password, gender=gender, age=age, role=role
        )

        # Hash password
        new_user.setPassword(password)

        # Simpan ke database
        db.session.add(new_user)
        db.session.commit()

        # Konversi objek user menjadi dictionary untuk dikirim sebagai response
        data = singleObject(new_user)

        return response.success(data, "Berhasil mendaftar")

    except IntegrityError:
        db.session.rollback()
        return response.BadRequest([], "Email sudah terdaftar")
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")
        return response.BadRequest([], "Gagal mendaftar")


def login():
    try:
        # Mengambil email dan password dari request
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # Memastikan email dan password dikirim
        if not email or not password:
            return response.BadRequest([], "Email atau password tidak boleh kosong")

        # Mencari user berdasarkan email
        user = User.query.filter_by(email=email).first()

        if not user:
            return response.BadRequest([], "Email tidak ditemukan")

        # Mengecek apakah password benar
        if not user.checkPassword(password):
            return response.BadRequest([], "Password salah")

        # Membuat token JWT
        dataUser = singleObject(user)
        expires = datetime.timedelta(days=7)
        expires_refresh = datetime.timedelta(days=7)

        data = {"id": str(user.id), "email": user.email}

        access_token = create_access_token(
            identity=data, fresh=True, expires_delta=expires
        )
        refresh_token = create_refresh_token(
            identity=data, expires_delta=expires_refresh
        )

        # print("Access Token:", access_token)
        # print("Refresh Token:", refresh_token)

        # Menyimpan token dalam session atau mengirimkannya sebagai response
        # session['access_token'] = access_token
        # session['refresh_token'] = refresh_token

        return response.success(
            {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": dataUser,
            },
            "Berhasil login",
        )

    except Exception as e:
        # Cetak error untuk debugging
        print(f"Error saat login: {str(e)}")
        return response.BadRequest([], "Gagal login")


def getAllUsers():
    try:
        # Query semua pengguna
        users = User.query.all()

        # Format data
        data = []
        for user in users:
            # Hitung jumlah riwayat hasil cek kesehatan mental
            mental_health_count = (
                MentalHealthClassification.query.join(
                    MentalHealthInput,
                    MentalHealthClassification.input_id == MentalHealthInput.id,
                )
                .filter(MentalHealthInput.user_id == user.id)
                .count()
            )

            # Menambahkan data pengguna beserta jumlah hasil kesehatan mental
            data.append(
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                    "mental_health_history_count": mental_health_count,  # Menambahkan jumlah hasil
                }
            )

        # Mengirimkan respons dengan data yang sudah diformat
        return response.success(data, "Berhasil mendapatkan data semua pengguna")

    except Exception as e:
        print(f"Error saat mendapatkan data pengguna: {str(e)}")
        return response.BadRequest([], "Gagal mendapatkan data semua pengguna")
