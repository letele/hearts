import playingCards from "./playingCards"

function selectOne(active,hand){

    const {sort, orderCardsByRank, groupHand} = playingCards()
    let selected 
    
    const activeSuit = active[1]
    
    const q =['Q', '♠']
    
    const qPresent = hand.map(i => i.join()).includes(q.join())
    
    const twoPresent = active.join()===['2', '♣'].join()

    const suits = groupHand(hand)
    const KA = suits.spades.hand
    .filter(i => ['K','A'].includes(i[0]) && i)    

    const remSuits = Object.keys(suits)
    .filter(i => suits[i].id !== activeSuit)
    .map(i => suits[i].hand)
    
    // Choose closest card from active
    let a = hand.filter(i => i[1] === activeSuit && i)
    const pos = sort([...a,active], activeSuit)
    .map(i => i.join()).indexOf(active.join())

    const activePos =  pos===0 ?
    [...sort(a, activeSuit)].reverse().pop() :
    [...sort(a, activeSuit)][pos-1]

    const activeThere = hand.map(i => i.join())
    .includes(active.join())

    const diamondsSpades = suits.diamonds.hand.length ?
    [...sort(suits.diamonds.hand,'♦')].pop() :
    [...sort(suits.spades.hand,'♠')].pop() 
    
    hand.flat().includes(activeSuit) ? (
        selected = activeThere ? 
        active : twoPresent ? 
        [...sort(a, activeSuit)].pop() : activePos
        
    ) : (
        twoPresent ? (
            selected = (KA.length && !qPresent) ? 
            [...KA].pop() : diamondsSpades 
        ) : (
            selected = qPresent ? q : KA.length ? 
            [
                ...KA].pop() : 
                [...orderCardsByRank(remSuits.flat())
            ].pop()  
        )
    )

    return selected
}

export default selectOne