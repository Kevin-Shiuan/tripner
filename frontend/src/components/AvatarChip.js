import { useState } from 'react';
import { Box, Avatar, Skeleton, Chip } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

function AvatarChip({name, handleDelete}) {
    return (
        <Chip
            avatar={<Avatar >{name.charAt(0).toUpperCase()}</Avatar>}
            label={name}
            // color='primary'
            // onClick={}
            onDelete={handleDelete}
            />
    )
  }
  

export default AvatarChip;