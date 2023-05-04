import {FC, memo, useState} from 'react';
import styled from 'styled-components';

import PurchaseToken from './PurchaseToken';
import Statistics from './Statistics';

interface toggleMenuProps {
    toggleMenu: boolean
}

const SideNavBar:FC = ()=> {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleTokenStatistics, setToggleTokenStatistics] = useState(true);

    const toggleMenuHandler = () =>{
        if(toggleMenu){
            setToggleMenu(false);
        } 

        if(!toggleMenu){
            setToggleMenu(true);
        }
    }

    return (   
     <Wrapper>
         <MenuToggle onClick={toggleMenuHandler}>
             <Hamburger toggleMenu={toggleMenu}>
                 <HamburgerSpan toggleMenu={toggleMenu}></HamburgerSpan>
             </Hamburger>
         </MenuToggle>
       <Sidebar toggleMenu={toggleMenu}>
           <h3>Menu</h3>
           <Menu>
                <span onClick={()=>setToggleTokenStatistics(true)}>Purchase Token</span>
                <span onClick={()=>setToggleTokenStatistics(false)}>Display Statistics</span>
           </Menu>
       </Sidebar>
       <MainContent>
           {toggleTokenStatistics? <PurchaseToken/> : <Statistics/>}
       </MainContent>
     </Wrapper>
   )
}

export default memo(SideNavBar);

const Wrapper = styled.div`
    display: flex;
    min-height: 100vh;
`;

const Sidebar = styled.aside<Pick<toggleMenuProps, 'toggleMenu'>>`
    flex: 1 1 0;
    max-width: 200px;
    padding: 2rem 1rem;
    background-color: #2e3047;

    h3 {
        color: #707793;
        font-size: 0.75rem;
        text-transform: uppercase;
        margin-bottom: 0.5em;
    }

    @media(max-width: 768px){
        position: fixed;
        top: 0;
        left: ${(props) => props.toggleMenu ? '0' : '-200px'};
        height: 100vh;
        width: 100%;
        transition: 0.2s linear;
    }
`;

const Menu = styled.nav`
    margin: 0 -1rem;

    span {
        display: block;
        padding: 1em;
        color: #fff;
        text-decoration: none;
        transition: 0.2s linear;
        cursor: ponter;

        &:hover {
            color: #04AA6D;
            border-right: 5px solid #04AA6D;
        }
    }
`;

const MainContent = styled.main`
    flex: 1 1 0;
    padding: 2rem;

    @media(max-width: 768px){
        padding: 2rem;
    }
`;

const MenuToggle = styled.div`
    display: none;
    position: fixed;
    top: .5rem;
    right: .5rem;
    width: 60px;
    height: 60px;
    border-radius: 99px;
    background-color: #2e3047;
    cursor: pointer;

    @media(max-width: 768px){
        display: block;
    }
`;

const Hamburger = styled.div<Pick<toggleMenuProps, 'toggleMenu'>>`
    position: relative;
    top: ${(props) => props.toggleMenu ? 'calc(50% - 2px)' : 'calc(50% - 8px)'};
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
`;

const HamburgerSpan = styled.span<Pick<toggleMenuProps, 'toggleMenu'>>`
    transform: ${(props) => props.toggleMenu ? 'rotate(0deg)' : ''};

    &:before{
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 99px;
        background-color: #fff;
        transition-duration: .25s;
        content: '';
        top: -8px;
        top: ${(props) => props.toggleMenu ? 0 : ''};
        transform: ${(props) => props.toggleMenu ? 'rotate(60deg)' : ''};
    },
    &:after {
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 99px;
        background-color: #fff;
        transition-duration: .25s;
        content: '';
        top: 8px;
        top: ${(props) => props.toggleMenu ? 0 : ''};
        transform: ${(props) => props.toggleMenu ? 'rotate(-120deg)' : ''};
    }
`;
