// imports dependencies
import { Router } from "express"

// local file dependencies
import { connectDbAndRunQueries } from "./dbOps.js"
const router = Router()

// most important to serve static pages don't forget
// router.use(express.static('../public'))

router.post("/getrestaurants/:item?", (req, res) => {
	connectDbAndRunQueries("getRestaurants", req, res)
})

export default router
