import React from 'react';
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';

const HomePageBody = styled.div`
      background: ${(props) => props.theme.colors.black100};
      padding: 0 24px;
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

const HomePageBodySection = styled.section`
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      height: 100vh;
      padding: 20px;
      box-sizing: border-box;
      width: 100%;
    `;

const HomePage: React.FC = () => {

    return (
        <HomePageBody>
            <HomePageBodySection>
                <Dropdown />
            </HomePageBodySection>
        </HomePageBody>
    )
}

export default HomePage
