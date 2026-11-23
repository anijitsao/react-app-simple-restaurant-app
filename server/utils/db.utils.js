export async function connectDB(mongoClient, url) {
  const client = await new mongoClient(url).connect();
  return client;
}

export function selectDB(connection, dbName) {
  return connection.db(dbName);
}

export function closeConnection(connection) {
  connection.close();
}
