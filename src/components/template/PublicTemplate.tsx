import React from 'react'
import Box from '@mui/material/Box';


interface Props {
    children: JSX.Element | JSX.Element[];
  }
export const PublicTemplate = ({children}: Props) => {
  return (
    <>
        <Box>
            {children}
        </Box>
    </>
  )
}
