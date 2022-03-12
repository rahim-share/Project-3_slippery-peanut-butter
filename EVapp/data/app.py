import os

import psycopg2
import sys

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template

app = Flask(__name__)
# define the connection string
conn_string = "host='localhost' dbname='ev_stations' user='postgres' password='joseph'"
conn = psycopg2.connect(conn_string)
cursor = conn.cursor()

myData = {
    "WA":
                {
          "Car": ["Tesla","Huyndai"] ,
          "PopCount": [30,70],
          "Year": ["2015","2016","2017"],
          "CarCounts": [30,40]
          },
    "NY":
                {
          "Car": ["Tesla","Huyndai"] ,
          "PopCount": [30,70],
          "Year": ["2015","2016","2017"],
          "CarCounts": [30,40]
          }
  }

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route("/map")   
def map():    
    """Return the Leaflet map page."""       
    return render_template("map.html")

@app.route("/api/evdata")
def names():
    """Return a JSON object."""
    # Return a list of the column names (sample names)
    return(jsonify(myData))
