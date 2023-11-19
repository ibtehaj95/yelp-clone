const db = require("../db");

selectAllRestaurants = () => new Promise(async (resolve, reject) => {
    try{
        const resp = await db.query("SELECT * FROM restaurants ORDER BY restaurant_id");
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

selectOneRestaurant = (restaurant_id) => new Promise(async (resolve, reject) => {
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

addRestaurant = (name, location, price) => new Promise(async (resolve, reject) => {  
    try{
        const resp = await db.query(`INSERT INTO restaurants (restaurant_name,restaurant_location,price_range) VALUES($1,$2,$3) returning *`, [name, location, price]);
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
    selectAllRestaurants,
    selectOneRestaurant,
    addRestaurant,
    removeRestaurant,
    modifyRestaurant,
}