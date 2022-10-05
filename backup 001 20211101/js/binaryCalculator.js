 // var res = document.getElementByID("res").innerHTML;
var operando1 = 0;
var operando2 = 0;
var operatore;

var boolSecondoOperatore = false;
var temporaryString = '';
var risultato = null;

var boolTimeMode = false;

    function addNum(car){
      if (risultato !== null) funClear();
      document.getElementById("res").innerHTML += car;
      //if (boolSecondoOperatore) {
        temporaryString += car;
        //console.log(temporaryString);
      //}
    }

    function funClear(){
      document.getElementById("res").innerHTML = '';
      [operando1,operando2,operatore,risultato,boolSecondoOperatore,boolTimeMode] = [undefined,undefined,'',null,false,false];
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
          console.log( !boolSecondoOperatore ? 'operando 1 ora vale :' + operando1.getFullYear() + "-" + operando1.getMonth() + "-" + operando1.getDate() + "-" + operando1.getHours() + "-" + operando1.getMinutes() + "-" + operando1.getSeconds() : 'operando 2 ora vale :' + operando2.getFullYear() + "-" + operando2.getMonth() + "-" + operando2.getDate() + "-" + operando2.getHours() + "-" + operando2.getMinutes() + "-" + operando2.getSeconds());
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' months ':
          operando1.setMonth(operando1.getMonth() + parseInt(temporaryString));
          console.log(temporaryString);
          console.log('operando 1 ora vale :' + operando1.getFullYear() + "-" + operando1.getMonth() + "-" + operando1.getDate() + "-" + operando1.getHours() + "-" + operando1.getMinutes() + "-" + operando1.getSeconds());
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' days ':
          operando1.setDate(operando1.getDate() + parseInt(temporaryString));
          console.log(temporaryString);
          console.log('operando 1 ora vale :' + operando1.getFullYear() + "-" + operando1.getMonth() + "-" + operando1.getDate() + "-" + operando1.getHours() + "-" + operando1.getMinutes() + "-" + operando1.getSeconds());
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' hours ':
          operando1.setHours(operando1.getHours() + parseInt(temporaryString));
          console.log(temporaryString);
          console.log('operando 1 ora vale :' + operando1.getFullYear() + "-" + operando1.getMonth() + "-" + operando1.getDate() + "-" + operando1.getHours() + "-" + operando1.getMinutes() + "-" + operando1.getSeconds());
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' mins ':
          operando1.setMinutes(operando1.getMinutes() + parseInt(temporaryString));
          console.log(temporaryString);
          console.log('operando 1 ora vale :' + operando1.getFullYear() + "-" + operando1.getMonth() + "-" + operando1.getDate() + "-" + operando1.getHours() + "-" + operando1.getMinutes() + "-" + operando1.getSeconds());
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        case ' secs ':
          operando1.setSeconds(operando1.getSeconds() + parseInt(temporaryString));
          console.log(temporaryString);
          console.log('operando 1 ora vale :' + operando1.getFullYear() + "-" + operando1.getMonth() + "-" + operando1.getDate() + "-" + operando1.getHours() + "-" + operando1.getMinutes() + "-" + operando1.getSeconds());
          document.getElementById("res").innerHTML += unit;
          temporaryString = '';
          break;

        default:
          console.log('caso non sviluppato');
          break;
      }
    }

    function funOp(car){//+,-,×,÷
      temporaryString = '';
      risultato = null;
      if (document.getElementById("res").innerHTML=='' || (boolSecondoOperatore && temporaryString==='')){
        if(car ==='-'){ 
         document.getElementById("res").innerHTML += car;
         temporaryString += boolSecondoOperatore ? car : '';
         return;
       }
       else return;
       
      }
      if (!boolTimeMode) operando1 = parseFloat(document.getElementById("res").innerHTML);
      
      console.log('operando1 salvato come' + operando1);
      operatore = car;
      document.getElementById("res").innerHTML += operatore;
      boolSecondoOperatore = true;
    }


    function funEql(){
      if (operando1 === undefined) {
        console.log("risultato = operando 1");
        operando1 = parseFloat(document.getElementById("res").innerHTML);
        risultato = operando1;

      }
      else{
        operando2 = parseFloat(temporaryString);
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
      boolSecondoOperatore = false;
      boolTimeMode = false;
      console.log('il risultato è ' + risultato);
      document.getElementById("history").innerHTML = document.getElementById("res").innerHTML +" = " + risultato.toString(10) + '<br>' +document.getElementById("history").innerHTML;
      document.getElementById("res").innerHTML = risultato.toString(10);
      operando1 = undefined;
      operando2 = undefined;
      
    }