import pymysql
def query_sql(uuid):
    host = "daddy-base.ctvc6xwyxj46.us-east-1.rds.amazonaws.com"
    port = 3306
    dbname = "daddybase"
    user = "daddy"
    password = "daddydaddy"
    conn = pymysql.connect(host, user=user, port=port, passwd=password, db=dbname)
    cursor = conn.cursor()
    sql = "select product_name from beacons where uuid='ebefd083-70a2-47c8-9837-e7b5634df524'"
    cursor.execute(sql)
    res = cursor.fetchall()
    return res[0][0]
