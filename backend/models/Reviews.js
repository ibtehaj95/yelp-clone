const db = require("../db");

// not expected to be used
selectAllReviews = () => new Promise(async (resolve, reject) => {
    try{
        const resp = await db.query("SELECT * FROM reviews ORDER BY review_id");
        if(resp.rows.length === 0){
            reject(true);
        }
        else{
            resolve(resp);
        }
    }
    catch(error){
        reject(error);
    }
    
});

// select reviews for a restaurant
selectReviewsOneRestaurant = (restaurant_id) => new Promise(async (resolve, reject) => {
    try{
        const resp = await db.query("SELECT * FROM reviews WHERE restaurant_id=$1", [restaurant_id]);
        if(resp.rows.length === 0){
            reject(true);
        }
        else{
            resolve(resp);
        }
    }
    catch(error){
        reject(error);
    }
});

addReview = (rest_id, user_id, rating, review) => new Promise(async (resolve, reject) => {  
    try{
        const resp = await db.query(`INSERT INTO reviews (user_id, restaurant_id, rating, review) VALUES($1,$2,$3,$4) returning *`, [user_id, rest_id, rating, review]);
        resolve(resp);
    }
    catch(error){
        reject(error);
    }
});

removeRestaurant = (id) => new Promise(async (resolve, reject) => {  
    try{
        const resp = await db.query(`DELETE FROM restaurants WHERE restaurant_id=$1 returning *`, [id]);
        if(resp.rows.length === 0){
            reject(true);
        }
        else{
            resolve(resp);
        }
    }
    catch(error){
        reject(error);
    }
});

modifyRestaurant = (id, name, location, price) => new Promise(async (resolve, reject) => {  
    try{
        const resp = await db.query(`UPDATE restaurants SET restaurant_name=$2,restaurant_location=$3,price_range=$4 WHERE restaurant_id=$1 returning *`, [id, name, location, price]);
        if(resp.rows.length === 0){
            reject(true);
        }
        else{
            resolve(resp);
        }
    }
    catch(error){
        reject(error);
    }
});

module.exports = {
    selectAllReviews,
    selectReviewsOneRestaurant,
    addReview,
    removeRestaurant,
    modifyRestaurant,
}