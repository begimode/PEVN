// funciones que va a ejecutar el auth.routes.js
import pool from '../database/keys';

const auth = {};

auth.signUp = async (req, res) => {
    const {
        username,
        email,
        photo,
        role,
        password
    } = req.body;


    try {
        await pool.query('INSERT INTO usuario (u_username, u_email, u_photo, u_rol, u_password) VALUES ($1, $2, $3, $4, $5);', [username, email, photo, role, password]);
        // await pool.query("INSERT INTO category (c_name) VALUES ($1);", [name]);
        // await pool.query(`SELECT * FROM category;`);
        res.status(200).json({
            message: "Successful"
        });
    } catch (error) {
        if (error.constraint == 'usuario_u_email_key') {
            res.status(500).json({
                message: 'This user is already exists'
            })
        } else {
            console.log(req.body)
            res.status(500).json({
                message: "An error has occured",
                error
            })
        }

    }
};

auth.signIn = async (req, res) => {
    const {
        email,
        pass,
    } = req.body;


    try {
        const usuario = await (await pool.query('SELECT * FROM usuario WHERE u_email=$1 AND u_password=$2;', [email, pass])).rows;

        console.log(usuario);

        if (usuario.length > 0) {
            res.status(200).json({
                id: usuario[0].u_id,
                username: usuario[0].u_username,
                email: usuario[0].u_email,
                photo: usuario[0].u_photo,
            });

            if (usuario[0].u_rol == "admin") {
                // llevar a la pagina de admin
            } else {
                // llevar a otra pagina
            }
        } else {
            res.status(500).json({
                message: "The user did not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'There is no user with this email',
            error
        })
    }
};



module.exports = auth;
