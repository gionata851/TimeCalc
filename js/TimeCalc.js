 // var res = document.getElementByID("res").innerHTML;
var tc_operando1;
var tc_operando2;
var tc_operatore;

var tc_boolSecondoOperando = false; //passa a true dopo aver finito di scrivere il primo operando (quindi con la prima operazione)
var tc_temporaryString = ''; //serve a tenere in memoria valori utili
var tc_warning = '';
var tc_risultato = null;

var tc_boolTimeMode = false;
var tc_jobDone = false;
var tc_cambiaSegno = false;


function addNum(car){
  if (tc_jobDone) funClear();
  tc_jobDone = false;
  document.getElementById("res").innerHTML += car;
  //if (boolSecondoOperatore) {
    tc_temporaryString += car;
    //console.log(temporaryString);
  //}
}

function funClear(){
  document.getElementById("res").innerHTML = '';
  [tc_operando1,tc_operando2,tc_operatore,tc_risultato,tc_temporaryString,tc_boolSecondoOperando,tc_boolTimeMode,tc_jobDone,tc_cambiaSegno,tc_warning] = [undefined,undefined,'',null,'',false,false,false,false,''];
}

function funC(){
  if(tc_temporaryString != ''){
    tc_temporaryString = tc_temporaryString.slice(0,-1);
    if(!tc_boolTimeMode){
      if (tc_boolSecondoOperando){
        document.getElementById("res").innerHTML = tc_operando1 + tc_operatore + tc_temporaryString;
      } 
      else{
        document.getElementById("res").innerHTML = tc_temporaryString;
      } 
    }
    else document.getElementById("res").innerHTML = document.getElementById("res").innerHTML.slice(0,-1);
  }
}

function timeSet(unit){
  if ((!tc_boolTimeMode && tc_boolSecondoOperando) || tc_temporaryString == '') return;
  if (!tc_boolTimeMode) {
    tc_boolTimeMode = true;
    if (!tc_boolSecondoOperando) tc_operando1 = new Date(0);
    //else                      tc_operando2 = new Date(0);
    //operando2 = new Date(0);
    
  }
  let pIntera = Math.trunc(parseFloat(tc_temporaryString));
  let pFraz = parseFloat(tc_temporaryString) - pIntera;
  let pIntera60 = Math.trunc(pFraz * 60);
  let pFraz60 = pFraz * 60 - pIntera60;
  let pIntera6060 = Math.trunc(pFraz60 * 60);
  //if(tc_operatore == '-' || tc_operatore == '+') tc_operando2 = new Date(0);
  if((tc_operatore == '×' || tc_operatore == '÷') && tc_boolSecondoOperando){
    tc_warning = 'non vanno usate grandezze nel secondo operando in caso di × o ÷';
    document.getElementById("warn").innerHTML = tc_warning;
    return;
  }  
  switch (unit){
    //sospesi
    /* case ' years ':
      if (!boolSecondoOperando) operando1.setUTCFullYear(operando1.getUTCFullYear() + parseFloat(temporaryString));
      else                       operando2.setUTCFullYear(operando2.getUTCFullYear() + parseFloat(temporaryString));
      console.log(temporaryString + unit);
      
      document.getElementById("res").innerHTML += unit;
      temporaryString = '';
      tc_warning = '';
      break; */

    /* case ' months ':
      if (!boolSecondoOperando) operando1.setUTCMonth(operando1.getUTCMonth() + parseFloat(temporaryString));
      else                       operando2.setUTCMonth(operando2.getUTCMonth() + parseFloat(temporaryString));
      console.log(temporaryString + unit);
      
      document.getElementById("res").innerHTML += unit;
      temporaryString = '';
      tc_warning = '';
      break; */

    /* case ' days ':
      if (!boolSecondoOperando) operando1.setUTCDate(operando1.getUTCDate() + parseFloat(temporaryString));
      else                       operando2.setUTCDate(operando2.getUTCDate() + parseFloat(temporaryString));
      console.log(temporaryString + unit);
      
      document.getElementById("res").innerHTML += unit;
      temporaryString = '';
      tc_warning = '';
      break; */

    case ' hours ':
      if (!tc_boolSecondoOperando) tc_operando1.setUTCHours(tc_operando1.getUTCHours() + pIntera, tc_operando1.getUTCMinutes() + pIntera60, tc_operando1.getUTCSeconds() + pIntera6060);
      else                         tc_operando2.setUTCHours(tc_operando2.getUTCHours() + pIntera, tc_operando2.getUTCMinutes() + pIntera60, tc_operando2.getUTCSeconds() + pIntera6060);
      console.log(tc_temporaryString + unit);
      
      document.getElementById("res").innerHTML += unit;
      tc_temporaryString = '';
      tc_warning = '';
      break;

    case ' minutes ':
      if (!tc_boolSecondoOperando) tc_operando1.setUTCMinutes(tc_operando1.getUTCMinutes() + pIntera, tc_operando1.getUTCSeconds() + pIntera60);
      else                         tc_operando2.setUTCMinutes(tc_operando2.getUTCMinutes() + pIntera, tc_operando2.getUTCSeconds() + pIntera60);
      console.log(tc_temporaryString + unit);
      
      document.getElementById("res").innerHTML += unit;
      tc_temporaryString = '';
      tc_warning = '';
      break;

    case ' seconds ':
      if (!tc_boolSecondoOperando) tc_operando1.setUTCSeconds(tc_operando1.getUTCSeconds() + pIntera);
      else                         tc_operando2.setUTCSeconds(tc_operando2.getUTCSeconds() + pIntera);
      console.log(tc_temporaryString + unit);
      
      document.getElementById("res").innerHTML += unit;
      tc_temporaryString = '';
      tc_warning = '';
      break;

    default:
      console.log('caso non sviluppato');
      break;
  }
  document.getElementById("warn").innerHTML = tc_warning;
}

