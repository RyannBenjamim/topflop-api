import { Html, Button, Text, Head, Preview, Body, Container } from '@react-email/components';
import * as React from 'react';

export const PasswordResetTemplate = ({ name, token }: { name: string; token: string }) => {
  const url = `http://localhost:3000/auth/reset-password?token=${token}`;
  return (
    <Html>
      <Head />
      <Preview>Recuperação de senha solicitada</Preview>
      <Body style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <Container>
          <Text>Olá, {name}!</Text>
          <Text>Recebemos um pedido para redefinir a senha da sua conta.</Text>
          <Text>Se foi você, clique no botão abaixo para escolher uma nova senha. Este link expira em breve.</Text>
          <Button href={url} style={{ backgroundColor: '#333', color: '#fff', padding: '12px 20px', borderRadius: '4px' }}>
            Redefinir Senha
          </Button>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
            Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};