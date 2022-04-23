import playingCards from "./playingCards";

function compDiscardI(hand,heartBroken){
    
    const {orderCardsByRank, sort, groupHand} = playingCards()

    const q =['Q', '♠']
    const qPresent = hand.map(i => i.join()).includes(q.join())

    const {diamonds, clubs, spades} = groupHand(hand)

    const KA = spades.hand
    .filter(i => ['K','A'].includes(i[0]) && i)  

    const exclHearts = [...spades.hand, ...clubs.hand, ...diamonds.hand]
    
    const allHearts = !exclHearts.length

    const cond = (heartBroken || allHearts)? hand: exclHearts

    const arr1 = spades.hand.length ? 
    sort(spades.hand,'♠') : orderCardsByRank(cond)
    
    const arr2 = (!qPresent && !KA.length) ? 
    arr1 : orderCardsByRank(cond)

    const drawn = [...arr2][0] 

    return drawn
}

export default compDiscardI