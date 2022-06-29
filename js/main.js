document.addEventListener('DOMContentLoaded', () => {
   const sectionGame = document.querySelector('.card__game');

    const dataCard = [
        { cardnum: 1 },
        { cardnum: 1 },
        { cardnum: 2 },
        { cardnum: 2 },
        { cardnum: 3 },
        { cardnum: 3 },
        { cardnum: 4 },
        { cardnum: 4 },
    ];

    function shuffle(arr) {
        let j, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    };

    shuffle(dataCard);


    const cardGenerator = () => {
        const cardData = shuffle(dataCard);
        cardData.forEach((item) => {

            const cardWrapper = document.createElement('div'),
                backCard = document.createElement('div'),
                cardCount = document.createElement('span'),
                fronCard = document.createElement('div');


            cardWrapper.classList = 'card__wrapper';
            backCard.classList = 'back__card';
            fronCard.classList = 'front__card';
            cardCount.classList = 'card__count';

            cardCount.textContent = item.cardnum;
            cardWrapper.setAttribute('cardIndex', item.cardnum);
        
            sectionGame.appendChild(cardWrapper);
            cardWrapper.appendChild(backCard);
            cardWrapper.appendChild(fronCard);
            backCard.appendChild(cardCount);

            
            cardWrapper.addEventListener('click', (e) => {
                cardWrapper.classList.toggle('flip');
                checkCards(e);
            });
        });
    };

    const checkCards = (e) => {
        const clickedCard = e.target;
        clickedCard.classList.add('selected');
        const selectCard = document.querySelectorAll('.selected');
        const flipCard = document.querySelectorAll('.flip');

        if (selectCard.length === 2) {
            if(selectCard[0].getAttribute('cardIndex') === selectCard[1].getAttribute('cardIndex')) {
                selectCard.forEach((card) => {
                    card.classList.remove('selected');
                    card.style.pointerEvents = 'none';
                })
            } else {
                selectCard.forEach((card)=> {
                    card.classList.remove('selected');
                    setTimeout(()=> card.classList.remove('flip'), 1000);
                })
            }
        }

        if (flipCard.length === 8) {
           setTimeout(()=> alert('Победа!'), 100);
            flipCard.forEach((card) => {
                card.style.pointerEvents = 'all';
                setTimeout(()=> card.classList.remove('flip'), 100);
            });

            restart();
            
        }
    }
    

     const restart = () => {
        const cardData = shuffle(dataCard);
        console.log(cardData);
        let contCards = document.querySelectorAll('.card__count');
        let cards = document.querySelectorAll('.card__wrapper');

        cardData.forEach((item, index)=> {
            setTimeout(()=> {
                contCards[index].textContent = item.cardnum;
                cards[index].setAttribute('cardIndex', item.cardnum);
            }, 1000);
        });
    }

    cardGenerator();
});