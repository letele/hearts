import { useContext } from "react"
import { 
    UIContext,GameContext,HeartsContext 
} from "../../Context"

function MenuBar(){

    const  { ref, toggled, setToggled,toggle, mouseOver } = useContext(UIContext)

    const {playAgain} = useContext(HeartsContext)
    const {newGame} = useContext(GameContext)
    
    const startNewGame = () => {
        playAgain()
        newGame()
        setToggled(null)
    }
    
    function Game()  {
        return (           
            <ul ref={ref}>
                <li onClick={startNewGame}>New Game</li>
                <li onClick={() => setToggled('Statistics')}>Statistics</li>
                <li onClick={() => setToggled('Appearance')}>Appearance</li>
                <li onClick={() => setToggled('Exit')}>Exit</li>
            </ul>
        )
    } 

    function Help()  {
        return (
            <ul ref={ref}>
                <li onClick={() => setToggled('About')}>About</li>
                <li onClick={() => setToggled('Help')}>Help</li>
            </ul>
        )
    } 
    
    return (
        <ul id="menu-bar">
            <li>
                <button 
                    onClick={() => toggle('game')}
                    onMouseOver={() => mouseOver('game')}
                >Game</button>
                {toggled==="game" && <Game />}
            </li>
            <li>
                <button 
                    onClick={() => toggle('help')}
                    onMouseOver={() => mouseOver('help')}
                >Help</button>
               {toggled==="help" &&  <Help />}
            </li>
        </ul>
    )
}

export default MenuBar