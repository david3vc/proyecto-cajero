guardar_localStorage();

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
            const tr1 = document.querySelector('.invoice-items tr');
            const tr2 = document.querySelector('.invoice-items tr:nth-child(2)');
            //const tr3 = document.querySelector('.invoice-items tr:nth-child(3)');
            tr1.remove();
            tr2.remove();
            //tr3.remove();

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
                    //console.log(recibo.style)

                    /* Crear elementos HTML */
                    // Creamos el 1er td
                    const elemento_td1 = document.createElement('td');
                    elemento_td1.textContent = 'Saldo actual: ';

                    // Creamos el 2do td
                    const elemento_td2 = document.createElement('td');
                    elemento_td2.textContent = `$ ${monto[i].saldo}`;
                    elemento_td2.classList.add('alignright');

                    // Creamos el td1 del total
                    const elemento_td_total1 = document.createElement('td');
                    elemento_td_total1.textContent = `Total`;
                    elemento_td_total1.classList.add('alignright');

                    // Creamos el td2 del total
                    const elemento_td_total2 = document.createElement('td');
                    elemento_td_total2.textContent = `$ ${monto[i].saldo}`;
                    elemento_td_total2.classList.add('alignright');

                    // Creamos el tr que contendrá a los td
                    const elemento_tr  = document.createElement('tr');
                    elemento_tr.appendChild(elemento_td1);
                    elemento_tr.appendChild(elemento_td2);

                    // Creamos el tr que contendrá a los td total
                    /*const elemento_tr_total  = document.createElement('tr');
                    elemento_tr_total.classList.add('total');
                    //elemento_tr_total.style.width('80%');
                    elemento_tr_total.appendChild(elemento_td_total1);
                    elemento_tr_total.appendChild(elemento_td_total2);*/

                    // Insertamos los elementos html creados al tbody
                    const elemento_tbody = document.querySelector('.invoice-items tbody');
                    elemento_tbody.insertBefore(elemento_tr, elemento_tbody.children[0]);

                    // Insertamos el td del total al tr del total
                    const insertar_elemento_tr_total = document.querySelector('.invoice-items .total');
                    insertar_elemento_tr_total.insertBefore(elemento_td_total1, insertar_elemento_tr_total.children[0]);
                    insertar_elemento_tr_total.insertBefore(elemento_td_total2, insertar_elemento_tr_total.children[1]);

                    document.querySelector('.invoice span').textContent = `${cuentas[i].name}`;

                    console.log(monto[i].saldo);
                    console.log(typeof monto[i].saldo);
                }
            }
        } else if (opcion == 2) {
            const tr1 = document.querySelector('.invoice-items tr');
            const tr2 = document.querySelector('.invoice-items tr:nth-child(2)');
            tr1.remove();
            tr2.remove();

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

                        /*texto = `El monto ingresado es: $${ingreso}`;
                        texto2 = `El nuevo saldo es: $${nuevoSaldo}`;
                        document.querySelector('.texto p').textContent = texto;
                        document.querySelector('.texto p:nth-child(2)').textContent = texto2;*/


                        /* ****** */
                        let recibo = document.querySelector('.recibo');
                        recibo.style.visibility = 'visible';

                        /* Crear elementos HTML */
                        // Creamos el 1er td
                        const elemento_td1 = document.createElement('td');
                        elemento_td1.textContent = 'Ingreso: ';

                        // Creamos el 2do td
                        const elemento_td2 = document.createElement('td');
                        elemento_td2.textContent = `$ ${ingreso}`;
                        elemento_td2.classList.add('alignright');

                        // Creamos el 3er td
                        const elemento_td3 = document.createElement('td');
                        elemento_td3.textContent = 'Nuevo saldo: ';

                        // Creamos el 4do td
                        const elemento_td4 = document.createElement('td');
                        elemento_td4.textContent = `$ ${nuevoSaldo}`;
                        elemento_td4.classList.add('alignright');

                        // Creamos el td1 del total
                        const elemento_td_total1 = document.createElement('td');
                        elemento_td_total1.textContent = `Total`;
                        elemento_td_total1.classList.add('alignright');

                        // Creamos el td2 del total
                        const elemento_td_total2 = document.createElement('td');
                        elemento_td_total2.textContent = `$ ${nuevoSaldo}`;
                        elemento_td_total2.classList.add('alignright');

                        /*// Creamos el td del total
                        const elemento_td_total = document.createElement('td');
                        elemento_td_total.textContent = `$ ${nuevoSaldo}`;
                        elemento_td_total.classList.add('alignright');*/

                        // Creamos los tr que contendrá a los td
                        const elemento_tr1  = document.createElement('tr');
                        elemento_tr1.appendChild(elemento_td1);
                        elemento_tr1.appendChild(elemento_td2);

                        const elemento_tr2  = document.createElement('tr');
                        elemento_tr2.appendChild(elemento_td3);
                        elemento_tr2.appendChild(elemento_td4);

                        // Creamos el tr que contendrá a los td total
                        const elemento_tr_total  = document.createElement('tr');
                        elemento_tr_total.classList.add('total');
                        //elemento_tr_total.style.width('80%');
                        elemento_tr_total.appendChild(elemento_td_total1);
                        elemento_tr_total.appendChild(elemento_td_total2);

                        // Insertamos los elementos html creados al tbody
                        const elemento_tbody = document.querySelector('.invoice-items tbody');
                        elemento_tbody.insertBefore(elemento_tr1, elemento_tbody.children[0]);
                        elemento_tbody.insertBefore(elemento_tr2, elemento_tbody.children[1]);
                        elemento_tbody.insertBefore(elemento_tr_total, elemento_tbody.children[2]);

                        document.querySelector('.invoice span').textContent = `${cuentas[i].name}`;
                    }
                }
            }
        } else if (opcion == 3) {
            const tr1 = document.querySelector('.invoice-items tr');
            const tr2 = document.querySelector('.invoice-items tr:nth-child(2)');
            tr1.remove();
            tr2.remove();

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
                        document.querySelector('.texto p').textContent = texto;
                    } else if (( cuentas[i].saldo - egreso ) < 10) {
                        let texto = `No se puede retirar $${egreso} porque la cuenta no puede tener menos de $10`;

                        document.querySelector('.texto p').textContent = texto;
                    } else {
                        cuentas[i].saldo -= egreso;
                        nuevoSaldo = cuentas[i].saldo;
                        localStorage.setItem("cuentas", JSON.stringify(cuentas));

                        /*texto = `El monto retirado es: $${egreso}`;
                        texto2 = `El nuevo saldo es: $${nuevoSaldo}`;
                        document.querySelector('.texto p').textContent = texto;
                        document.querySelector('.texto p:nth-child(2)').textContent = texto2;*/


                        /* ****** */
                        let recibo = document.querySelector('.recibo');
                        recibo.style.visibility = 'visible';

                        /* Crear elementos HTML */
                        // Creamos el 1er td
                        const elemento_td1 = document.createElement('td');
                        elemento_td1.textContent = 'Egreso: ';

                        // Creamos el 2do td
                        const elemento_td2 = document.createElement('td');
                        elemento_td2.textContent = `$ ${egreso}`;
                        elemento_td2.classList.add('alignright');

                        // Creamos el 3er td
                        const elemento_td3 = document.createElement('td');
                        elemento_td3.textContent = 'Nuevo saldo: ';

                        // Creamos el 4do td
                        const elemento_td4 = document.createElement('td');
                        elemento_td4.textContent = `$ ${nuevoSaldo}`;
                        elemento_td4.classList.add('alignright');

                        // Creamos el td1 del total
                        const elemento_td_total1 = document.createElement('td');
                        elemento_td_total1.textContent = `Total`;
                        elemento_td_total1.classList.add('alignright');

                        // Creamos el td2 del total
                        const elemento_td_total2 = document.createElement('td');
                        elemento_td_total2.textContent = `$ ${nuevoSaldo}`;
                        elemento_td_total2.classList.add('alignright');

                        /*// Creamos el td del total
                        const elemento_td_total = document.createElement('td');
                        elemento_td_total.textContent = `$ ${nuevoSaldo}`;
                        elemento_td_total.classList.add('alignright');*/

                        // Creamos los tr que contendrá a los td
                        const elemento_tr1  = document.createElement('tr');
                        elemento_tr1.appendChild(elemento_td1);
                        elemento_tr1.appendChild(elemento_td2);

                        const elemento_tr2  = document.createElement('tr');
                        elemento_tr2.appendChild(elemento_td3);
                        elemento_tr2.appendChild(elemento_td4);

                        // Creamos el tr que contendrá a los td total
                        const elemento_tr_total  = document.createElement('tr');
                        elemento_tr_total.classList.add('total');
                        //elemento_tr_total.style.width('80%');
                        elemento_tr_total.appendChild(elemento_td_total1);
                        elemento_tr_total.appendChild(elemento_td_total2);

                        // Insertamos los elementos html creados al tbody
                        const elemento_tbody = document.querySelector('.invoice-items tbody');
                        elemento_tbody.insertBefore(elemento_tr1, elemento_tbody.children[0]);
                        elemento_tbody.insertBefore(elemento_tr2, elemento_tbody.children[1]);
                        elemento_tbody.insertBefore(elemento_tr_total, elemento_tbody.children[2]);

                        document.querySelector('.invoice span').textContent = `${cuentas[i].name}`;
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