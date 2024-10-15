from app.models.User import User
from flask import request
from flask_jwt_extended import *
import nltk # type: ignore
from nltk.tokenize import word_tokenize # type: ignore
from nltk.corpus import wordnet as wn # type: ignore
import nltk

nltk.download('punkt_tab', download_dir='./ml/nltk_data')

nltk.data.path.append('./ml/nltk_data')

# Tokenisasi input
def tokenize(text):
    return word_tokenize(text.lower())

# Fungsi untuk menemukan sinonim
def get_synonyms(word):
    synonyms = set()
    for syn in wn.synsets(word):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name())
    return synonyms

# Fungsi untuk memetakan frasa ke kategori
def map_phrase_to_category(phrase, mapping):
    words = tokenize(phrase)
    for category, keywords in mapping.items():
        # Debugging: Cek kata-kata token
        print(f"Tokenized Words: {words}")
        # Debugging: Cek kategori dan kata kunci
        print(f"Category: {category}, Keywords: {keywords}")
        if any(word in keywords for word in words):
            return category
    return 'unknown'

# Update pemetaan dengan frasa multi-kata
activities_mapping = {
    'low': [
        'istirahat', 'duduk', 'menonton tv', 'tidur', 'relaksasi', 'bermeditasi', 
        'mendengarkan musik', 'membaca buku', 'tiduran', 'main ponsel', 'berbaring', 'rebahan'  
    ],
    'moderate': [
        'berjalan', 'bekerja', 'mengurus pekerjaan rumah', 'yoga', 'berkebun', 
        'bersepeda santai', 'membersihkan rumah', 'mengangkat beban ringan', 
        'berbelanja', 'bermain dengan anak', 'cooking', 'bermain game'
    ],
    'high': [
        'lari', 'berolahraga', 'gym', 'latihan intensitas tinggi', 'berenang', 'bersepeda',
        'angkat beban', 'berlari cepat', 'bermain sepak bola', 'basket', 
        'bermain tenis', 'bermain futsal', 'kickboxing', 'panjat tebing'
    ]
}

mood_mapping = {
    'positive': [
        'bahagia', 'terexcited', 'puas', 'tenang', 'optimis', 'berenergi', 'senang', 
        'bersyukur', 'gembira', 'bersemangat', 'merasa damai', 'berharap', 
        'terinspirasi', 'ceria', 'terhibur'
    ],
    'neutral': [
        'oke', 'netral', 'baik', 'indifferent', 'apatis', 'biasa saja', 
        'datar', 'tidak peduli', 'cuek', 'santai', 'biasa', 'nothing special'
    ],
    'negative': [
        'sedih', 'cemas', 'khawatir', 'marah', 'frustrasi', 'depresi', 'merasa cemas', 
        'sedikit cemas', 'kesal', 'lelah', 'stres', 'kecewa', 'putus asa', 
        'tertekan', 'merasa terasing', 'takut'
    ]
}

