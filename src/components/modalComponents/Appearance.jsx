import { useContext } from "react"
import { UIContext } from "../../context"
import {cardImgs, boardImgs} from "../../imgs"

export function Appearance(){
    
    const{
        boardBackground, setBoardBackground,
        cardBackground , setCardBackground,
        checked, setChecked,
    } = useContext(UIContext)

    const handleChange = () => setChecked(!checked)

    const ulClasses = "bd-aaaaaa bg-fff flex jus-arnd m-5px-auto"

    const imgClasses = cond => 
    `p-10px mb--3px ${cond ? 'bd3-0078d7':'bd3-trans'}`

    const divClasses = cond => `txt-center w-fcnt m-auto  
        p-1px-3px hov-arrow ${cond && 'bg-0078d7  c-fff'}
    `
    
    return ( 
        <article  className="w-400px">
            <span>Select Card Deck</span>
            <ul className={ulClasses}>
                {Object.keys(cardImgs).map(i => <li 
                    key={i} 
                    className="m-12px-auto"
                    onClick={() => setCardBackground(i)}
                >
                    <img 
                        alt={i}
                        src={`${cardImgs[i]}`}
                        className={imgClasses(cardBackground===i)}
                        style={{
                            height: 'calc(0.21*400px)',
                            width: 'calc(0.15*400px)',
                        }}
                    />
                    <div 
                        className={divClasses(cardBackground===i)}
                    >{i}</div>
                </li>
            )}</ul>

            <span>Select Background</span>
            <ul className={ulClasses}>
                {Object.keys(boardImgs).map( i =>
                <li 
                    key={i} 
                    className="m-12px-auto"
                    onClick={() => setBoardBackground(i)}
                >
                    <div  className={`p-10px mb--3px 
                            ${boardBackground===i ? 'bd3-0078d7':'bd3-trans'}
                        `}
                    >
                        <div 
                            className="p-10px bdr-10pc bxsblack"
                            style={{
                                backgroundImage: `url(${boardImgs[i]})`,
                                height:'calc(0.075*400px)',
                                width:'calc(0.075*400px)',
                            }}
                        ></div>
                    </div>
                    <div 
                        className={divClasses(boardBackground===i)}
                    >{i}</div>
                </li>
            )}</ul>
             
            <label className="flex al-center">
                <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={handleChange}
                    className="mr-3px"
                />
                Randomly select background and deck
            </label>        
        </article>
    )
}