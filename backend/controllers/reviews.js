const Reviews = require("../models/Reviews");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError, CustomAPIError} = require("../errors");

const getAllReviews = async (req, res) => {
    // res.status(StatusCodes.OK).json('All Reviews');
    // const lists = await List.find({
    //     createdBy: req.user.userID,
    // })
    // .sort("createdAt");
    // res.status(StatusCodes.OK).json({lists, count: lists.length});
    try{
        const resp = await Reviews.selectAllReviews();
        res.status(StatusCodes.OK).json(resp.rows);    
    }
    catch(error){
        if(error === true){
            throw new NotFoundError("No Reviews Exist");
        }
        else{
            throw new CustomAPIError(error);
        }
    }
};

const getReviewsOneRestaurant = async (req, res) => {
    // res.status(StatusCodes.OK).json('One Review');     
    // const userID = req.user.userID;
    // const list = await List.findOne({
    //     _id: listID,
    //     createdBy: userID,
    // });
    try{
        const resp = await Reviews.selectReviewsOneRestaurant(req.params.id);
        res.status(StatusCodes.OK).json(resp.rows);
    }
    catch(error){
        if(error === true){
            throw new NotFoundError("No reviews for this restaurant exist");
        }
        else{
            throw new CustomAPIError(error);
        }
    }
};

const createReview = async (req, res) => {
    // res.status(StatusCodes.CREATED).json(req.body); 
    // req.body.createdBy = req.user.userID;
    // const list = await List.create(req.body);
    // res.status(StatusCodes.CREATED).json({list});
    const {rest_id, user_id, rating, review} = req.body;
    // console.log(req.body);
    if(!rest_id || !user_id || !rating || !review){
        throw new BadRequestError("Enter Restaurant ID, User ID, Rating and Review");
    }
    try{
        const resp = await Reviews.addReview(rest_id, user_id, rating, review);
        res.status(StatusCodes.CREATED).json(resp.rows[0]);
    }
    catch(error){
        throw new CustomAPIError(error);
    }
};

const deleteReview = async (req, res) => {
    res.status(StatusCodes.OK).json('Delete Review');   
    // // const userID = req.user.userID;
    // // const listID = req.params.id;
    // // const list = await List.findOneAndDelete({
    // //     _id: listID,
    // //     createdBy: userID,
    // // });
    // // if(!list){
    // //     throw new NotFoundError("List doesn't exist");
    // // }
    // // res.status(StatusCodes.OK).json({list});
    // try{
    //     const resp = await Restaurants.removeRestaurant(req.params.id);
    //     res.status(StatusCodes.OK).json(resp.rows[0]);
    // }
    // catch(error){
    //     if(error === true){
    //         throw new NotFoundError("Restaurant with this ID doesn't exist");
    //     }
    //     else{
    //         throw new CustomAPIError(error);
    //     }
    // }
};

const updateReview = async (req, res) => {
    res.status(StatusCodes.OK).json('Update Review');
    // const {name, price_range: price, location} = req.body;
    // if(!name || !price || !location){
    //     throw new BadRequestError("Enter Name, Price Range and Location");
    // }
    // try{
    //     const resp = await Restaurants.modifyRestaurant(req.params.id, name, location, price);
    //     res.status(StatusCodes.OK).json(resp.rows[0]);
    // }
    // catch(error){
    //     if(error === true){
    //         throw new NotFoundError("Restaurant with this ID doesn't exist");
    //     }
    //     else{
    //         throw new CustomAPIError(error);
    //     }
    // }
};

module.exports = {
    getAllReviews,
    getReviewsOneRestaurant,
    createReview,
    deleteReview,
    updateReview,
}