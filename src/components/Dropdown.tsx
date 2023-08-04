import React, { useState, useRef, useEffect, useContext  } from 'react';
import { useAppDispatch, useAppSelector } from '../store/reducers/store'
import { fetchContents } from '../store/actions/data'
import { MoreIcon } from './Icon';
import { User } from '../types/mockapi'
import styled, { ThemeContext } from 'styled-components'
import ProfileCard from './ProfileCard'

const AlertMessage = styled.div`
      width: 100%;
      text-align: center;
      color: ${(props) => props.theme.colors.white100};
    `;

const DropdownContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: relative;
    `;

const DropdownButton = styled.button`
      background: ${(props) => props.theme.colors.black600};
      margin-top: 5px;
      cursor: pointer;
      padding: 4px 8px;
      border: none;
      color: ${(props) => props.theme.colors.white100};
    `;

const DropdownMenu = styled.div`
      background-color: ${(props) => props.theme.colors.black600};
      display: flex;
      flex-direction: column;
      width: 150px;
    `;

const UserItem = styled.div<{ $isHovered: boolean }>`
      display: block;
      background-color: ${(props) => (props.$isHovered ? props.theme.colors.blue200 : 'transparent')};
      color: ${(props) => props.theme.colors.white200};
      font-size: 16px;
      cursor: pointer;
      padding: 10px;
    `;

const UserDropdown: React.FC = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.data.contents);
    const loading = useAppSelector((state) => state.data.loading);
    const error = useAppSelector((state) => state.data.error);


    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedUser, setUser] = useState<User | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        ( async () => {
            await dispatch(fetchContents());
            buttonRef.current?.focus();
        })();
    }, [dispatch]);

    useEffect(() => {
        if (isDropdownOpen) {
            menuRef.current?.focus();
        } else {
            buttonRef.current?.focus();
        }
    }, [isDropdownOpen]);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
        setUser(null);
    };

    const handleSelectUser = (user: User) => {
        setUser(user);
    }

    // enter key toggles select, up & down arrows for moving by rows
    const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            toggleDropdown();
        } else if (event.key === 'ArrowDown') {
            if(!selectedUser) {
                setUser(users[0]);
            } else {
                const nextIndex = +selectedUser.id + 1;
                const nextUser = users.find(u => u.id === `${nextIndex}`);
                if(nextUser) setUser(nextUser);
            }
        } else if (event.key === 'ArrowUp') {
            if(!selectedUser) {
                setUser(users[users.length - 1]);
            } else {
                const prevIndex = +selectedUser.id - 1;
                const prevUser = users.find(u => u.id === `${prevIndex}`);
                if (prevUser) setUser(prevUser);
            }
        }
    };

    if (loading) {
        return <AlertMessage>Loading...</AlertMessage>
    }

    if (error) {
        return <AlertMessage>Error: {error}</AlertMessage>
    }

    return (
        <DropdownContainer onKeyDown={handleMenuKeyDown}>
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
                >
                    {users.map((user) => (
                        <UserItem
                            key={user.id}
                            className="user-item"
                            onClick={() => handleSelectUser(user)}
                            $isHovered={user === selectedUser}
                        >
                            {user.name}
                        </UserItem>
                    ))}
                </DropdownMenu>
                {selectedUser && <ProfileCard user={selectedUser} />}
                </>
            )}
        </DropdownContainer>
    );
};

export default UserDropdown;
