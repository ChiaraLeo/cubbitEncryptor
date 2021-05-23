import React from 'react'
import styled, { keyframes } from 'styled-components'

const Loader = () => {
  const ArrayForLoop = Array.from(Array(9).keys())
  const SmallDivs = ArrayForLoop
    .map((i) =>
      <ItemGrid>
        <SmallDiv />
      </ItemGrid>)

  return <StyledDiv >
    {SmallDivs}
  </StyledDiv>
}

const scaleFrame = keyframes`
0%   {
  transform: scale(0.1, 0.1);
}
50%  {
  transform: scale(1.3, 1.3);
}
100%  {
  transform: scale(0.1, 0.1);
}
`

const ItemGrid = styled.div`
flex: 0 0 33.333333%;
`

const SmallDiv = styled.div`
width: 5px;
margin: auto;
height: 5px;
background: #FFA047;
`

const StyledDiv = styled.div`
flex-wrap: wrap;
display: flex;
justify-content: center;
width: 80px;
height: 80px;
align-items: center;
background: #FFA047;
animation: ${scaleFrame} 1.4s ease infinite;

`

export default Loader
