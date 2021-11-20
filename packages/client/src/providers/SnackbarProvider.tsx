import { createContext, useContext, useState } from "react"
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export type SnackbarType = 'error' | 'warning' | 'info' | 'success'

export interface ToastConfig {
  message: string
  kind?: SnackbarType
  // duration in milliseconds
  duration?: number
}

interface ToastData {
  visible: boolean
  message: string
  duration?: number
  kind?: SnackbarType
}

export const ToastContext = createContext({
  show: (toastConfig: ToastConfig) => toastConfig,
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData>({
    visible: false,
    message: '',
  })

  const show = (config: ToastConfig) => {
    setToastData({
      visible: true,
      message: config?.message || '',
      duration: config?.duration || 5000,
      kind: config?.kind || 'info',
    })
    return config
  }

  const handleSnackBarDismissed = () => {
    setToastData({
      visible: false,
      message: '',
      duration: 5000,
    })
  }

  return (
    <ToastContext.Provider value={{ show }}>
      <>
        {children}
        <Snackbar
          open={toastData?.visible}
          onClose={handleSnackBarDismissed}
          autoHideDuration={toastData?.duration}
          anchorOrigin={{
              horizontal: 'center',
              vertical: 'bottom'
          }}
        >
            <Alert severity={toastData.kind}>{toastData.message}</Alert>
        </Snackbar>
      </>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
}
