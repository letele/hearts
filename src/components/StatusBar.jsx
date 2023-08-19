import { useContext } from "react"
import { heartScores } from "../cardUtilities"
import { HeartsContext } from "../context"

export function StatusBar(){

    const {southAcc } = useContext(HeartsContext)
    const {cardScores} = heartScores()

    const points = cardScores(southAcc)===26 ?
    0 : cardScores(southAcc)

    return (
        <p className=" pl-3px mr-210px bdl-aaaaaa fs-9pt"> 
			Points taken in this hand: {points} 
		</p>
    )
}
