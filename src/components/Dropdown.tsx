import React, { useState, useRef, useEffect, useContext  } from 'react';
import { MoreIcon } from './Icon';
import styled, { ThemeContext } from 'styled-components'

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
  height: 300px;
  overflow: auto;
`;

const UserItem = styled.div<{ $isHovered: boolean }>`
  display: block;
  background-color: ${(props) => (props.$isHovered ? props.theme.colors.blue200 : 'transparent')};
  color: ${(props) => props.theme.colors.white200};
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
`;

interface IItem {
    id: string;
    title: string;
}

interface IUserDropdownProps<T> {
    listOfData: T[];
    displayData: (data: T) => React.ReactNode;
}

const UserDropdown = <T extends IItem>({displayData, listOfData}: IUserDropdownProps<T>) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedUser, setUser] = useState<T | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        buttonRef.current?.focus();
    }, []);

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

    const handleSelectUser = (user: T) => {
        setUser(user);
    }

    // enter key toggles select, up & down arrows for moving by rows
    const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            toggleDropdown();
        } else if (event.key === 'ArrowDown') {
            if(!selectedUser) {
                setUser(listOfData[0]);
            } else {
                const nextIndex = +selectedUser.id + 1;
                const nextUser = listOfData.find(u => u.id === `${nextIndex}`);
                if(nextUser) {
                    setUser(nextUser);
                    itemsRef.current[+nextUser.id].scrollIntoView();
                }
            }
        } else if (event.key === 'ArrowUp') {
            if(!selectedUser) {
                setUser(listOfData[listOfData.length - 1]);
            } else {
                const prevIndex = +selectedUser.id - 1;
                const prevUser = listOfData.find(u => u.id === `${prevIndex}`);
                if (prevUser) {
                    setUser(prevUser);
                    itemsRef.current[+prevUser.id].scrollIntoView();
                }
            }
        }
    };

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
                        {listOfData.map((user) => (
                            <UserItem
                                key={user.id}
                                className="user-item"
                                onClick={() => handleSelectUser(user)}
                                ref={(el)=> {itemsRef.current[+user.id] = el!}}
                                $isHovered={user === selectedUser}
                            >
                                {user.title}
                            </UserItem>
                        ))}
                    </DropdownMenu>
                    {selectedUser && displayData(selectedUser)}
                </>
            )}
        </DropdownContainer>
    );
};

export default UserDropdown;
