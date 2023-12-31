import React from 'react'

function Card({children}) {
  const cardStyle = {
    height: '80px',
    width: "100%"
  };

  return (
    <div className="card mb-3" style={cardStyle}>
        <div className="card-body d-flex">
            {children}
        </div>
    </div>
  )
}

export default Card