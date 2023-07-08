import { css, styled } from 'styled-components'

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === 'horizontal'
      ? css`
          justify-content: space-between;
          align-items: center;
        `
      : css`
          flex-direction: column;
          gap: 1rem;
        `}
`

// DEFAULT PROPS
Row.defaultProps = {
  type: 'vertical',
}

export default Row
