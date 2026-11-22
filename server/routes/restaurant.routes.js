// imports dependencies
import { Router } from "express";

// local file dependencies
import { fetchRestaurants } from "../services/restaurant.service.js";
const router = Router();

// Express JS v5 syntax for optional parameter
router.post("/getrestaurants{/:item}", (req, res) => {
  fetchRestaurants(req, res);
});

export default router;
