const root = document.getElementById('root');

const input = document.querySelector('.point');

const button = document.querySelector('.button');

const arr = [];




   //Функция создание карты

const createCard = (info) => {
    const card = document.createElement('div');
    const title = document.createElement('h1');
    const p = document.createElement('p');
    const date = document.createElement('p');
    const exit = document.createElement('button');

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() +1;
    let year = today.getFullYear();
    let hour = today.getHours();
    let minuts = today.getMinutes();
    

    let time = `${hour}:${minuts}  ${day}.${month}.${year}`
    date.classList.add('time')
    date.textContent = time
    card.append(date)

    card.classList.add('card')
    title.classList.add('title')
    p.classList.add('p')

    title.textContent = 'Сумма дохода'
    exit.textContent = 'Х'
    p.textContent = `${info}  $`

    exit.classList.add('exit')

    root.append(card)
    card.append(exit,title,p)

    
    arr.push(Number(info));
    
    
    
    exit.addEventListener('click', ()=>{
        const result = document.querySelector('.sumBox')
        const pSum = document.querySelector('.pSum')
        card.remove();
    })

   
    return arr; 
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
    return a+b
   })
   
   pSum.textContent = `Общий бюджет: ${sum} $`
   
   const exit = document.querySelector('.exit')

  
  
}

    // resultSum(card)


    //Функция создания окна

    button.addEventListener('click', ()=> {
    
    const deleteOfpastResult = document.querySelector('.sumBox');
    
    const info = input.value
    const card = createCard(info);
    const sum = resultSum(card);
    input.value = ''
    deleteOfpastResult.remove();
})






