const mysql = require('mysql');
const getMac = require('getmac');
const button = document.getElementById('entrar');
const username = document.getElementById('username');
const password = document.getElementById('password');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "electron"
});

function login(){
    console.log(`Usuário: ${username.value}\nSenha: ${password.value}`);
    con.connect(function(err) {
        con.query(`SELECT * FROM users where username='${username.value}'`, function (err, result, fields) {
            try{
                if (result[0].username == username.value && result[0].password == password.value){
                    if (result[0].mac == getMac.default()){
                        console.log('Logado com sucesso!')
                    }
                    else{
                        console.log(getMac.default())
                        console.log('Hardware bloqueado.')
                    }
                }
                else{
                    console.log('Senha inválida.')
                }
            }
            catch (e){
                if (e == 'TypeError: Cannot read properties of undefined (reading \'username\')'){
                    console.log('Usuário inexistente.')
                }
                else{
                    return
                }
            }
        });
      });
}

button.addEventListener('click', () => {
    login();
})