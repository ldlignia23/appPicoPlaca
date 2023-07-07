class Placa {
    constructor(placa, fecha_validacion, hora_validacion){
        this.placa = placa.toString();
        this.fecha_validacion = fecha_validacion.toString();
        this.hora_validacion = hora_validacion.toString();
    } 
   
     consultarPicoPlaca (callback) {
        const fechaConsulta = new Date(`${this.fecha_validacion.replace(/-/g,'/')},${this.hora_validacion}`);
        const ultimoDigito = parseInt(this.placa.charAt(this.placa.length-1));
        const dia = DAYS[fechaConsulta.getDay()];
        const horaDia = fechaConsulta.getHours();
        const minHora = fechaConsulta.getMinutes();  
   
        const rest = RESTRCTIONS[dia].plateDigit;
        
        if( rest.includes(ultimoDigito) ) {
            if((horaDia>=6 && horaDia<=9) || (horaDia>=16 && horaDia<=20)){
                if((horaDia===9 || horaDia===20) && (minHora>30)){
                    return callback (true, "Puede circular");
                }
                    return callback (false, "No puede circular");
            }else{
                return callback (true, "Puede circular");
            }
        }
        return callback (true, "Puede circular");  
    }
}
   
class Interfaz{ 
    showAlert(message, className){
        document.getElementById(className).innerText=message;
        setTimeout(function(){
            document.querySelector('#error').innerText='';
        }, 3000);
    }
     validationPlaca(placa){
        let exp = new RegExp(/^[a-z]{3,3}-\d{4,4}$/);
        return exp.test(placa);
    }
    limpiarFooter(){
        document.querySelector('#consultar').innerText=''
    }
}

document.getElementById('placa-form').addEventListener('submit', function(e){
    e.preventDefault();
    const ui = new Interfaz();
     
    const placa = document.getElementById('placa').value.toLowerCase().trim(),
    fecha = document.getElementById('fecha_validacion').value,
    hora = document.getElementById('hora_validacion').value
   
    if(!ui.validationPlaca(placa)){
        ui.showAlert('Ingrese una placa válida, Ej: ABC-1234', 'error');
    }else{
        const consulta = new Placa(placa, fecha, hora);
        const msg =  document.getElementById('consultar');
        consulta.consultarPicoPlaca((e,i)=>{
            if(e){
              msg.style.color = '#0cb870';
              msg.innerText=i
            }else{
              msg.style.color = '#c72b2ba4';
              msg.innerText=i
            }
        })
        setTimeout(function(){
          ui.limpiarFooter();
        }, 4000);

     }
   });
   