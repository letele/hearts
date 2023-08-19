import { cartesian,range,shuffleArray,splitArray } from '@letele/ecmascripts';
import { selectIIICards } from '.';

export function playingCards(){

    // Define card dimensions 5:7
    const cardWidth = 6
	const cardHeight = 1.4*cardWidth

    // Generate deck of cards
	const ranks =  [...range(2,10,1).map(String),'j','q','k','a']
	const suits = ['C','D','S','H']
    const deck = cartesian([suits ,ranks]).map(i => i.join(''))

    // Order cards by ranks
    const orderCardsByRank = arr =>
    arr.sort((a,b) => ranks.indexOf(a.slice(1)) - ranks.indexOf(b.slice(1)))
    
    // Group cards by hearts order : C,D,S, H
    const groupCards = arr => orderCardsByRank(arr)
    .sort((a,b) => suits.indexOf(a[0]) - suits.indexOf(b[0]))

    // Group cardsaccording to respective suit 
    const groupbySuit = hand => {
        return {
            clubs: {
                id:'C',
                hand:hand.filter(i => i[0] === 'C')
            },
            diamonds: {
                id:'D',
                hand:hand.filter(i => i[0] === 'D')
            },
            hearts: {
                id:'H',
                hand:hand.filter(i => i[0] === 'H')
            },
            spades: {
                id:'S',
                hand:hand.filter(i => i[0] === 'S')
            }
        }
    }
    
    // Sorts cards with same suit
    const sort = (arr,suit) => 
    orderCardsByRank(arr).filter(i => i[0] === suit)

    // Function that deals cards to 4 players
    const heartsDealer = () => {
        // Split deck in 4 hands of 13 shuffled cards
        const [west,north,east,south] =  splitArray(shuffleArray(deck),13)

        return {north,east,west,south: groupCards(south)}
    }

    // Players
    const players = ['west','north','east','south']

    // Turn of players
    const turns = {
        north: ['west', 'east', 'south', 'north'],
        east: ['north', 'south', 'west', 'east'],
        west: ['south', 'north', 'east', 'west'],
        south: ['east', 'west', 'north', 'south'],
    }

    // Function that swaps cards in each round
    const swapCards = (player,southIIICards,allCards,hand) => {
         
        const selectedCards = player==="south" ? 
        southIIICards : selectIIICards(allCards[`${player}Cards`]) 

        const turn = turns[player][hand%4]
        
        let toPass = turn === "south" ?
        southIIICards : selectIIICards(allCards[`${turn}Cards`])
  
        return [
            ...allCards[`${player}Cards`].filter(i => !selectedCards.includes(i)),
            ...toPass
        ]  
    }

    // Function that orders players
    const orderOfPlayers = (activeCard,allCards) => {
        
        const playerToStart = (activeCard,cards) => Object.entries(cards)
        .map(([key,val]) => val.some(i =>i===activeCard) && key)
        .reduce((prev, current) => current ? current:prev)

        const firstPlayer = players.indexOf(playerToStart(activeCard,allCards))   

        return  players.map((i,j) => players[(j+firstPlayer)%players.length])
    }

    return {
        cardWidth,cardHeight,
        ranks,
        orderCardsByRank,
        sort,
        heartsDealer,
        players,
        orderOfPlayers,
        groupCards,
        groupbySuit,
        swapCards,
    }
}