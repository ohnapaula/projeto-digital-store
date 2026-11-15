import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import DemoPage from './pages/DemoPage';

export const AppContent: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<DemoPage title="Página Inicial" description="Bem-vindo à Drip Store!" />}
        />
        <Route
          path="/products"
          element={<DemoPage title="Listagem de Produtos" description="Catálogo completo de calçados e acessórios." />}
        />
        <Route
          path="/produtos"
          element={<Navigate to="/products" replace />}
        />
        <Route
          path="/product/:id"
          element={<DemoPage title="Visualização do Produto" description="Detalhes e opções de compra." />}
        />
        <Route
          path="/categorias"
          element={<DemoPage title="Categorias" description="Explore todas as categorias de calçados, camisetas e bonés." />}
        />
        <Route
          path="/meus-pedidos"
          element={<DemoPage title="Meus Pedidos" description="Acompanhe o status e histórico de pedidos demonstrativos." />}
        />
        <Route
          path="/cadastro"
          element={<DemoPage title="Cadastro" description="Fluxo de criação de conta demonstrativo." />}
        />
        <Route
          path="/login"
          element={<DemoPage title="Entrar" description="Fluxo de login de usuário demonstrativo." />}
        />
        <Route
          path="*"
          element={<DemoPage title="Página não encontrada (404)" description="A página solicitada não existe." />}
        />
      </Routes>
    </Layout>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
