import { Box, Stack, TextareaAutosize } from "@mui/material"
import { MessagesList } from "../../messages/components/MessagesList"
import { NewMessageBox } from "../../messages/components/NewMessageBox"

export const HomePage = () => {

    return (
        <Box>
          <MessagesList />

          <NewMessageBox />
        </Box>
    )
}
