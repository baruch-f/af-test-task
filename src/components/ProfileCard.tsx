import React from 'react';
import { User } from '../types/mockapi';
import styled from 'styled-components';

const UserCard = styled.div`
      background: ${(props) => props.theme.colors.white200};
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      width: 250px;
      color: ${(props) => props.theme.colors.black200};
      padding: 16px;
      align-items: center;
    `;

const UserPic = styled.img`
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 16px;
    `;

const ProfileCard: React.FC<{ user: User }> = ({ user }) => {

    return (
        <UserCard>
            <UserPic src={user.avatar} />
            <h1>{user.name}</h1>
        </UserCard>
    );
};

export default ProfileCard;
