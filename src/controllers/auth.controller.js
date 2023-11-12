import {pool} from "../db.js"
import bcrypt from "bcrypt";
import {createAccessToken} from "../libs/jwt.js"

export const signin = (req, res) => res.send("Ingresando");

export const signup = async(req, res) => {
    const {name, email, password} = req.body;
   
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        const result = await pool.query("INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) Returning *", [name, email, hashedPassword])

        const token = await createAccessToken({id: result.rows[0].id})
        console.log(result);
        //return res.json(result.rows[0]);  
        return res.json({
            token: token,
        });

    } catch (error){
        if(error.code === "23505"){
            return res.status(400).json({message: "El correo ya esta registrado"});
        }
    }    
};

export const signout = (req, res) => res.send("Cerrando sesion");

export const profile = (req, res) => res.send("Perfil de usuario");