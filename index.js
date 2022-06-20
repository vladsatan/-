'use strict'
const root = document.getElementById('root');

const input = document.querySelector('.point');

const button = document.querySelector('.button');

let arr = [];

const theme = localStorage.getItem('theme');

if (theme){root.classList.add('bodylight')};



//Функция создание карты

const createCard = (cardinfo) => {
    const card = document.createElement('div');
    const title = document.createElement('h1');
    const p = document.createElement('p');
    const date = document.createElement('p');
    const exit = document.createElement('button');
    
    
    date.classList.add('time')
    date.textContent = cardinfo.date
    card.append(date)

    card.classList.add('card')
    title.classList.add('title')
    p.classList.add('p')

    title.textContent = 'Сумма дохода'
    exit.textContent = 'Х'
    p.textContent = `${cardinfo.sum}  $`

    exit.classList.add('exit')

    root.append(card)
    card.append(exit,title,p)

    

    localStorage.setItem('cardsArray', JSON.stringify(arr))
    
    exit.addEventListener('click', ()=>{
    
          const deletecardId = cardinfo.id
        
          const newArr = arr.filter(e => {
            if(e.id !== deletecardId){
                return e}
            
            
            
        })
          arr = newArr;
          
          card.remove()
          
          const deleteOfpastResult = document.querySelector('.sumBox');
          if(deleteOfpastResult){
            deleteOfpastResult.remove();}
            resultSum(arr)
            const pastLocalStorage = JSON.parse( localStorage.getItem('cardsArray'))
          const newLocalStorage = pastLocalStorage.filter(e =>{
               if( e.id !== deletecardId){return e}
                
            })
            localStorage.removeItem('cardsArray')
            localStorage.setItem('cardsArray',JSON.stringify(newLocalStorage))
            
})
}


    //Окно - Общий буджет

const resultSum = (msv) =>{

 

    const sumBox = document.createElement('div');
    sumBox.classList.add('sumBox');

    const pSum = document.createElement('p');
    pSum.classList.add('pSum');

    
    root.append(sumBox);
    sumBox.append(pSum);

    
  let sum =  msv.reduce((a,b) =>{
    return a + b.sum
   },0)
   
   pSum.textContent = `Общий бюджет: ${sum} $`

}



const savedcards = JSON.parse(localStorage.getItem('cardsArray'))


if (savedcards) {
    arr = savedcards

    savedcards.forEach(element => {
        createCard(element)
        const deleteOfpastResult = document.querySelector('.sumBox');
        resultSum(arr);
        if(deleteOfpastResult){
            deleteOfpastResult.remove();}

    });
}




    //Функция создания окна

button.addEventListener('click', ()=> {
    
    const deleteOfpastResult = document.querySelector('.sumBox');
    
    const info = input.value;
    if(isFinite(info) === false){
        alert('Введите числовое значение')
        return
    }

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() +1;
    let year = today.getFullYear();
    let hour = today.getHours();
    let minuts = today.getMinutes();
    

  const  time = `${hour}:${minuts}  ${day}.${month}.${year}`

  const objact = {id: arr.length + 1, sum: Number(info), date: time}

  arr.push(objact);




    const card = createCard(objact);
   
    resultSum(arr);
    input.value = '';
    if(deleteOfpastResult){
    deleteOfpastResult.remove();}

})

 // Кнопка выбора темы

 const buttonTheme = document.querySelector('.button-fim') 
 
buttonTheme.addEventListener('click', ()=>{
    
    if(
    root.classList.contains('bodylight')){
        root.classList.remove('bodylight')
        localStorage.removeItem('theme', 'bodylight')
        
    }else {
        root.classList.add('bodylight')
        localStorage.setItem('theme', 'bodylight')
    }

})

 // Кнопка clear

const buttonClear = document.querySelector('.button-clear');

 buttonClear.addEventListener('click', ()=>{
     const card = document.querySelectorAll('.card')
     const cardsum = document.querySelector('.sumBox')
     for (let i=0; i < card.length; i++){
        card[i].remove()
     }
      cardsum.remove()
      localStorage.clear()
      arr = []
})

