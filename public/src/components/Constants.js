// list of all the constants
const Constants = () => {
  const url = "http://localhost:3000/services"
  return {
    url,

    // all the URLs
    login: `${url}/login`,

    getRestaurants: `${url}/getrestaurants/{value}`,
    getRooms: `${url}/getrooms/{id}`,

    // the Content-Type
    header: { "Content-Type": "application/json" },

    // HTTP verbs
    method: {
      POST: "POST",
      GET: "GET",
    },

    COST_CATEGORY: {
      low: 250,
      medium: 500,
      high: 500,
    },

    MAPPING: {
      cost: "cost for two",
      establishment: "establishment type",
      low: "less Than &#8377;250",
      medium: "&#8377;250 To &#8377;500",
      high: "&#8377;500+",

      inc: "Price low to high",
      dec: "Price high to low",
      rating: "Rating",
    },
  }
}

export default Constants
