 // var res = document.getElementByID("res").innerHTML;
var operando1 = 0;
var operando2 = 0;
var operatore;

var boolSecondoOperatore = false;
var temporaryString = '';
var risultato = null;

var boolTimeMode = false;
var jobDone = false;

    function addNum(car){
      if (jobDone) funClear();
      document.getElementById("res").innerHTML += car;
      //if (boolSecondoOperatore) {
        temporaryString += car;
        //console.log(temporaryString);
      //}
    }

    function funClear(){
      document.getElementById("res").innerHTML = '';
      [operando1,operando2,operatore,risultato,boolSecondoOperatore,boolTimeMode,jobDone] = [undefined,undefined,'',null,false,false,false];
    }

    function funC(){
      if (boolSecondoOperatore){
        document.getElementById("res").innerHTML = operando1 + operatore;
        temporaryString = '';
      } 
      else funClear();
    }

    function timeSet(unit){
      if (!boolTimeMode) {
        boolTimeMode = true;
        operando1 = new Date(0);
        operando2 = new Date(0);
        
      }
      switch (unit){
        case ' years ':
          if (!boolSecondoOperatore) operando1.setFullYear(operando1.getFullYear() + parseInt(temporaryString));
          else                       operando2.setFullYear(operando2.getFullYear() + parseInt(temporaryString));
          console.log(temporaryString);
          
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' months ':
          if (!boolSecondoOperatore) operando1.setMonth(operando1.getMonth() + parseInt(temporaryString));
          else                       operando2.setMonth(operando2.getMonth() + parseInt(temporaryString));
          console.log(temporaryString);
          
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' days ':
          if (!boolSecondoOperatore) operando1.setDate(operando1.getDate() + parseInt(temporaryString));
          else                       operando2.setDate(operando2.getDate() + parseInt(temporaryString));
          console.log(temporaryString);
          
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' hours ':
          if (!boolSecondoOperatore) operando1.setHours(operando1.getHours() + parseInt(temporaryString));
          else                       operando2.setHours(operando2.getHours() + parseInt(temporaryString));
          console.log(temporaryString);
          
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' mins ':
          if (!boolSecondoOperatore) operando1.setMinutes(operando1.getMinutes() + parseInt(temporaryString));
          else                       operando2.setMinutes(operando2.getMinutes() + parseInt(temporaryString));
          console.log(temporaryString);
          
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' secs ':
          if (!boolSecondoOperatore) operando1.setSeconds(operando1.getSeconds() + parseInt(temporaryString));
          else                       operando2.setSeconds(operando2.getSeconds() + parseInt(temporaryString));
          console.log(temporaryString);
          
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        default:
          console.log('caso non sviluppato');
          break;
      }
      //console.log( 'operando 1 ora vale :' + operando1.getFullYear() + "-" + operando1.getMonth() + "-" + operando1.getDate() + "-" + operando1.getHours() + "-" + operando1.getMinutes() + "-" + operando1.getSeconds());
      //console.log( 'operando 2 ora vale :' + operando2.getFullYear() + "-" + operando2.getMonth() + "-" + operando2.getDate() + "-" + operando2.getHours() + "-" + operando2.getMinutes() + "-" + operando2.getSeconds());
    }

    function funOp(car){//+,-,×,÷
      if(!boolSecondoOperatore){
        //risultato = null;
        if (document.getElementById("res").innerHTML=='' || (boolSecondoOperatore && temporaryString==='')){
          if(car ==='-'){ 
            document.getElementById("res").innerHTML += car;
            temporaryString += boolSecondoOperatore ? car : '';
            return;
          }
          else return;
          
        }
        if (!boolTimeMode) operando1 = parseFloat(document.getElementById("res").innerHTML);
        else operando1 = operando1.getTime();
        console.log('operando1 salvato come' + operando1);
        operatore = car;
        document.getElementById("res").innerHTML += operatore;
        boolSecondoOperatore = true;    
        temporaryString = '';
      }
      else return //per ora non consideriamo il caso in cui si preme un operazione con un'operazione già in canna
      
    }


    function funEql(){
      if (operando1 === undefined) {
        console.log("risultato = operando 1");
        operando1 = parseFloat(document.getElementById("res").innerHTML);
        risultato = operando1;

      }
      else{
        if (!boolTimeMode) operando2 = parseFloat(temporaryString);
        else  operando2 = operando2.getTime();
        console.log('operando2 salvato come' + operando2);
        temporaryString = '';
        switch (operatore){
          case '+':
            risultato = operando1 + operando2;
            break;
          case '-':
            risultato = operando1 - operando2;
            break;
          case '×':
            risultato = operando1 * operando2;
            break;
          case '÷':
            risultato = operando1 / operando2;
            break;
        }
      }
      if (boolTimeMode && !(risultato instanceof Date)) risultato = new Date(risultato);
      console.log('il risultato è ' + risultato);
      document.getElementById("history").innerHTML = document.getElementById("res").innerHTML +" = " + risultato.toString(10) + '<br>' +document.getElementById("history").innerHTML;
      document.getElementById("res").innerHTML = stampaRisultato();
      operando1 = undefined;
      operando2 = undefined;
      boolSecondoOperatore = false;
      boolTimeMode = false;
      jobDone = true;
      
    }

    function stampaRisultato(){
      if(boolTimeMode){
        //caso tempo
        console.log('caso stampa risultato in modalità tempo attiva.')
        var resTempo = '';
        resTempo += risultato.getFullYear() === 1970 ? '' : (risultato.getFullYear() - 1970) + " years ";
        resTempo += risultato.getMonth() === 0 ? '' : risultato.getMonth() + " months ";
        resTempo += risultato.getDate() === 1 ? '' : (risultato.getDate() - 1) + " days ";
        resTempo += risultato.getHours() === 1 ? '' : (risultato.getHours() - 1) + " hours ";
        resTempo += risultato.getMinutes() === 0 ? '' : risultato.getMinutes() + " minutes ";
        resTempo += risultato.getSeconds() === 0 ? '' : risultato.getSeconds() + " seconds ";

        return resTempo;
      }      
      else{
        //caso non tempo
        return risultato.toString(10);
      }
    }