import React from 'react'
import { IData } from '../interfaces/IData'

interface Props {
    alternatives: IData[]
}

const PreviewAlternatives = ({ alternatives }: Props) => {
    return (
        <>
            {alternatives.map((alternative, index) => {
                return (
                    <div key={index}>
                        <p>{alternative.alternative}</p>
                        <p>{alternative.isCorrect}</p>
                        <button onClick={() => {
                            alternatives.splice(index, 1)
                        }}>Apagar</button>
                    </div>
                )
            })}
        </>
    )
}

export default PreviewAlternatives