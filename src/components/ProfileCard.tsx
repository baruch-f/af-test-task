import React from 'react'
import { User } from '../types/mockapi'
import styled from 'styled-components'

const ProfileCard: React.FC<{ user: User }> = ({ user }) => {
    const UserCard = styled.div`
      background: ${(props) => props.theme.colors.white100};
      border: 1px solid ${(props) => props.theme.colors.black100};
      width: 100%;
      padding: 12px;
    `;

    const UserPic = styled.img`
      width: 100px;
    `;

    return (
        <UserCard>
            <h2>{user.name}</h2>
            <UserPic src={user.avatar} />
        </UserCard>
    );
};

export default ProfileCard;
