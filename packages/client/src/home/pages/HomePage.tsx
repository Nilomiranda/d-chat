import { useMutation, useQuery, useSubscription } from "@apollo/client"
import LoadingButton from "@mui/lab/LoadingButton"
import { Box, Stack, TextareaAutosize } from "@mui/material"
import { useEffect, useState } from "react"
import { MessageCard } from "../../messages/components/MessageCard"
import { MessageModel } from "../../messages/interfaces/messageModel"
import { CREATE_MESSAGE } from "../../messages/mutations/CreateMessage"
import { GET_MESSAGES } from "../queries/MessagesQuery"
import { MESSAGES_SUBSCRIPTION } from "../subscriptions/MessagesSubscriptions"

export const HomePage = () => {
    const { data: messagesData, loading: loadingMessages } = useQuery<{ messages: MessageModel[] }>(GET_MESSAGES)

    const [sendNewMessage] = useMutation(CREATE_MESSAGE)
    const { data: createdMessageData } = useSubscription(MESSAGES_SUBSCRIPTION)

    const { messages: loadedMessages = [] } = messagesData ?? {}

    const [messages, setMessages] = useState<MessageModel[]>([])

    const { messageCreated } = createdMessageData ?? {}

    useEffect(() => {
      setMessages([...loadedMessages])
    }, [loadedMessages])

    useEffect(() => {
      setMessages(previousMessages => [...previousMessages, messageCreated])
    }, [messageCreated])


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

    if (loadingMessages) return <h1>Loading messages</h1>

    return (
        <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          {messages?.map(message => (<MessageCard message={message} />))}

          <Stack component="form" onSubmit={handleNewMessageSubmit}>
            <TextareaAutosize
              aria-label="Write your message"
              placeholder="What do you want to say?"
              name="messageContent"
              style={{ width: 200 }}
            />
            <LoadingButton type="submit">Send message</LoadingButton>
          </Stack>
        </Box>
    )
}
