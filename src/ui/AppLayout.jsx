import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { styled } from 'styled-components'
// import { getCabins } from '../services/apiCabins'

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  grid-row: 2;
  overflow: scroll;
`

const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: auto 1fr;
`

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

const AppLayout = () => {
  // useEffect(() => {
  //   getCabins().then((data) => console.log(data))
  // }, [])

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
