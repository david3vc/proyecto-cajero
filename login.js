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

function login( correo, password )
{
    let flagAlert = true;
    let alert = document.getElementById("liveAlert");

    for( let i=0; i < usuarios.length;i++  )
    {
        let tmpUsuario = usuarios[i];

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

        if (opcion == 1) {
            for( let i=0; i < usuarios.length;i++  )
            {
                if( (usuario.toLowerCase() === usuarios[i].usuario.toLowerCase()) 
                        && 
                    ( password === usuarios[i].pass ) )
                {
                    console.log(`El saldo actual de la cuenta es: ${usuarios[i].saldo}`);
                }
            }
        } else if (opcion == 2) {
            let ingreso = parseInt(prompt("Ingrese monto: "));
            let nuevoSaldo = 0;

            for( let i=0; i < usuarios.length;i++  )
            {
                if( (usuario.toLowerCase() === usuarios[i].usuario.toLowerCase()) 
                        && 
                    ( password === usuarios[i].pass )  )
                {
                    if ((ingreso + usuarios[i].saldo) > 990) {
                        console.log(`No se puede ingresar $${ingreso} porque excede la cantidad máxima de $990`);
                    } else {
                        usuarios[i].saldo += ingreso;
                        nuevoSaldo = usuarios[i].saldo;
                        
                        console.log(`El monto ingresado es: ${ingreso}`);
                        console.log(`El nuevo saldo es: ${nuevoSaldo}`);
                    }
                }
            }
        } else if (opcion == 3) {
            let egreso = parseInt(prompt("Ingrese monto: "));
            let nuevoSaldo = 0;

            for( let i=0; i < usuarios.length;i++  )
            {
                if( (usuario.toLowerCase() === usuarios[i].usuario.toLowerCase()) 
                        && 
                    ( password === usuarios[i].pass )  )
                {
                    if (egreso > usuarios[i].saldo) {
                        console.log(`No dispones de ese monto en tu cuenta`);
                    } else if (( usuarios[i].saldo - egreso ) < 10) {
                        console.log(`No se puede retirar $${egreso} porque la cuenta no puede tener menos de $10`);
                    } else {
                        usuarios[i].saldo -= egreso;
                        nuevoSaldo = usuarios[i].saldo;
                        console.log(`El monto retirado es: ${egreso}`);
                        console.log(`El nuevo saldo es: ${nuevoSaldo}`);
                    }
                }
            }
        }
    }
});
