import { useMutation } from "@apollo/client"
import { TextareaAutosize } from "@mui/core"
import { LoadingButton } from "@mui/lab"
import { Stack } from "@mui/material"
import { CREATE_MESSAGE } from "../mutations/CreateMessage"

export const NewMessageBox = () => {
  const [sendNewMessage] = useMutation(CREATE_MESSAGE)

    const handleNewMessageSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const messageContent = data.get('messageContent')

      try {
        await sendNewMessage({
          variables: {
            content: messageContent
          }
        })
      } catch (err) {
        console.error(err)
      }
    }

  return (
    <Stack component="form" onSubmit={handleNewMessageSubmit}>
      <TextareaAutosize
        aria-label="Write your message"
        placeholder="What do you want to say?"
        name="messageContent"
        style={{ width: 200 }}
      />
      <LoadingButton type="submit">Send message</LoadingButton>
    </Stack>
  )
}
