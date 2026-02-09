'use client'

import React from 'react'
import './ContainerCard.css'

interface ContainerCardProps {
  children: React.ReactNode
  className?: string
}

const ContainerCard: React.FC<ContainerCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`containerCard ${className}`}>
      {children}
    </div>
  )
}

export default ContainerCard
