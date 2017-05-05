# Author: Ishank Tandon
# Date: April 30, 2017

import tornado.ioloop
import tornado.web
import tornado.httpserver
import hashlib
import base64
import json
from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser


class HTMLHandler(tornado.web.RequestHandler):

  # Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
  # tab of
  #   https://cloud.google.com/console
  # Please ensure that you have enabled the YouTube Data API for your project.

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
        videourl = "https://www.youtube.com/watch?v=" + search_result["id"]["videoId"]
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
  ])

if __name__ == "__main__":
  global DEVELOPER_KEY 
  DEVELOPER_KEY = "AIzaSyB0d2j5OKnZkhTVoz4Y4POs9yhKoMGrEAo"
  argparser.add_argument("--q", help="Search term", default="Google")
  argparser.add_argument("--max-results", help="Max results", default=25)
  app = tornado.httpserver.HTTPServer(make_app())
  app.listen(8888)
  tornado.ioloop.IOLoop.current().start()