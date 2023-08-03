import React, { useState, useRef, useEffect, useContext  } from 'react';
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { fetchContents } from '../store/actions/data'
import { MoreIcon } from './Icon';
import { User } from '../types/mockapi'
import styled, { ThemeContext } from 'styled-components'
import ProfileCard from './ProfileCard'

type UserDropdownProps = {
    className?: string;
    style?: React.CSSProperties;
};

const UserDropdown: React.FC<UserDropdownProps> = (
        {
           className,
           style,
         }
     ) => {

    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.data.contents);
    const loading = useAppSelector((state) => state.data.loading);
    const error = useAppSelector((state) => state.data.error);


    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedUser, setUser] = useState<User | null>(null);
    const [hoveredUser, setHoveredUser] = useState<User | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const theme = useContext(ThemeContext);

    const DropdownButton = styled.button`
      background: ${(props) => props.theme.colors.black500};
      border: none;
      cursor: pointer;
      color: ${(props) => props.theme.colors.white100};
    `;

    const DropdownMenu = styled.div`
      background-color: ${(props) => props.theme.colors.black500};
      width: 225px;
    `;

    const UserItem = styled.div<{ isHovered: boolean }>`
      display: block;
      border: none;
      background-color: ${(props) => (props.isHovered ? props.theme.colors.blue100 : 'transparent')};
      color: ${(props) => props.theme.colors.white200};
      font-size: 16px;
      cursor: pointer;
      text-align: left;
      padding: 8px 8px;
    `;

    useEffect(() => {
        dispatch(fetchContents());
    }, [dispatch]);

    useEffect(() => {
        if (isDropdownOpen) {
            menuRef.current?.focus();
        }
    }, [isDropdownOpen]);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
        setUser(null);
        setHoveredUser(null);
    };

    const handleSelectUser = (user: User) => {
        setUser(user);
        setHoveredUser(user);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // some action :)
    };

    const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // some action :)
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div
            className={`user-dropdown ${className || ''}`}
            style={style}
            ref={dropdownRef}
            onKeyDown={handleKeyDown}
        >
            <DropdownButton
                className="dropdown-button"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                ref={buttonRef}
            >
                <MoreIcon color={theme?.colors.white200} size={24} />
            </DropdownButton>
            {isDropdownOpen && (
                <>
                <DropdownMenu
                    className="dropdown-menu"
                    ref={menuRef}
                    tabIndex={0}
                    role="menu"
                    aria-label="User List"
                    onKeyDown={handleMenuKeyDown}
                >
                    {users.map((user) => (
                        <UserItem
                            key={user.id}
                            className="user-item"
                            onClick={() => handleSelectUser(user)}
                            isHovered={user === hoveredUser}
                        >
                            {user.name}
                        </UserItem>
                    ))}
                </DropdownMenu>
                {selectedUser && <ProfileCard user={selectedUser} />}
                </>
            )}
        </div>
    );
};

export default UserDropdown;
