const connection = require("../config/db");

const useModel = {
    getAllUsers: async () =>{
        const [result] = await connection.query("SELECT * FROM cliente")
        .catch(err => console.log(err));
        return result
    },
    getByID: async (id) => {
        const [result] = await connection.query("SELECT * FROM cliente WHERE id =?", [id])
        .catch(err => console.log(err));
        return result
    },
    registerUser: async (id,nome,email,endereco,senha) =>{
        const [result] = await connection.query("INSERT INTO cliente values(?,?,?,?,?)", [id,nome,email,endereco,senha])
        .catch(err => console.log(erro));
        return result
    },
    getByEmail: async(email)=>{
        const [result] = await connection.query("SELECT * FROM cliente WHERE email=?", [email])
        .catch(erro => console.log(erro));
        return result;
    },
    validateLogin: async(email, senha)=>{
        const [result] = await connection.query("SELECT * FROM cliente WHERE email=? AND senha=?", [email, senha])
        .catch(erro => console.log(erro));
        return result;
    },
    registernNewClient: async(id,nome,sobrenome,email,senha)=>{
        const [result] = await connection.query("INSERT INTO cliente values(?,?,?,?,?)",[id,nome,sobrenome,email,senha])
        .catch(erro => console.log(erro));
        return result;
    },

    //RESET SENHA
    getByEmailClients : async(email)=>{
        const [result] = await connection.query("SELECT * FROM cliente WHERE email=?",[email])
        .catch(erro => console.log(erro));
        return result;
    },
    updateSenha: async(email,senha)=>{
        const [result] = await connection.query("UPDATE cliente SET email=?, senha=? ", [email,senha])
        .catch(erro => console.log(erro));
        return result;
    },
};

module.exports = useModel;
