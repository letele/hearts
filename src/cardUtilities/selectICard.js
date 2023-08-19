import {playingCards} from ".";

export function selectICard(activeCard,hand){
    
    const {sort, orderCardsByRank, groupbySuit} = playingCards()
    
    const activeSuit = activeCard[0]
    
    const qPresent = hand.includes('Sq')
    
    const twoPresent = activeCard==='C2'
    
    const suits = groupbySuit(hand)
  
    // Choose closest card from active
    let a = hand.filter(i => i && i[0] === activeSuit)
    const pos = sort([...a,activeCard], activeSuit).indexOf(activeCard)
    
    const activePos =  pos===0 ?
    [...sort(a, activeSuit)].reverse().pop() :
    [...sort(a, activeSuit)][pos-1]
    
    const activeThere = hand.includes(activeCard)

    const diamondsSpades = suits.diamonds.hand.length ?
    [...sort(suits.diamonds.hand,'D')].pop() :
    [...sort(suits.spades.hand,'S')].pop() 


    // Check for K or A in spades suit
    const KA = suits.spades.hand.filter(i => i && ['k','a'].includes(i[1]))    
    
    // Get suits that are not active
    const remSuits = Object.keys(suits)
    .filter(i => suits[i].id !== activeSuit).map(i => suits[i].hand).flat()
    
    let selected 
    
    hand.map(i=>i.split('')).flat().includes(activeSuit) ? (
        selected = activeThere ? 
        activeCard : twoPresent ? 
        [...sort(a, activeSuit)].pop() : activePos
    ) : (
        twoPresent ? (
            selected = (KA.length && !qPresent) ? 
            [...KA].pop() : diamondsSpades 
        ) : (
            selected = qPresent ? 'Sq' : KA.length ? 
            [...KA].pop() : [...orderCardsByRank(remSuits)].pop()  
        )
    )

    return selected
}