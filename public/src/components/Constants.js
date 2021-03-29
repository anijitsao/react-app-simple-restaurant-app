
// list of all the constants
const Constants = () => {

  const url = 'http://localhost:3000/services'
  return {
    url,

    // all the URLs
    login: `${url}/login`,

    getRestaurants: `${url}/getrestaurants/{value}`,
    getRooms: `${url}/getrooms/{id}`,

    // the Content-Type
    header: { 'Content-Type': 'application/json' },

    // HTTP verbs
    method: {
      "POST": "POST",
      "GET": "GET"
    }
  }
}

export default Constants;
