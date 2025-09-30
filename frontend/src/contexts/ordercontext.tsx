'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface OrderContextType {
  showCreateOrder: (type: 'buy' | 'sell') => void
  hideCreateOrder: () => void
  isVisible: boolean
  orderType: 'buy' | 'sell'
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy')

  const showCreateOrder = (type: 'buy' | 'sell') => {
    setOrderType(type)
    setIsVisible(true)
  }

  const hideCreateOrder = () => setIsVisible(false)

  return (
    <OrderContext.Provider value={{ 
      showCreateOrder, 
      hideCreateOrder, 
      isVisible, 
      orderType 
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider')
  }
  return context
}