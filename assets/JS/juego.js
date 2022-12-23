/**
 * 2C = Two of Clubs
 * 2D = Two of Diamond
 * 2H = Two of Heart
 * 2S = Two of Spades
 */

// Funcion Modulo permite que no utilicen las variables o funciones en el navegador los Usuarios
(() =>{

    'use strict';


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J','Q', 'K'];
    
    let puntosJugadores = [];

    // Referencias de HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();
        for (let i = 0; i< numJugadores; i++){
            puntosJugadores.push(0);
        };
    };

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for(let tipo of tipos){
                
                deck.push(i + tipo);
            }

        }
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        return _.shuffle(deck);
    };

    // Esta funcion permite tomar una carta

    const pedirCarta = () =>{

        if (deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    };

    // Esta funcion sirve para obtner el valor de la carta

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        // Condiciones
        return (isNaN(valor)) ?
            (valor === 'A') ? 11: 10
            : valor * 1;
    }

    // Turno: 0 = primer Jugador y el ultimo sera la computadora

    const acumularPuntos = (carta,turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    // Esta Funcion Crea la carta

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        do{
            const carta = pedirCarta();
            acumularPuntos(carta, puntosJugadores.length - 1 );

            // <img class="carta" src="./assets/cartas/10C.png" alt="">
            // const imgCarta = document.createElement('img');
            // imgCarta.src =  `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

            if( puntosMinimos > 21){
                break;
            }

        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                alert('Nadie Gana');
        
            }else if(puntosMinimos > 21){
                alert('Computadora Gana');
            }else if(puntosComputadora > 21){
                alert('Jugador Gana');
            }else{
                alert('Computadora Gana');
            }
        }, 200);

    };

    // Eventos
    btnPedir.addEventListener('click', () =>{

        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0);

        // <img class="carta" src="./assets/cartas/10C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src =  `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if(puntosJugador > 21){
            console.warn('Lo siento mucho, perdistes');
            // disable bloque el boton
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }else if(puntosJugador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    })

    btnNuevo.addEventListener('click', () => {

        console.clear();
        inicializarJuego();
        // deck = [];
        // deck = crearDeck();

        // puntosJugador = 0;
        // puntosComputadora = 0;

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';

        // btnPedir.disabled = false;
        // btnDetener.disabled = false;
    });

})();