function funOp(car){//+,-,×,÷
  let lastcar = document.getElementById("res").innerHTML.slice(-1);
  if(lastcar == '+' || lastcar == '-' || lastcar == '×' || lastcar == '÷') return;
  if(document.getElementById("res").innerHTML===''){//il meno si può mettere anche a calcolatrice vuota
    if(car ==='-'){
      tc_temporaryString += car;
      document.getElementById("res").innerHTML += car;
      return;
    }
    else return;
  }
  else if(!tc_boolSecondoOperando && !tc_jobDone){//l'inserimento della prima operazione
    if (!tc_boolTimeMode) tc_operando1 = parseFloat(document.getElementById("res").innerHTML);
    else{
      tc_operando1 = tc_operando1.getTime();
      if(car == '+' || car == '-') tc_operando2 = new Date(0);
    } 
  }
  else{ //caso in cui si preme un operazione con un'operazione già in canna
    if(!tc_jobDone) funEql();
    tc_jobDone = false;
    if(!tc_boolTimeMode) tc_operando1 = tc_risultato;
    else{
      tc_operando1 = tc_cambiaSegno ? -tc_risultato.getTime() : tc_risultato.getTime();        
      if(car == '+' || car == '-') tc_operando2 = new Date(0);
      tc_cambiaSegno = false
    }
  } 
  console.log('operando1 salvato come' + tc_operando1);
  tc_operatore = car;
  document.getElementById("res").innerHTML += tc_operatore;
  tc_boolSecondoOperando = true;    
  tc_temporaryString = '';
  
}


function funEql(){
  if(tc_jobDone) return;
  if(tc_boolSecondoOperando){
    if(!tc_boolTimeMode && tc_temporaryString == '') return;
    if(tc_boolTimeMode && (tc_operando2 == undefined || tc_operando2.getTime() == 0) && tc_temporaryString == '') return;
  }
  if (tc_operando1 === undefined || (tc_boolTimeMode && !tc_boolSecondoOperando)) {//caso operando 2 non inserito; risultato = operando1
    console.log("risultato = operando 1");
    if (!tc_boolTimeMode) tc_operando1 = document.getElementById("res").innerHTML ? parseFloat(document.getElementById("res").innerHTML) : 0;
    //else operando1 = operando1.getTime();
    tc_risultato = tc_operando1;

  }
  else{
    if (!tc_boolTimeMode || (tc_boolTimeMode && (tc_operatore == "×" || tc_operatore == "÷" ))) tc_operando2 = parseFloat(tc_temporaryString);
    else{
      if (tc_operando2 instanceof Date && tc_operando2.getTime() != 0)
      tc_operando2 = tc_operando2.getTime();
      else{
        tc_warning = 'inserire una grandezza temporale';
        document.getElementById("warn").innerHTML = tc_warning;
        return;
      } 
    }
    console.log('operando2 salvato come' + tc_operando2);
    tc_temporaryString = '';
    switch (tc_operatore){
      case '+':
        tc_risultato = tc_operando1 + tc_operando2;
        break;
      case '-':
        tc_risultato = tc_operando1 - tc_operando2;
        break;
      case '×':
        tc_risultato = tc_operando1 * tc_operando2;
        break;
      case '÷':
        tc_risultato = tc_operando1 / tc_operando2;
        break;
    }
  }
  //if (boolTimeMode && !(risultato instanceof Date)) risultato = new Date(risultato);
  console.log('il risultato è ' + tc_risultato);
  let resTempo = stampaRisultato();
  document.getElementById("history").innerHTML = (document.getElementById("res").innerHTML || "0") +" = " + resTempo + '<br>' +document.getElementById("history").innerHTML;
  document.getElementById("res").innerHTML = resTempo;
  tc_operando1 = undefined;
  tc_operando2 = undefined;
  tc_boolSecondoOperando = false;
  //boolTimeMode = false; commentato perchè se il risultato è tempo è giusto tenerla accesa.
  tc_jobDone = true;
  tc_warning = '';
  document.getElementById("warn").innerHTML = tc_warning;
  
  
}

