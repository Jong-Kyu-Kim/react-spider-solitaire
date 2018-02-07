import React from 'react'
import {LinesContainer, LayerContainer} from 'containers'
import 'styles/Field.sass'

const Field = ({field, flipped}) => {
  const lines = field.map((line, i) => (
    <LinesContainer
      key={i}
      lineIndex={i}
      line={line}
      flipped={flipped(i)}
    />
  ))

  return (
    <div className="field">
      {lines}
      <LayerContainer />
    </div>
  )
}

export default Field
