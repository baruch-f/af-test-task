import React, { useContext } from 'react'
import Dropdown from '../components/Dropdown'
import { ThemeContext } from 'styled-components'

const HomePage: React.FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <div style={
            {
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: theme?.colors.black200,
                textAlign: 'center',
                height: '100vh'
            }
        }>
            <h1 style={{ fontSize: '2em', color: theme?.colors.white200 }}>The team</h1>
            <Dropdown style={{    width: '200px', height: '100%', textAlign: 'left'}} />
        </div>
    )
}

export default HomePage
