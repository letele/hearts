import { useContext } from "react"
import { useKeyPress } from '@letele/hook-me-up'
import { UIContext } from "../context"

export function MenuBar(){

	const {setToggle, toggle, mouseOver, ref} = useContext(UIContext)

	useKeyPress(['F1','F2','F4','F5'],(key) => {
		if(!toggle){
			key==='F2' && setToggle('NewGame')
			key==='F1' && setToggle('About')
			key==='F4' && setToggle('Statistics')
			key==='F5' && setToggle('Appearance')
		}
	})

	const lineClasses = "ml-20px mr-3px bdt-aaaaaa"

	const divClasses = `
		bd-trans hov-bd0076d75d hov-bga0d3e485 p-1px-6px hov-cdef
	`
    const liClasses = `
		m-2px p-5px pl-20px pr-10px flex jus-btwn hov-bga0d3e4 hov-cdef
	`

	const ulClasses = 'poa z-2 w-210px bd-aaaaaa bg-ececec'

	const MenuLink = ({id,name,Fkey}) => 
	<li className={liClasses} onClick={() => setToggle(id)}>
		<span>{name}</span>
		{Fkey && <span>{Fkey}</span>}
	</li>

    return (
        <nav className="fs-9pt flex">
			<li>
				<div 
					onClick={() => setToggle("Game")}
					onMouseOver={() => mouseOver("Game")}
					className={divClasses}
				>Game</div>
				
				{toggle === "Game" &&
				<ul className={ulClasses} ref={ref}>
					
					<MenuLink id="NewGame" name="New Game" Fkey="F2" />
				
					<li className={lineClasses}></li>
					
					<MenuLink id="Statistics" name="Statistics" Fkey="F4" />
					
					<MenuLink id="Appearance" name="Appearance" Fkey="F5" />
					
					<li className={lineClasses}></li>
					
					<MenuLink id="Exit" name="Exit" Fkey="F5" />
				</ul>}
			</li>
			<li>
				<div
					onClick={() => setToggle("Help")}
					onMouseOver={() => mouseOver("Help")}
					className={divClasses}
				>Help</div>
				
				{toggle === "Help" && 
				<ul className={ulClasses} ref={ref}>

					<MenuLink id="About" name="About" Fkey="F1" />
			
					<li className={liClasses}>
						<a href="https://bicyclecards.com/how-to-play/hearts/" 
							target="_blank" 
							rel="noopener noreferrer"
							className="hov-cdef h-100pc w-100pc"
						>Help</a>
					</li>
					
					<li className={lineClasses}></li>
					
					<li className={liClasses}>
						<a href="https://github.com/letele/hearts" 
							target="_blank" 
							rel="noopener noreferrer"
							className="hov-cdef h-100pc w-100pc"
						>View Source Code</a>
					</li>
				</ul>}
			</li>
		</nav>
    )
}