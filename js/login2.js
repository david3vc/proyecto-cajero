let datos = JSON.parse(localStorage.getItem("cuentas"));

if ( datos != null ) {
    //console.log('Hay datos');

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
    
        let recibo = document.querySelector('.recibo');
        recibo.style.visibility = 'hidden';
    }
    
    let  btnLogin = document.getElementById("btn-login");
    let  bandera = null;
    let  array_movimientos = [];
    let  array_movimientos2 = [];
    
    btnLogin.addEventListener("click",function()
    {
        let usuario = document.getElementById("txt-user").value;
        let password = document.getElementById("txt-pass").value;
    
        bandera = login(usuario,password);
        //let array_movimientos = [];
        
        //console.log(bandera);
        if (bandera == false) {
            let opcion = parseInt(prompt("Ingrese opcion: \n 1. Consultar saldo \n 2. Ingresar monto \n 3. Retirar monto \n 4. Transferir dinero \n 5. Historial de movimientos"));
            let texto = '';
            let cuentas = JSON.parse(localStorage.getItem("cuentas"));
    
            //let array_movimientos = [];
    
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
                        /*texto = `El saldo actual de la cuenta es: $${monto[i].saldo}`;
                        document.querySelector('.texto p').textContent = texto;*/
    
                        let recibo = document.querySelector('.recibo');
                        recibo.style.visibility = 'visible';
    
                        document.querySelector('.invoice span').textContent = `${cuentas[i].name}`;
                        
                        let elemento_td1 = document.querySelector('.invoice-items .tr1 .td1');
                        elemento_td1.textContent = `Saldo actual: `;
                        let elemento_td2 = document.querySelector('.invoice-items .tr1 .td2');
                        elemento_td2.textContent = `$ ${cuentas[i].saldo}`;
    
                        let elemento_tr2_td1 = document.querySelector('.invoice-items .tr2 .td1');
                        elemento_tr2_td1.textContent = '';
                        let elemento_tr2_td2 = document.querySelector('.invoice-items .tr2 .td2');
                        elemento_tr2_td2.textContent = '';
    
                        let elemento_td_total1 = document.querySelector('.invoice-items .total .td1');
                        elemento_td_total1.textContent = `Total`;
                        let elemento_td_total2 = document.querySelector('.invoice-items .total .td2');
                        elemento_td_total2.textContent = `$ ${cuentas[i].saldo}`;
    
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
                            //document.querySelector('.texto p').textContent = texto;
                            alert(texto);
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
    
                            /*texto = `El monto ingresado es: $${ingreso}`;
                            texto2 = `El nuevo saldo es: $${nuevoSaldo}`;
                            document.querySelector('.texto p').textContent = texto;
                            document.querySelector('.texto p:nth-child(2)').textContent = texto2;*/
    
    
                            let recibo = document.querySelector('.recibo');
                            recibo.style.visibility = 'visible';
    
                            document.querySelector('.invoice span').textContent = `${cuentas[i].name}`;
    
                            // Para el tr 1
                            let elemento_tr1_td1 = document.querySelector('.invoice-items .tr1 .td1');
                            elemento_tr1_td1.textContent = `Ingreso: `;
                            let elemento_tr1_td2 = document.querySelector('.invoice-items .tr1 .td2');
                            elemento_tr1_td2.textContent = `$ ${ingreso}`;
    
                            // Para el tr 2
                            let elemento_tr2_td1 = document.querySelector('.invoice-items .tr2 .td1');
                            elemento_tr2_td1.textContent = `Nuevo saldo: `;
                            let elemento_tr2_td2 = document.querySelector('.invoice-items .tr2 .td2');
                            elemento_tr2_td2.textContent = `$ ${nuevoSaldo}`;
    
                            let elemento_td_total1 = document.querySelector('.invoice-items .total .td1');
                            elemento_td_total1.textContent = `Total`;
                            let elemento_td_total2 = document.querySelector('.invoice-items .total .td2');
                            elemento_td_total2.textContent = `$ ${nuevoSaldo}`;
    
                            array_movimientos.push(`Ingreso: $ ${ingreso}`);
                            let obj = {
                                _ingreso: `Ingreso: $ ${ingreso}`,
                            };
                            array_movimientos2.push(obj);
                        }
                    }
                }
            } else if (opcion == 3) {
                let egreso = parseInt(prompt("Ingrese monto: "));
                let nuevoSaldo = 0;
                let texto = '';
                let texto2 = '';
    
                for( let i=0; i < cuentas.length;i++  )
                {
                    if( (usuario.toLowerCase() === cuentas[i].usuario.toLowerCase()) 
                            && 
                        ( password === cuentas[i].pass )  )
                    {
                        if (egreso > cuentas[i].saldo) {
                            let texto = `No dispones de ese monto en tu cuenta`;
                            //document.querySelector('.texto p').textContent = texto;
                            alert(texto);
                        } else if (( cuentas[i].saldo - egreso ) < 10) {
                            let texto = `No se puede retirar $${egreso} porque la cuenta no puede tener menos de $10`;
    
                            //document.querySelector('.texto p').textContent = texto;
                            alert(texto);
                        } else {
                            cuentas[i].saldo -= egreso;
                            nuevoSaldo = cuentas[i].saldo;
                            localStorage.setItem("cuentas", JSON.stringify(cuentas));
    
                            /*texto = `El monto retirado es: $${egreso}`;
                            texto2 = `El nuevo saldo es: $${nuevoSaldo}`;
                            document.querySelector('.texto p').textContent = texto;
                            document.querySelector('.texto p:nth-child(2)').textContent = texto2;*/
    
    
                            let recibo = document.querySelector('.recibo');
                            recibo.style.visibility = 'visible';
    
                            document.querySelector('.invoice span').textContent = `${cuentas[i].name}`;
    
                            // Para el tr 1
                            let elemento_tr1_td1 = document.querySelector('.invoice-items .tr1 .td1');
                            elemento_tr1_td1.textContent = `Egreso: `;
                            let elemento_tr1_td2 = document.querySelector('.invoice-items .tr1 .td2');
                            elemento_tr1_td2.textContent = `$ ${egreso}`;
    
                            // Para el tr 2
                            let elemento_tr2_td1 = document.querySelector('.invoice-items .tr2 .td1');
                            elemento_tr2_td1.textContent = `Nuevo saldo: `;
                            let elemento_tr2_td2 = document.querySelector('.invoice-items .tr2 .td2');
                            elemento_tr2_td2.textContent = `$ ${nuevoSaldo}`;
    
                            let elemento_td_total1 = document.querySelector('.invoice-items .total .td1');
                            elemento_td_total1.textContent = `Total`;
                            let elemento_td_total2 = document.querySelector('.invoice-items .total .td2');
                            elemento_td_total2.textContent = `$ ${nuevoSaldo}`;
    
                            array_movimientos.push(`Egreso: -$ ${egreso}`);
                            let obj = {
                                _egreso: `Egreso: -$ ${egreso}`,
                            };
                            array_movimientos2.push(obj);
                        }
                    }
                }
            } else if (opcion == 4) {
                let cuentaElegida = parseInt(prompt(`Seleccione cuenta: \n 1. ${cuentas[0].name} \n 2. ${cuentas[1].name} \n 3. ${cuentas[2].name}`));
                let monto = parseInt(prompt('Ingrese monto a transferir: '));
                
                
                for( let i=0; i < cuentas.length; i++  ) {
                    if( (usuario.toLowerCase() === cuentas[i].usuario.toLowerCase()) 
                    && 
                    ( password === cuentas[i].pass )  )
                    {
                        // Agregar el monto a la cuenta elegida
                        cuentas[cuentaElegida-1].saldo += monto;
                        localStorage.setItem("cuentas", JSON.stringify(cuentas));
                        
                        // Descontar el monto en la cuenta actual
                        cuentas[i].saldo -= monto;
                        nuevoSaldo = cuentas[i].saldo;
                        localStorage.setItem("cuentas", JSON.stringify(cuentas));
    
                        let recibo = document.querySelector('.recibo');
                        recibo.style.visibility = 'visible';
    
                        document.querySelector('.invoice span').textContent = `${cuentas[i].name}`;
    
                        // Para el tr 1
                        let elemento_tr1_td1 = document.querySelector('.invoice-items .tr1 .td1');
                        elemento_tr1_td1.textContent = `Importe transferido: `;
                        let elemento_tr1_td2 = document.querySelector('.invoice-items .tr1 .td2');
                        elemento_tr1_td2.textContent = `$ ${monto}`;
    
                        // Para el tr 2
                        let elemento_tr2_td1 = document.querySelector('.invoice-items .tr2 .td1');
                        elemento_tr2_td1.textContent = `Beneficiario: `;
                        let elemento_tr2_td2 = document.querySelector('.invoice-items .tr2 .td2');
                        elemento_tr2_td2.textContent = `${cuentas[cuentaElegida-1].name}`;
    
                        let elemento_td_total1 = document.querySelector('.invoice-items .total .td1');
                        elemento_td_total1.textContent = `Saldo Total`;
                        let elemento_td_total2 = document.querySelector('.invoice-items .total .td2');
                        elemento_td_total2.textContent = `$ ${nuevoSaldo}`;
    
                        array_movimientos.push(`Importe transferido: $ ${monto}`);
                        array_movimientos.push(`Beneficiario: ${cuentas[cuentaElegida-1].name}`);

                        let obj = {
                            _importe      :  `Importe transferido: $ ${monto}`,
                            _beneficiario :  `Beneficiario: ${cuentas[cuentaElegida-1].name}`,
                        };
                        array_movimientos2.push(obj);
                    }
                }
            } else if (opcion == 5) {
                
            }
    
            console.log(array_movimientos);
            console.log(array_movimientos2);
        }
        //console.log(array_movimientos);
    });
    
    let  btnLimpiar = document.getElementById("btn-limpiar");
    btnLimpiar.addEventListener("click", function() {
        limpiar();
    });
} else {
    guardar_localStorage();
}


function guardar_localStorage(){
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
            name:"David Vera",
            saldo: 445,
            usuario:"dverac@gmail.com",
            pass:"123"
        }
    ];
    //guardar las cuentas en localStorage
    localStorage.setItem("cuentas", JSON.stringify(usuarios));
}


