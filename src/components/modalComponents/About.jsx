
export function About(){
    
    const date = new Date()

    return ( 
        <article className="p-5px-15px">
            <p>
                <span className="rot-180 dis-iblock fs-015em mr-3px">&copy; </span>
                
                {date.getFullYear()} Hearts Card Game
            </p>
            <hr />
            <p className="mb-10px">This product is inspired by Microsoft Windows 7 Hearts.</p>
            <p className="mb-10px mt-10px">Created with love by Vite + React.</p>
            <p className="mb-10px">Hosted with love by github.</p>
            <p className="mb-10px">Developed with frustration by Letele Motebang.</p>
        </article>
    )
}

  