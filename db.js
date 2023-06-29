import { MongoClient } from "mongodb"

const URI = "mongodb://127.0.0.1:27017"

export const mongoConnect = (callback) => {
  MongoClient.connect(URI)
    .then((client) => {
      console.log("Connected")
      callback(client)
    })
    .catch((err) => console.error(err))
}
