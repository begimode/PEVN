import pool from "../database/keys";

const admin = {};


admin.newItem = async (req, res) => {
    const {
        name,
        price,
        description,
        photo,
        composition,
        category
    } = req.body;


    try {
        await pool.query('INSERT INTO product (p_name, p_price,p_description, p_photo, p_composition, p_category) VALUES ($1, $2, $3, $4, $5, $6)', [name, price, description, photo, composition, category]);
        res.status(200).json({
            message: "Successful"
        });
    } catch (error) {
        if (error.constraint == 'product_p_name_key') {
            res.status(500).json({
                message: 'This item is already exists'
            })
        } else {
            res.status(500).json({
                message: "An error has occured",
                error
            })
        }
    }
};

admin.readProduct = async (req, res) => {
    const id = req.params.p_id;

    try {
        const product = await (await pool.query("SELECT * FROM product WHERE p_id=$1", [id])).rows[0];
        res.status(200).json({
            message: "The product is",
            product
        })

    } catch (error) {
        res.status(500).json({
            message: "An error has occured"
        })
    }
};

admin.updateProduct = async (req, res) => {
    const id = req.params.p_id;

    const {
        price,
        description,
        photo,
        composition
    } = req.body;

    try {
        await pool.query("UPDATE product SET p_price=$2, p_description=$3, p_photo=$4, p_composition=$5  WHERE p_id=$1", [id, price, description, photo, composition]);

        res.status(200).json({
            message: "Succesfull",
            admin
        })
    } catch (error) {
        res.status(500).json({
            message: "An error has occured",
            error
        })
    }
};

admin.deleteProduct = async (req, res) => {
    const id = req.params.p_id;

    try {
        await pool.query("DELETE FROM product WHERE p_id=$1;", [id]);
        res.status(200).json({
            message: "Succesfull"
        })
    } catch (error) {
        res.status(500).json({
            message: "The error has occured"
        })
    }
};

admin.getMenu = async (req, res) => {
    
    try {
        const menu = await (await pool.query('SELECT * FROM product;')).rows;
        res.send(menu)
        res.status(200).json({
            message: "All OK"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
};


module.exports = admin;