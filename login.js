//guardar_localStorage();

/*function guardar_localStorage(){
}*/
var usuarios = [
    {
        name: "Carlos",
        saldo: 200,
        usuario:"cburguenog@gmail.com",
        pass:"contrasena123"
    },
    {
        name:"Jorge",
        saldo: 320,
        usuario:"jorge.mendoza@gmail.com",
        pass:"jorge123"
    },
    {
        name:"David",
        saldo: 445,
        usuario:"dverac@gmail.com",
        pass:"123"
    }
];

//guardar las cuentas en localStorage
localStorage.setItem("cuentas", JSON.stringify(usuarios));




function login( correo, password )
{
    let flagAlert = true;
    let alert = document.getElementById("liveAlert");
    let N = JSON.parse(localStorage.getItem("cuentas"));

    //for( let i=0; i < usuarios.length;i++  )
    for( let i=0; i < N.length ; i++  )
    {
        let tmpUsuario = N[i];

        if( (correo.toLowerCase() === tmpUsuario.usuario.toLowerCase()) 
                && 
            ( password === tmpUsuario.pass  )  )
        {
            alert.classList.add("alert-primary");
            alert.innerText="Login Exitoso!!!";
            flagAlert = false;
            break;
        }
    }

    if( flagAlert == true )
    {
        
        alert.classList.add("alert-danger");
        alert.textContent = "Upps!! Revisa usuario y contraseña!!"
    }

    setTimeout(function(){cleanMessage()}, 3000);

    return flagAlert;
}

function cleanMessage()
{
    let alert = document.getElementById("liveAlert");
    alert.classList.remove("alert-danger","alert-primary");
    alert.innerText="";
}

function limpiar(){
    document.querySelector('.texto p').textContent = '';
    document.querySelector('.texto p:nth-child(2)').textContent = '';
}

let  btnLogin = document.getElementById("btn-login");
let  bandera = null;
btnLogin.addEventListener("click",function()
{
    let usuario = document.getElementById("txt-user").value;
    let password = document.getElementById("txt-pass").value;

    bandera = login(usuario,password);
    
    //console.log(bandera);
    if (bandera == false) {
        let opcion = parseInt(prompt("Ingrese opcion: \n 1. Consultar saldo \n 2. Ingresar monto \n 3. Retirar monto"));
        let texto = '';
        let cuentas = JSON.parse(localStorage.getItem("cuentas"));

        if (opcion == 1) {
            for( let i=0; i < cuentas.length;i++  )
            {
                if( (usuario.toLowerCase() === cuentas[i].usuario.toLowerCase()) 
                        && 
                    ( password === cuentas[i].pass ) )
                {
                    /*texto = `El saldo actual de la cuenta es: $${usuarios[i].saldo}`;
                    document.querySelector('.texto p').textContent = texto;*/

                    /* con localStorage */
                    let monto = JSON.parse(localStorage.getItem("cuentas"));
                    texto = `El saldo actual de la cuenta es: $${monto[i].saldo}`;
                    document.querySelector('.texto p').textContent = texto;

                    console.log(monto[i].saldo);
                    console.log(typeof monto[i].saldo);
                }
            }
        } else if (opcion == 2) {
            let ingreso = parseInt(prompt("Ingrese monto: "));
            let nuevoSaldo = 0;
            let texto = '';
            let texto2 = '';

            for( let i=0; i < cuentas.length;i++  )
            {
                if( (usuario.toLowerCase() === cuentas[i].usuario.toLowerCase()) 
                        && 
                    ( password === cuentas[i].pass )  )
                {
                    if ((ingreso + cuentas[i].saldo) > 990) {
                        texto = `No se puede ingresar $${ingreso} porque excede la cantidad máxima de $990`;
                        document.querySelector('.texto p').textContent = texto;
                    } else {
                        /*usuarios[i].saldo += ingreso;
                        nuevoSaldo = usuarios[i].saldo;
                        
                        texto = `El monto ingresado es: $${ingreso}`;
                        texto2 = `El nuevo saldo es: $${nuevoSaldo}`;
                        document.querySelector('.texto p').textContent = texto;
                        document.querySelector('.texto p:nth-child(2)').textContent = texto2;*/


                        /* con localStorage */
                        cuentas[i].saldo += ingreso;
                        nuevoSaldo = cuentas[i].saldo;
                        localStorage.setItem("cuentas", JSON.stringify(cuentas));

                        texto = `El monto ingresado es: $${ingreso}`;
                        texto2 = `El nuevo saldo es: $${nuevoSaldo}`;
                        document.querySelector('.texto p').textContent = texto;
                        document.querySelector('.texto p:nth-child(2)').textContent = texto2;
                    }
                }
            }
        } else if (opcion == 3) {
            let egreso = parseInt(prompt("Ingrese monto: "));
            let nuevoSaldo = 0;
            let texto = '';
            let texto2 = '';

            for( let i=0; i < usuarios.length;i++  )
            {
                if( (usuario.toLowerCase() === usuarios[i].usuario.toLowerCase()) 
                        && 
                    ( password === usuarios[i].pass )  )
                {
                    if (egreso > usuarios[i].saldo) {
                        let texto = `No dispones de ese monto en tu cuenta`;
                        document.querySelector('.texto p').textContent = texto;
                    } else if (( usuarios[i].saldo - egreso ) < 10) {
                        let texto = `No se puede retirar $${egreso} porque la cuenta no puede tener menos de $10`;

                        document.querySelector('.texto p').textContent = texto;
                    } else {
                        usuarios[i].saldo -= egreso;
                        nuevoSaldo = usuarios[i].saldo;

                        texto = `El monto retirado es: $${egreso}`;
                        texto2 = `El nuevo saldo es: $${nuevoSaldo}`;
                        document.querySelector('.texto p').textContent = texto;
                        document.querySelector('.texto p:nth-child(2)').textContent = texto2;
                    }
                }
            }
        }
    }
});

let  btnLimpiar = document.getElementById("btn-limpiar");
btnLimpiar.addEventListener("click", function() {
    limpiar();
});