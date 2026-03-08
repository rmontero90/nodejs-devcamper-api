db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createCollection("bootcamps");
db.createCollection("courses");
