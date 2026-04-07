import { reactive, computed } from 'vue'
import type { Message, MessageType } from '@/types'

export function useMessage() {
  const messages = reactive<Message[]>([])
  const timeoutIds = new Map<string, NodeJS.Timeout>()

  /**
   * Generate unique ID for message
   */
  const generateId = (): string => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Add a message
   */
  const addMessage = (
    text: string,
    type: MessageType = 'info',
    duration: number = 3500
  ): string => {
    const id = generateId()
    const message: Message = {
      id,
      text,
      type,
      duration
    }

    messages.push(message)

    // Auto-clear message if duration is provided
    if (duration && duration > 0) {
      const timeoutId = setTimeout(() => {
        removeMessage(id)
      }, duration)

      timeoutIds.set(id, timeoutId)
    }

    return id
  }

  /**
   * Remove a message by ID
   */
  const removeMessage = (id: string): void => {
    const index = messages.findIndex(msg => msg.id === id)
    if (index > -1) {
      messages.splice(index, 1)
    }

    // Clear timeout if exists
    const timeoutId = timeoutIds.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutIds.delete(id)
    }
  }

  /**
   * Clear all messages
   */
  const clearAll = (): void => {
    // Clear all timeouts
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId))
    timeoutIds.clear()

    // Clear all messages
    messages.splice(0, messages.length)
  }

  /**
   * Show success message
   */
  const success = (text: string, duration: number = 3500): string => {
    return addMessage(text, 'success', duration)
  }

  /**
   * Show error message
   */
  const error = (text: string, duration: number = 5000): string => {
    return addMessage(text, 'error', duration)
  }

  /**
   * Show info message
   */
  const info = (text: string, duration: number = 3500): string => {
    return addMessage(text, 'info', duration)
  }

  /**
   * Show warning message
   */
  const warning = (text: string, duration: number = 4000): string => {
    return addMessage(text, 'warning', duration)
  }

  /**
   * Get message by ID
   */
  const getMessageById = (id: string): Message | undefined => {
    return messages.find(msg => msg.id === id)
  }

  /**
   * Update message text
   */
  const updateMessage = (id: string, text: string): void => {
    const message = getMessageById(id)
    if (message) {
      message.text = text
    }
  }

  /**
   * Computed: message count
   */
  const count = computed(() => messages.length)

  /**
   * Computed: has messages
   */
  const hasMessages = computed(() => messages.length > 0)

  return {
    messages: computed(() => [...messages]),
    count,
    hasMessages,
    addMessage,
    removeMessage,
    clearAll,
    success,
    error,
    info,
    warning,
    getMessageById,
    updateMessage
  }
}