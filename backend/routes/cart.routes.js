import express from "express";
import { verifyJWT } from "../middleware/auth.middlewares.js";

import { getCart, addToCart,deleteCartItem, clearCart } from "../controllers/cart.controllers.js";

const cartRouter = express.Router();

cartRouter.route("/")
    .get(verifyJWT, getCart)
    .post(verifyJWT, addToCart);

    cartRouter.post("/clear", verifyJWT,clearCart)
    cartRouter.route('/:id')
    .put(verifyJWT, addToCart)
    .delete(verifyJWT, deleteCartItem);



export default cartRouter;