from flask import Flask, render_template, send_from_directory
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
	if request.method = "POST":
		print("Posted")


if __name__ == "__main__":
    app.run(debug=True)
