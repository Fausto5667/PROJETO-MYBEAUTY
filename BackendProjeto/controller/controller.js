const clientController = require("../model/models");

const useController = {
    //Route root
    getRoot: async(req,res)=>{
        res.status(200).json({msg:"The API is running!!!"})
    },

    //Controller para listar todos os usuarios de banco
    listAllUsers: async(req,res)=>{
        try{
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch(erro){
            res.status(500).json({error: "Erro ao obter a lista de usuarios"})
        }
    },

    //Controller list by id
    listByID: async(req,res)=>{
        try{
            const sql = await clientController.getByID(req.params.id);

            if(sql.length > 0)
            {
                res.status(200).json(sql)
            }
            else
            {
                res.status(401).json({msg: "Não existe registro no banco com este ID"})
            }
        }
        catch(error){
            return error
        }
    },

    //Criar usuario
    createNewUser: async(req,res)=>{
        const {id,nome,email,endereco,senha} = req.body;
    
        try{
            // Verifica se o e-mail contém o caractere "@"
            if (!email.includes('@')){
                return res.status(400).json({msg: "O e-mail fornecido é inválido. (@)"});
            }
    
            const sql = await clientController.getByID(id);
    
            if(sql.length > 0){
                res.status(401).json({msg: "O ID já está cadastrado no DB"});
            }
            else{
                await clientController.registerUser(id,nome,email,endereco,senha);
                res.status(201).json({msg: "Usuário cadastrado com sucesso"});
            }
        }
        catch(error){
            return res.status(500).json(error);
        }
    },
 
    registerNewClient: async(req,res)=>{
        const {id, nome, sobrenome, email, senha} = req.body;

        try{
            const sql = await clientController.getByEmail(email);

            if(sql.length > 0){
                res.status(401).json({msg:"O email já está Cadastrado, Insira um email valido"})
            }
            else{
                await clientController.registerSenai(id,nome,sobrenome,email,senha);
                res.status(201).json({msg:"Usuário cadastrado com sucesso"});
            }
        }
        catch(erro){
            console.log(error);
            res.status(500).json({msg:"Ocorreu um erro durante o registro de usuários"});
        }
    },

    login: async (req,res)=>{
        let {email, senha} = req.body;
    
        try{
            const sql = await clientController.validateLogin(email, senha);
            
            if(sql.length > 0 && sql[0].email === email.toLowerCase() && sql[0].senha === senha){ // Compara o e-mail sem conversão para minúsculas
                res.status(200).json({msg:"Email e senha validados com sucesso!!!"});
            }
            else{
                res.status(401).json({msg:"Email ou senha incorretos"});
            }          
        }
        catch (error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

    ResetSenha: async (req, res) => {
        let { email, senha } = req.body

        console.log(req.body);

        email = email.toLowerCase();

        try {
            const sql = await clientController.updateSenha(email, senha);
            res.status(200).json({ msg: "senha atualizada com sucesso" });
        }

        catch (error) {
            console.log("Erro ao redefinir a senha")
            res.status(500).json({ msg: "Erro no servidor" })
        }
    },

    getEmailReset: async (req, res) => {
        let { email } = req.body

        console.log(req.body)
        email = email.toLowerCase();

        try {
            const sql = await clientController.getByEmailClients(email);

            if (sql.length > 0) {
                res.status(200).json({ msg: "sucesso" })
            }
            else {
                res.status(401).json({ msg: "o email nao esta cadastrado no bd" });
            }
        }
        catch (error) {
            if (error) {
                res.status(500).json(error)
            }
        }
    },
};

module.exports = useController;