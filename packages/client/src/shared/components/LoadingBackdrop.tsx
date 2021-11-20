import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

type LoadingBackdropProps = {
  isOpen: boolean
  onClick?: () => void
}

export const LoadingBackdrop = ({ isOpen, onClick }: LoadingBackdropProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen)

  const handleClick = () => {
    setInternalIsOpen(false)
    onClick?.()
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={internalIsOpen}
        onClick={handleClick}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
