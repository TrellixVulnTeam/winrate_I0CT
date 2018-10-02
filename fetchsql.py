import pymysql

host = "daddy-base.ctvc6xwyxj46.us-east-1.rds.amazonaws.com"
port = 3306
dbname = "daddybase"
user = "daddy"
password = "daddydaddy"

conn = pymysql.connect(host, user=user, port=port, passwd=password, db=dbname)
c = conn.cursor()
c.execute("SELECT * FROM products")
print(c.fetchall())
conn.commit()
conn.close()