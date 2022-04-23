import { useContext } from "react"
import { HeartsContext } from "../../Context"
import Hand from "./Hand"

function Hands(){
    
    const { 
        eastCards, northCards, southCards, westCards,
        eastAcc, westAcc, southAcc,northAcc,
        handOver
    } = useContext(HeartsContext)
    
    
    return ( 
        <>
            <h3 id='west-name'>West</h3>
            <ul id='west-cards' className="hands">{
                westCards &&  <Hand hand={'west'} 
                list = {handOver ? westAcc : westCards} /> 
            }</ul>
            <h3 id='north-name'>North</h3>
            <ul id='north-cards' className="hands">{
                northCards && <Hand hand={'north'} 
                list = {handOver ? northAcc : northCards} /> 
            }</ul>
            <h3 id='east-name'>East</h3>
            <ul id='east-cards' className="hands">{
                eastCards &&  <Hand hand={'east'} 
                list = {handOver ? eastAcc : eastCards} /> 
            }</ul>
            <h3 id='south-name'>South</h3>
            <ul id='south-cards' className="hands">{
                southCards && <Hand hand={'south'} 
                list = {handOver ? southAcc : southCards} /> 
            }</ul>
        </>
        
    )
}

export default Hands

