import React from 'react';
import { Outlet } from 'react-router';
import { ProductSalesAIAgent } from '../components/ai-agent';

export default function RootLayout() {
  return (
    <>
      <Outlet />
      {/* Global AI Sales & Product Advisor Chatbot */}
      <ProductSalesAIAgent mode="floating" />
    </>
  );
}
