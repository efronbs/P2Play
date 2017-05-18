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
from bson.objectid import ObjectId
from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser

MONGODB_DB_URL = 'mongodb://localhost:27017/' # os.environ.get('OPENSHIFT_MONGODB_DB_URL') if os.environ.get('OPENSHIFT_MONGODB_DB_URL') else 'mongodb://localhost:27017/'
MONGODB_DB_NAME = 'mitch' # os.environ.get('OPENSHIFT_APP_NAME') if os.environ.get('OPENSHIFT_APP_NAME') else 'getbookmarks'

client = MongoClient(MONGODB_DB_URL)
db = client[MONGODB_DB_NAME]
#client = MongoClient('localhost', 27017)
class IndexHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET')

    def get(self):
        self.write("Hello World!")
        story = db.username.find_one({"_id":ObjectId("591ba0adfd2e12f7ad4137d0")})
        self.write(json.dumps((story),default=json_util.default))


    def get(self, username):
        self.write({"username" : username})
        db.username.insert_one({"username" : username})

class PlaylistHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET')

    def post(self, username, playlist):
        playlistData = {
            "username" : username,
            "playlist" : playlist
        }
        result = db.playlists.find_one(playlistData)
        if result == None:
            db.playlists.insert_one(playlistData)
            res = db.playlists.find_one(playlistData)
            res = {"username": str(res['username']), "playlist": str(res['playlist'])}
            # import pdb; pdb.set_trace()
            self.write({ "message" : True, "data" : res})
        else:
            res = {"username": str(result['username']), "playlist": str(result['playlist'])}
            self.write({"message" : False, "data" : res})

    def get(self, username, playlist, song):

        playlistData = {
            "username" : username,
            "playlist" : playlist,
            "urls" : db.playlists.find_one({"username" : username, "playlist" : playlist})
        }
        self.write({"message" : True, "data" : playlistData})
        db.playlists.insert_one({"username" : username, "playlist" : playlist})

class HTMLHandler(tornado.web.RequestHandler):
  def set_default_headers(self):
      self.set_header("Access-Control-Allow-Origin", "*")
      self.set_header("Access-Control-Allow-Headers", "x-requested-with")
      self.set_header('Access-Control-Allow-Methods', 'POST, GET')

  # Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
  # tab of
  #   https://cloud.google.com/console
  # Please ensure that you have enabled the YouTube Data API for your project.
  def get(self):
      db = self.application.database
      self.write({ "message" : True, "data" : "P2Play"})

  def get(self, keyword):
    args = argparser.parse_args()

    youtube = build("youtube", "v3",
      developerKey=DEVELOPER_KEY)

    # Call the search.list method to retrieve results matching the specified
    # query term.
    search_response = youtube.search().list(
      q= keyword,
      part="id,snippet",
      maxResults=args.max_results
    ).execute()

    videos = []
    channels = []
    playlists = []

    # Add each result to the appropriate list, and then display the lists of
    # matching videos, channels, and playlists.
    for search_result in search_response.get("items", []):
      # import pdb; pdb.set_trace()
      # print search_result
      if search_result["id"]["kind"] == "youtube#video":
        videourl = "https://www.youtube.com/embed/" + search_result["id"]["videoId"]
        videores = { "title": search_result["snippet"]["title"], "url": videourl }
        videos.append(videores)
        # videos.append("%s %s" % (search_result["snippet"]["title"],
        #                            search_result["id"]["videoId"]))

      # elif search_result["id"]["kind"] == "youtube#channel":
      #   channels.append("%s (%s)" % (search_result["snippet"]["title"],
      #                                search_result["id"]["channelId"]))
      # elif search_result["id"]["kind"] == "youtube#playlist":
      #   playlists.append("%s (%s)" % (search_result["snippet"]["title"],
      #                                 search_result["id"]["playlistId"]))

    # print "Videos:\n", "\n".join(videos), "\n"
    # print "Channels:\n", "\n".join(channels), "\n"
    # print "Playlists:\n", "\n".join(playlists), "\n"
    self.write({ "message": True, "data": videos })



def make_app():
  return tornado.web.Application([
      (r"/search/([^/]*)", HTMLHandler),
      (r'/', IndexHandler),
      (r"/createAccount/([^/]*)", IndexHandler),
      (r"/add/username/([^/]*)", PlaylistHandler),
      (r"/createplaylist/username/([^/]*)/playlistname/([^/]*)", PlaylistHandler),
      (r"/addsong/playlistname/([^/]*)/url/([^/]*)")
  ])

if __name__ == "__main__":
  global DEVELOPER_KEY
  DEVELOPER_KEY = "AIzaSyB0d2j5OKnZkhTVoz4Y4POs9yhKoMGrEAo"
  argparser.add_argument("--q", help="Search term", default="Google")
  argparser.add_argument("--max-results", help="Max results", default=5)
  app = tornado.httpserver.HTTPServer(make_app())
  app.listen(8888)
  tornado.ioloop.IOLoop.current().start()