function stampaRisultato(){
  if(tc_boolTimeMode){
    //caso tempo
    console.log('caso stampa risultato in modalità tempo attiva.')
    var resTempo = '';
    if (tc_risultato > 0){
      tc_risultato = new Date(tc_risultato);
    }
    else{
      tc_risultato = new Date(-tc_risultato);
      resTempo += '-';
      tc_cambiaSegno = true;
    }
    resTempo += tc_risultato.getUTCFullYear() === 1970 ? '' : (tc_risultato.getUTCFullYear() - 1970) + " years ";
    resTempo += tc_risultato.getUTCMonth() === 0 ? '' : tc_risultato.getUTCMonth() + " months ";
    resTempo += tc_risultato.getUTCDate() === 1 ? '' : (tc_risultato.getUTCDate() - 1) + " days ";
    resTempo += tc_risultato.getUTCHours() === 0 ? '' : tc_risultato.getUTCHours() + " hours ";
    resTempo += tc_risultato.getUTCMinutes() === 0 ? '' : tc_risultato.getUTCMinutes() + " minutes ";
    resTempo += tc_risultato.getUTCSeconds() === 0 ? '' : tc_risultato.getUTCSeconds() + " seconds ";
    if (resTempo === '' || resTempo === '-') resTempo = "0";
    return resTempo;
  }      
  else{
    //caso non tempo
    return tc_risultato.toString(10);
  }
}

document.addEventListener("keydown",function(e){
  /* console.log(e); */
  let b;
  if(/[-\+\*\/\.\d]/.test(e.key)) 
    b = document.getElementById("btn"+e.key);      
  else if(e.key=="Backspace")
    b = document.getElementById("btnC");
  else if(e.key=="Delete" || e.key=="Escape")
    b = document.getElementById("btnClr");
  else if(e.key=="Enter")
    b = document.getElementById("btnEql");
  /* else if(e.key=="y")
    b = document.getElementById("btnYear");
  else if(e.key=="u")
    b = document.getElementById("btnMonth");
  else if(e.key=="g")
    b = document.getElementById("btnDay"); */
  else if(e.key=="h")
    b = document.getElementById("btnHour");
  else if(e.key=="b")
    b = document.getElementById("btnMin");
  else if(e.key=="n")
    b = document.getElementById("btnSec");
  else return;
  if(b) b.classList.add("active");

});

document.addEventListener("keyup",function(e){
  /* console.log(e); */
  let b;
  if(/[-\+\*\/\.\d]/.test(e.key)) 
    b = document.getElementById("btn"+e.key);      
  else if(e.key=="Backspace")
    b = document.getElementById("btnC");
  else if(e.key=="Delete" || e.key=="Escape")
    b = document.getElementById("btnClr");
  else if(e.key=="Enter")
    b = document.getElementById("btnEql");
  /* else if(e.key=="y")
    b = document.getElementById("btnYear");
  else if(e.key=="u")
    b = document.getElementById("btnMonth");
  else if(e.key=="g")
    b = document.getElementById("btnDay"); */
  else if(e.key=="h")
    b = document.getElementById("btnHour");
  else if(e.key=="m")
    b = document.getElementById("btnMin");
  else if(e.key=="c")
    b = document.getElementById("btnSec");
  else return;
  if (b) { b.click(); b.classList.remove("active");}
});

//regexp originale per sole cifre: /^\d$/