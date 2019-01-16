import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'


const NavList = styled('ul')`
    display:flex;
    padding: 0 10px;
    list-style:none;
`

const NavAnchor = styled.a`

    color:${ props => (props.primary ? "hsla(215, 58%, 80%, 1)" : "#000")};
    padding:0 10px;
`

const NavListItem = styled.li`
    padding: 0 10px;
    font-family:sans-serif;
`

const Navbar = styled.nav`
    background:${ props => (props.primary ? "hsla(215, 58%, 26%, 1)" : "#000")};
    height:2.5em;
    display:flex;
    align-items:center;
`

const Navigation = () => {
  return (
    <div>
        <Navbar primary>
            <NavList>
                <NavListItem>
                    <Link href="/allEntries">
                        <NavAnchor primary>Enter my App</NavAnchor>
                    </Link>
                </NavListItem>
            </NavList>
        </Navbar>
    </div>
  )
}

export default Navigation
