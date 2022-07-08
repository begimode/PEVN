// funciones que va a ejecutar el auth.routes.js
import pool from '../database/keys';

const auth = {};

auth.signUp = async (req, res) => {
    const {
        name,
        price,
        description,
        photo,
        composition,
        category
    } = req.body;

    // if (rol == "admin") {
        try {
            await pool.query('INSERT INTO product (p_name, p_price,p_description, p_photo, p_composition, p_category) VALUES ($1, $2, $3, $4, $5, $6)', [name, price, description, photo, composition, category]);
            // await pool.query("INSERT INTO category (c_name) VALUES ($1);", [name]);
            // await pool.query(`SELECT * FROM category;`);
            res.status(200).json({
                message: "Successful"
            });
        } catch (error) {
            console.log(req.body)
            res.status(500).json({
                message: "An error has occured",
                error
            })
        }
    // } else {
    //     res.send("You can not acces to this page")
    // }
};

module.exports = auth;
