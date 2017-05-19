# Author: Ishank Tandon
# Date: April 30, 2017
import os
import tornado.ioloop
from pymongo import MongoClient
import tornado.web
import tornado.httpserver
import hashlib
import base64
import json
from bson import json_util
from bson.json_util import dumps
from bson.objectid import ObjectId
from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser

MONGODB_DB_URL = 'mongodb://localhost:27017/' # os.environ.get('OPENSHIFT_MONGODB_DB_URL') if os.environ.get('OPENSHIFT_MONGODB_DB_URL') else 'mongodb://localhost:27017/'
MONGODB_DB_NAME = 'P2Play' # os.environ.get('OPENSHIFT_APP_NAME') if os.environ.get('OPENSHIFT_APP_NAME') else 'getbookmarks'

client = MongoClient(MONGODB_DB_URL)
db = client[MONGODB_DB_NAME]
#client = MongoClient('localhost', 27017)

class CreateAccountHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET')

    def post(self, username):
        userData = {
            "username" : username
        }
        userExistsCheck = db.users.find_one(userData)
        if userExistsCheck != None:
            self.write({"message" : True, "data" : "ALREADY_EXISTS"})
        else:
            db.users.insert_one(userData)
            createSuccessCheck = db.users.find_one(userData)
            if createSuccessCheck == None:
                self.write({"message" : False, "data" : "CREATE_FAILED"})
            else:
                self.write({"message" : True, "data" : None})


class CreatePlaylistHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET')

    def post(self, username, playlist):
        playlistData = {
            "username" : username,
            "playlist" : playlist
        }

        #check if playlist exist. If so, return false, else continue
        playlistExists = db.playlists.find_one({"playlist" : playlist})
        if playlistExists != None:
            self.write({"message" : False, "data" : "PLAYLIST_NAME_TAKEN"})
        else:
            db.playlists.insert_one(playlistData)
            res = db.playlists.find_one(playlistData)
            if res != None:
                self.write({ "message" : True, "data" : None})
            else:
                self.write({ "message" : False, "data" : "CREATION_FAILED"})


def make_app():
  return tornado.web.Application([
      (r"/uservice/createaccount/username/([^/]*)", CreateAccountHandler), #creates a new user
      (r"/uservice/createplaylist/username/([^/]*)/playlistname/([^/]*)", CreatePlaylistHandler), #creates a new playlist registered to the given user
  ])

if __name__ == "__main__":
  global DEVELOPER_KEY
  DEVELOPER_KEY = "AIzaSyB0d2j5OKnZkhTVoz4Y4POs9yhKoMGrEAo"
  argparser.add_argument("--q", help="Search term", default="Google")
  argparser.add_argument("--max-results", help="Max results", default=5)
  app = tornado.httpserver.HTTPServer(make_app())
  app.listen(8888)
  tornado.ioloop.IOLoop.current().start()
