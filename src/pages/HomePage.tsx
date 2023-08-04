import React, { useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/reducers/store';
import ProfileCard from '../components/ProfileCard';
import { fetchContents } from '../store/actions/data';

const AlertMessage = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.white100};
`;

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
    const users = useAppSelector((state) => state.data.contents);
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.data.loading);
    const error = useAppSelector((state) => state.data.error);

    useEffect(() => {
        ( async () => {
            await dispatch(fetchContents());
        })();
    }, [dispatch]);

    if (error) {
        return <AlertMessage>Error: {error}</AlertMessage>
    }

    if (loading) {
        return <AlertMessage>Loading...</AlertMessage>
    }

    return (
        <HomePageBody>
            <HomePageBodySection>
                <Dropdown
                    listOfData={users.map(u => ({...u, title: u.name}))}
                    displayData={(data) => (<ProfileCard user={data} />)}
                />
            </HomePageBodySection>
        </HomePageBody>
    )
}

export default HomePage
