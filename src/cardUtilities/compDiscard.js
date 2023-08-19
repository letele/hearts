import {playingCards} from ".";

export function compDiscard(hand,heartBroken){
    
    const {orderCardsByRank, sort, groupbySuit} = playingCards()

    const qPresent = hand.includes('Sq')

    const {diamonds, clubs, spades} = groupbySuit(hand)

    const KA = spades.hand.filter(i => ['k','a'].includes(i && i[1]))  

    const exclHearts = [...spades.hand, ...clubs.hand, ...diamonds.hand]
    
    const allHearts = !exclHearts.length

    const cond = (heartBroken || allHearts)? hand: exclHearts

    const arr1 = spades.hand.length ? 
    sort(spades.hand,'S') : orderCardsByRank(cond)
    
    const arr2 = (!qPresent && !KA.length) ? 
    arr1 : orderCardsByRank(cond)

    const drawn = [...arr2][0] 

    return drawn
}

