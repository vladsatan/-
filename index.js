const root = document.getElementById('root');

const input = document.querySelector('.point');

const button = document.querySelector('.button');

let arr = [];

const theme = localStorage.getItem('theme');

if (theme){root.classList.add('bodylight')};



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

    const objact = {id: arr.length + 1, sum: Number(info)};
    arr.push(objact);
    
    exit.addEventListener('click', ()=>{
        let id =  arr.length
        console.log(id);
        const newArr = arr.filter((e)=>{
          return  e.id !== id
         
        })
        card.remove()
        arr = newArr
        const deleteOfpastResult = document.querySelector('.sumBox');
        if(deleteOfpastResult){
            deleteOfpastResult.remove();}
        resultSum(arr);
        const deleteOfpastResult2 = document.querySelector('.sumBox');
        if(arr.length === 0 && deleteOfpastResult2){
            deleteOfpastResult2.remove()
        }

        localStorage.removeItem('title')
        localStorage.removeItem('p')
        localStorage.removeItem('date')
        localStorage.removeItem('exit')

    })
       
  

    const titleLS = localStorage.setItem('title', title.textContent) 
    const pLS = localStorage.setItem('p', p.textContent)
    const dateLS = localStorage.setItem('date', date.textContent)
    const exitLS = localStorage.setItem('exit', exit.textContent)
        
    
  
}
  


    //Окно - Общий буджет

const resultSum = (msv) =>{

        console.log(msv);

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




    //Функция создания окна

button.addEventListener('click', ()=> {
    
    const deleteOfpastResult = document.querySelector('.sumBox');
    
    const info = input.value;
    if(isFinite(info) === false){
        alert('Введите числовое значение')
        return
    }
    const card = createCard(info);
   
    resultSum(arr);
    input.value = '';
    if(deleteOfpastResult){
    deleteOfpastResult.remove();}

})

    
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

// LocalStorage card

const titleLS = localStorage.getItem('title') 
    const pLS = localStorage.getItem('p')
    const dateLS = localStorage.getItem('date')
    const exitLS = localStorage.getItem('exit')



    if (titleLS,pLS,dateLS,exitLS){

        const info = pLS.replace("$", "")
        createCard(info)
    }


// toggl
