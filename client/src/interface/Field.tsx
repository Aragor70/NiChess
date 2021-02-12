import React, { Fragment, useEffect, useState } from 'react';
import { checkMovement } from '../store/actions/soldiers';
import Bishop from './soldiers/Bishop';
import Jumper from './soldiers/Jumper';
import King from './soldiers/King';
import Pawn from './soldiers/Pawn';
import Queen from './soldiers/Queen';
import Rook from './soldiers/Rook';




const Field = ({ index, selectedData, setSelectedData, moved, setMoved, field, fields }: any) => {


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
            color: y % 2 === 0 ? index % 2 === 0 ? '#fff' : 'lightgrey' : index % 2 !== 0 ? '#fff' : 'lightgrey'
            
        })

        setFigure({
            player: field.player,
            type: field.type
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

                        // previous / next
            if (!checkMovement(selectedData, position)) {
                return console.log('errorr')
            }
            
            
            if (fields[position.x]) {
                if (fields[position.x].player == 1 && position.x !== selectedData.position.x) {
                    return console.log('friendly fire')
                }
                if (fields[position.x].player == 2 && position.x !== selectedData.position.x) {
                    return console.log('enemy fire')
                }
            }
            const a = fields[selectedData.position.x]
            fields[selectedData.position.x] = 0
            fields[position.x] = a


            console.log('ignored error')



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

    useEffect(() => {
        
        if (moved && selectedData.position.x === position.x) {
            
            console.log('moved')

            setFigure({...figure, player: 0, type: ''})
            setMoved(false)

            setSelectedData({
                position: {
                    y: null,
                    x: null
                }, figure: {
                    player: 0,
                    type: ''
                }
            })
        }
    }, [moved])

    return (
        <Fragment>
            <div className="field-content" onClick={e=> handleClick(position) } style={ position.x == selectedData.position.x ? { backgroundColor: 'green' } : { backgroundColor: color }}>
                
                <span>{position.y} / {position.x}</span>

                { figure.type === 'Pawn' && <Pawn position={position} setContent={setContent} player={figure.player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} figure={figure} setFigure={setFigure} setMoved={setMoved} /> }
                { figure.type === 'Rook' && <Rook position={position} setContent={setContent} player={figure.player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} figure={figure} setFigure={setFigure} setMoved={setMoved} /> }
                { figure.type === 'Jumper' && <Jumper position={position} setContent={setContent} player={figure.player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} figure={figure} setFigure={setFigure} setMoved={setMoved} /> }
                { figure.type === 'Bishop' && <Bishop position={position} setContent={setContent} player={figure.player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} figure={figure} setFigure={setFigure} setMoved={setMoved} /> }
                { figure.type === 'Queen' && <Queen position={position} setContent={setContent} player={figure.player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} figure={figure} setFigure={setFigure} setMoved={setMoved} /> }
                { figure.type === 'King' && <King position={position} setContent={setContent} player={figure.player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} figure={figure} setFigure={setFigure} setMoved={setMoved} /> }

            </div>
        </Fragment>
    );
}
export default Field;