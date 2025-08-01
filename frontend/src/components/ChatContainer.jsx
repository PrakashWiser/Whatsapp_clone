import { useEffect, useRef } from 'react'
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
import MessageSkeleton from "../common/Skeleton/MessageSkeleton"
const ChatContainer = () => {

  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
  const messageEndRef = useRef(null);
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id)
    subscribeToMessages()
    return () => unsubscribeFromMessages()
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  }
  return (
    <div className='flex-1  flex flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages?.map((item) => (
          <div key={item?._id} className={`chat ${item?.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={
                  item?.senderId === authUser?._id
                    ? authUser?.profilePic || "/avatar.png"
                    : selectedUser?.profilePic || "/avatar.png"
                } alt="Profile-pic" />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time className='text-sm opacity-50 ml-1'>
                {formatMessageTime(item?.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col '>
              {item?.image && (
                <img src={item?.image}
                  alt="Attachment"
                  className='sm:max-w-[200px] rounded-md  mb-2' />
              )}
              {item?.text && <p>{item?.text}</p>}
            </div>
          </div>
        ))}

      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer