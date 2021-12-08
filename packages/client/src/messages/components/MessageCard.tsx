import { Paper, Stack, Typography } from "@mui/material"
import { MessageModel } from "../interfaces/messageModel"

type MessageCardProps = {
  message: MessageModel
}

export const MessageCard = ({ message }: MessageCardProps) => {
  return (
    <Stack spacing={2}>
      <strong>{message.user.name}</strong>
      <Paper elevation={3}>
        <small>{message.content}</small>
      </Paper>
    </Stack>
  )
}
