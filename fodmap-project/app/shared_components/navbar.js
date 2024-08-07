"use client"

import Link from 'next/link';
import Image from 'next/image';
import user_icon from '../../public/dashboard_icon.png';
import styled from 'styled-components';


const StyledNavbarDiv = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #DCA47C;

    .home-button {
        align-content: center;
        margin-left: 30px;
  }
`

const MenuButton = styled.button`
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    margin: 20px 15px;
    width: 120px;
    height: 50px;
    border: none;
    border-radius: 6.5px;
    font-size: larger;

    // Active page button higlighting
    background-color: ${props => props.className === "page-button" ? "#698474" : "#DCA47C"};
    color: ${props => props.className == "page-button" && "#FCF8F3"};
`;


export default function Navbar(props) {
    const links = [
        {id: 0, href: '/', name: 'Dashboard' },
        {id: 1, href: '/diary', name: 'Diary' },
        {id: 2, href: '/meals', name: 'Meals' },
        {id: 3, href: '/recipes', name: 'Recipes' },
        {id: 4, href: '/stats', name: 'Stats' },
    ]

    return (
        <StyledNavbarDiv>
            <div className="home-button">
                <Link href="/">
                <Image
                    src={user_icon}
                    alt="User Image"
                    width={50}
                    height={50}
                    />
                </Link>
            </div>
            
            <div className="menu-items">
                {
                    links.map(item => {
                        return (
                            <Link href={item.href} key={item.id}>
                                <MenuButton className={props.currentRoute === item.href ? 'page-button' : ''}>
                                    {item.name}
                                </MenuButton>
                            </Link>
                        )
                    })
                }
            </div>
        </StyledNavbarDiv>
    )
}

