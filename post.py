import requests
import json
data = {"uuid":"ebefd083-70a2-47c8-9837-e7b5634df524"}
res = requests.post("http://68.183.20.75:5000/test", json=json.dumps(data))
print(res.text)
