import {cartesian, range, shuffleArray, splitArray,eqArray} from '../utilities'
import selectOne from './selectOne'
import compDiscardIII from './compDiscardIII'
import compDiscardI from './compDiscardI'

function playingCards() {

    const suits =  ['♣', '♦', '♠', '♥']
    
    // Order of card values
    const ranks = [...range(2,10,1).map(String),"J", "Q", "K", "A"]

    // Compile Cards using suits and values
    const deck = cartesian([ranks,suits])

    // deal all cards to n players
    const heartsDealer = (n) => {
        const [north,east,west,south] = [
            ...splitArray(shuffleArray(deck),Math.floor(52/n))
        ]
        return {north,east,west,south}
    }

    // group according to respective group 
    const groupHand = hand => {
        return {
            diamonds: {
                id: '♦',
                hand: hand.filter(i => i[1] === '♦')
            },
            spades: {
                id:'♠',
                hand:hand.filter(i => i[1] === '♠')
            },
            clubs: {
                id: '♣',
                hand: hand.filter(i => i[1] === '♣')
            },
            hearts: {
                id: '♥',
                hand:hand.filter(i => i[1] === '♥')
            }
        }
    }
    // group hand according to respective suit 
    const groupHandbySuit = hand => {
        return {
            clubs: hand.filter(i => i[1] === '♣'),
            spades: hand.filter(i => i[1] === '♠'),
            hearts: hand.filter(i => i[1] === '♥'),
            diamonds: hand.filter(i => i[1] === '♦'),
        }
    }

    
    // Order cards by ranks
    const orderCardsByRank = arr =>
    arr.sort((a,b) => ranks.indexOf(a[0]) - ranks.indexOf(b[0]))
    
    // Sorts cards for Hearts game
    const sort = (arr,suit) => 
    orderCardsByRank(arr).filter(i => i[1] === suit)

    // Groups hand by suits 
    const group = arr => suits.map(i =>sort(arr,i))
    
    const threeSelector = hand => compDiscardIII(group(hand))
    
    const oneSelector = (active, hand) => selectOne(active, hand)

    const players = ['west','north','east','south']
      
    const orderOfPlayers = (activeCard,allCards) => {
        
        const playerToStart = (activeCard,cards) => Object.entries(cards)
        .map(([key,val]) => val.some(i =>eqArray(i, activeCard)) && key)
        .reduce((prev, current) => current ? current:prev)

        const firstPlayer = players.indexOf(playerToStart(activeCard,allCards))   

        return  players.map((i,j) => players[(j+firstPlayer)%players.length])
    }

    const turns = {
        north: ['west', 'east', 'south', 'north'],
        east: ['north', 'south', 'west', 'east'],
        west: ['south', 'north', 'east', 'west'],
        south: ['east', 'west', 'north', 'south'],
    }

    const swapCards = (player,pcards,cards,hand) => {
         
        const select = player==="south" ? 
        pcards : threeSelector(cards[`${player}Cards`]) 

        const turn = turns[player][hand%4]
        let toPass = turn === "south" ?
        pcards : threeSelector(cards[`${turn}Cards`])
        
        toPass = toPass.map(i => [...i,'passed'])
        return [
            ...cards[`${player}Cards`].filter(i => !select.includes(i)),
            ...toPass
        ]  
    }

    return {
        heartsDealer,
        players,
        threeSelector,
        swapCards,
        oneSelector,
        orderOfPlayers,
        orderCardsByRank,
        compDiscardI,
        groupHandbySuit,
        shuffleArray,
        group,
        groupHand,
        sort,
    }
}

export default playingCards