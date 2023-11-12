// const List = require("../models/List");
const {StatusCodes} = require("http-status-codes");
// const {BadRequestError, NotFoundError} = require("../errors");

const getAllRestaurants = async (req, res) => {
    // const lists = await List.find({
    //     createdBy: req.user.userID,
    // })
    // .sort("createdAt");
    // res.status(StatusCodes.OK).json({lists, count: lists.length});
    res.status(StatusCodes.OK).json(req.body);
};

const getRestaurant = async (req, res) => {
    // const userID = req.user.userID;
    // const listID = req.params.id;
    // const list = await List.findOne({
    //     _id: listID,
    //     createdBy: userID,
    // });
    // if(!list){
    //     throw new NotFoundError("List doesn't exist");
    // }
    // res.status(StatusCodes.OK).json({list});
    res.status(StatusCodes.OK).json(req.body);
};

const createRestaurant = async (req, res) => {
    // req.body.createdBy = req.user.userID;
    // const list = await List.create(req.body);
    // res.status(StatusCodes.CREATED).json({list});
    res.status(StatusCodes.OK).json(req.body);
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
    res.status(StatusCodes.OK).json(req.body);
};

const updateRestaurant = async (req, res) => {
    // const {title, items, completed} = req.body;
    // const userID = req.user.userID;
    // const listID = req.params.id;
    // if(!title || !items || completed === "" || completed === undefined){
    //     throw new BadRequestError("Enter Title, Items and Status");
    // }
    // const list = await List.findByIdAndUpdate(
    //     {
    //         _id: listID,
    //         createdBy: userID,
    //     },
    //     req.body,
    //     {
    //         new: true,
    //         runValidators: true,   
    //     }
    // );
    // if(!list){
    //     throw new NotFoundError("List doesn't exist");
    // }
    // res.status(StatusCodes.OK).json({list});
    res.status(StatusCodes.OK).json(req.body);
};

module.exports = {
    getAllRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant,
}