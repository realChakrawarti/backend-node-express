import { MongoClient } from "mongodb"

const URI = "mongodb://127.0.0.1:27017"

let _db

export const mongoConnect = (callback) => {
  MongoClient.connect(URI)
    .then((client) => {
      console.log("Connected")
      _db = client.db("comet")
      callback()
    })
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export const getDb = () => {
  if (_db) return _db
  throw "No database found"
}
