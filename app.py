from flask import Flask, render_template, send_from_directory, request
import pymysql
import datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='static')
CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

@app.route("/", methods=["GET"])
def index():
	return render_template("winrate.html")

@app.route("/mobile", methods=["GET"])
def mobile():
	return render_template("winrate-mobile.html")

@app.route("/test", methods=["POST"])
@cross_origin(origin="*")
def test():
	if request.method == "POST":
		print("Got a post")
		host = "daddy-base.ctvc6xwyxj46.us-east-1.rds.amazonaws.com"
		port = 3306
		dbname = "daddybase"
		user = "daddy"
		password = "daddydaddy"

		conn = pymysql.connect(host, user=user, port=port, passwd=password, db=dbname)
		c = conn.cursor()
		sql = "INSERT INTO products VALUES ('123', '%s')" % (datetime.datetime.now().__str__())
		c.execute(sql)
		conn.commit()
		conn.close()
		return "Posted"


if __name__ == "__main__":
    app.run(debug=True)
