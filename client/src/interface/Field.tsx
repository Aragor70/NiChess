import React, { Fragment, useEffect, useState } from 'react';




const Field = ({ index }: any) => {


    const [content, setContent] = useState({
        position: {
            y: 0,
            x: 0
        },
        color: ''
    })
    const [figure, setFigure] = useState({
        player: 0,
        type: ''
    })

    const [row, setRow] = useState<number | null>(null)

    useEffect(() => {
        let y = Math.floor((index * 8) / 64)
        
        setRow(y)

        setContent({
            ...content,
            position: { y, x: index },
            color: y % 2 === 0 ? index % 2 === 0 ? '#fff' : 'lightgrey' : index % 2 !== 0 ? '#fff' : 'lightgrey',
            
        })

        if (index >= 8 && index <= 15) setFigure({
            player: 2,
            type: 'pawn'
        })
        if (index === 0) setFigure({
            player: 2,
            type: 'rook'
        })
        if (index === 1) setFigure({
            player: 2,
            type: 'jumper'
        })
        if (index === 2) setFigure({
            player: 2,
            type: 'bishop'
        })
        if (index === 3) setFigure({
            player: 2,
            type: 'queen'
        })
        if (index === 4) setFigure({
            player: 2,
            type: 'king'
        })
        if (index === 5) setFigure({
            player: 2,
            type: 'bishop'
        })
        if (index === 6) setFigure({
            player: 2,
            type: 'jumper'
        })
        if (index === 7) setFigure({
            player: 2,
            type: 'rook'
        })

        if (index >= 48 && index <= 55) setFigure({
            player: 1,
            type: 'pawn'
        })
        if (index === 56) setFigure({
            player: 1,
            type: 'rook'
        })
        if (index === 57) setFigure({
            player: 1,
            type: 'jumper'
        })
        if (index === 58) setFigure({
            player: 1,
            type: 'bishop'
        })
        if (index === 59) setFigure({
            player: 1,
            type: 'queen'
        })
        if (index === 60) setFigure({
            player: 1,
            type: 'king'
        })
        if (index === 61) setFigure({
            player: 1,
            type: 'bishop'
        })
        if (index === 62) setFigure({
            player: 1,
            type: 'jumper'
        })
        if (index === 63) setFigure({
            player: 1,
            type: 'rook'
        })


        return () => {
            setRow(null)
            setContent({
                position: {
                    y: 0,
                    x: 0
                },
                color: ''
            })
            setFigure({
                player: 0,
                type: ''
            })
        }
    }, [setRow, setContent, setFigure])
    
    

    const { position, color } = content


    return (
        <Fragment>
            <div className="field-content" style={ { backgroundColor: color }}>
                
                {position.y} / {position.x}

                {figure.type}

            </div>
        </Fragment>
    );
}
export default Field;