import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { Box } from "@mui/system"
import { useState, useEffect } from "react"
import { GET_MESSAGES } from "../../home/queries/MessagesQuery"
import { MESSAGES_SUBSCRIPTION } from "../../home/subscriptions/MessagesSubscriptions"
import { MessageModel } from "../interfaces/messageModel"
import { CREATE_MESSAGE } from "../mutations/CreateMessage"
import { MessageCard } from "./MessageCard"

export const MessagesList = () => {
    const { data: messagesData, loading: loadingMessages } = useQuery<{ messages: MessageModel[] }>(GET_MESSAGES)

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

    if (loadingMessages) return <h1>Loading messages</h1>

    return (
      <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        {messages?.map(message => (<MessageCard message={message} key={message.id} />))}
      </Box>
  )
}
