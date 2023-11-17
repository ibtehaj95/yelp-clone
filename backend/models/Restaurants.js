const db = require("../db");

module.exports.selectAllRestaurants = () => new Promise(async (resolve, reject) => {
    try{
        const resp = await db.query("SELECT * FROM restaurants");
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

module.exports.selectOneRestaurant = (restaurant_id) => new Promise(async (resolve, reject) => {
    try{
        const resp = await db.query("SELECT * FROM restaurants WHERE restaurant_id=$1 LIMIT 1", [restaurant_id]);
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

module.exports.addRestaurant = (name, location, price) => new Promise(async (resolve, reject) => {  
    try{
        await db.query(`insert into restaurants (restaurant_name,restaurant_location,price_range) values($1,$2,$3)`, [name, location, price]);
        resolve(true);
    }
    catch(error){
        reject(error);
    }
});