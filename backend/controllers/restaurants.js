const Restaurants = require("../models/Restaurants");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError, CustomAPIError} = require("../errors");

const getAllRestaurants = async (req, res) => {
    // const lists = await List.find({
    //     createdBy: req.user.userID,
    // })
    // .sort("createdAt");
    // res.status(StatusCodes.OK).json({lists, count: lists.length});
    try{
        const resp = await Restaurants.selectAllRestaurants();
        res.status(StatusCodes.OK).json(resp.rows);    
    }
    catch(error){
        if(error === true){
            throw new NotFoundError("No Restaurants Exist");
        }
        else{
            throw new CustomAPIError(error);
        }
    }
};

const getRestaurant = async (req, res) => {
    // const userID = req.user.userID;
    // const list = await List.findOne({
    //     _id: listID,
    //     createdBy: userID,
    // });
    try{
        const resp = await Restaurants.selectOneRestaurant(req.params.id);
        res.status(StatusCodes.OK).json(resp.rows[0]);
    }
    catch(error){
        if(error === true){
            throw new NotFoundError("Restaurant with this ID doesn't exist");
        }
        else{
            throw new CustomAPIError(error);
        }
    }
};

const createRestaurant = async (req, res) => {
    // req.body.createdBy = req.user.userID;
    // const list = await List.create(req.body);
    // res.status(StatusCodes.CREATED).json({list});
    const {name, price_range: price, location} = req.body;
    if(!name || !price || !location){
        throw new BadRequestError("Enter Name, Price Range and Location");
    }
    try{
        const resp = await Restaurants.addRestaurant(name, location, price);
        res.status(StatusCodes.CREATED).json(resp.rows[0]);
    }
    catch(error){
        throw new CustomAPIError(error);
    }
};

const deleteRestaurant = async (req, res) => {
    // const userID = req.user.userID;
    // const listID = req.params.id;
    // const list = await List.findOneAndDelete({
    //     _id: listID,
    //     createdBy: userID,
    // });
    // if(!list){
    //     throw new NotFoundError("List doesn't exist");
    // }
    // res.status(StatusCodes.OK).json({list});
    try{
        const resp = await Restaurants.removeRestaurant(req.params.id);
        res.status(StatusCodes.OK).json(resp.rows[0]);
    }
    catch(error){
        if(error === true){
            throw new NotFoundError("Restaurant with this ID doesn't exist");
        }
        else{
            throw new CustomAPIError(error);
        }
    }
};

const updateRestaurant = async (req, res) => {
    const {name, price_range: price, location} = req.body;
    if(!name || !price || !location){
        throw new BadRequestError("Enter Name, Price Range and Location");
    }
    try{
        const resp = await Restaurants.modifyRestaurant(req.params.id, name, location, price);
        res.status(StatusCodes.OK).json(resp.rows[0]);
    }
    catch(error){
        if(error === true){
            throw new NotFoundError("Restaurant with this ID doesn't exist");
        }
        else{
            throw new CustomAPIError(error);
        }
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant,
}