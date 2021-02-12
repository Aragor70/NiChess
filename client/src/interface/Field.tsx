import React, { Fragment, useEffect, useState } from 'react';
import { checkMovement } from '../store/actions/soldiers';
import Bishop from './soldiers/Bishop';
import Jumper from './soldiers/Jumper';
import King from './soldiers/King';
import Pawn from './soldiers/Pawn';
import Queen from './soldiers/Queen';
import Rook from './soldiers/Rook';




const Field = ({ index, selectedData, setSelectedData, moved, setMoved, field }: any) => {

    // commented code
    /* 
    
    const handleClick = (position: any) => {

        
        if (selectedData.figure.type) {

                        // previous / next
            if (!checkMovement(selectedData, position)) {
                return console.log('Wrong movement')
            }
            
            
            
            if (fields[position.x]) {
                if (fields[position.x].player == 1 && position.x !== selectedData.position.x) {
                    return console.log('friendly fire')
                }
                if (fields[position.x].player == 2 && position.x !== selectedData.position.x) {
                    console.log('enemy fire')
                    setFigure(selectedData.figure)
                }
            }
            const a = fields[selectedData.position.x]
            fields[selectedData.position.x] = 0
            fields[position.x] = a

            
            console.log('ignored error')

            console.log(selectedData.figure)

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
    }, [moved]) */


    const handleClick = (field: any) => {



        if (field.player === 1) {
            
            if (selectedData !== null) {
                return setSelectedData(null)
            }

            setSelectedData(field)
            
            setMoved(false)
        }
    }
    console.log(selectedData)
    
    const { position, color, player, type } = field

    return (
        <Fragment>
            <div className="field-content" onClick={e => handleClick(field) } style={ selectedData && position.x == selectedData.position.x ? { backgroundColor: 'green' } : { backgroundColor: color }}>
                
                <span>{position.y} / {position.x}</span>

                { type === 'Pawn' && <Pawn position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Rook' && <Rook position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Jumper' && <Jumper position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Bishop' && <Bishop position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'Queen' && <Queen position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }
                { type === 'King' && <King position={position} player={player} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} /> }

            </div>
        </Fragment>
    );
}
export default Field;