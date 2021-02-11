import React, { Fragment, useEffect, useState } from 'react';
import Bishop from './soldiers/Bishop';
import Jumper from './soldiers/Jumper';
import King from './soldiers/King';
import Pawn from './soldiers/Pawn';
import Queen from './soldiers/Queen';
import Rook from './soldiers/Rook';




const Field = ({ index, selectedData, setSelectedData, moved, setMoved }: any) => {


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


    useEffect(() => {
        let y = Math.floor((index * 8) / 64)
        
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
    }, [setContent, setFigure])
    
    
    
    const handleClick = (position: any) => {

        
        if (selectedData.figure.type) {

            console.log(selectedData.figure)
            
            setMoved(true)

            setFigure(selectedData.figure)
        }

        if (figure.type) {
            
            setSelectedData({...selectedData, position: {
                y: position.y,
                x: position.x
            }, figure})
            
            setMoved(false)
        }

        if (figure.type && selectedData.position.x === content.position.x) {
        
            setSelectedData({
                ...selectedData,
                position: {
                    y: null,
                    x: null
                }, figure: {
                    player: 0,
                    type: ''
                }
            })
            
            setMoved(false)
        }

    }


    



    const { position, color } = content

    return (
        <Fragment>
            <div className="field-content" onClick={e=> handleClick(position) } style={ position.x == selectedData.position.x ? { backgroundColor: 'green' } : { backgroundColor: color }}>
                
                <span>{position.y} / {position.x}</span>

                { figure.type === 'pawn' && <Pawn position={position} player={figure.player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} figure={figure} setFigure={setFigure} setMoved={setMoved} /> }
                { figure.type === 'rook' && <Rook position={position} player={figure.player} /> }
                { figure.type === 'jumper' && <Jumper position={position} player={figure.player} /> }
                { figure.type === 'bishop' && <Bishop position={position} player={figure.player} /> }
                { figure.type === 'queen' && <Queen position={position} player={figure.player} /> }
                { figure.type === 'king' && <King position={position} player={figure.player} /> }

            </div>
        </Fragment>
    );
}
export default Field;