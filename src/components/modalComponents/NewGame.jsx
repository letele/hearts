import { useContext } from "react"
import { GameContext, HeartsContext, UIContext } from "../../context"

export function NewGame(){
    
    const { newGame } = useContext(GameContext)
    
    const { playAgain } = useContext(HeartsContext)
    
    const { setToggle } = useContext(UIContext)    

    const startNewGame = () => {
        playAgain()
        newGame()
        setToggle(null)
    }

    const divClasses = "bd-aaaaaa pb-10px pl-6px c-0078d7 hov-cdef"
    
    return ( 
        <article className=" w-300px">
            <h3 className="m-12px-auto fw-normal c-0000ff">
                What do you want to do with the game in progress?
            </h3>

            <div onClick={startNewGame} className={divClasses}>
                <h3 className="fw-normal">
                    <span className="fs-21pt mr-3px">&rarr;</span> 
                    Quit and start a new game
                </h3>
                    
                <p className="pl-25px">
                    This counts as a loss in your statistics.
                </p>
            </div>
            <div
                onClick={() => setToggle(null)}
                className=" hov-bdccc bd-trans pb-10px pl-6px c-0078d7 hov-cdef"
            >
                <h3 className="fw-normal">
                    <span className="fs-21pt mr-3px">&rarr;</span> 
                    Keep playing
                </h3>
            </div>

        </article>
    )
}
