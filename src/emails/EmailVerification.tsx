import { 
  Html, 
  Button, 
  Text, 
  Head, 
  Preview, 
  Body, 
  Container, 
  Section, 
  Heading, 
  Hr,
  Img
} from '@react-email/components';
import * as React from 'react';

export const EmailVerificationTemplate = ({ name, token }: { name: string; token: string }) => {
  const url = `http://localhost:3000/auth/verify-email?token=${token}`; 

  return (
    <Html>
      <Head />
      <Preview>Confirme seu e-mail para começar a avaliar filmes!</Preview>
      <Body style={main}>
        <Container style={container}>
          
          <Section style={headerSection}>
            <Img
              src="https://i.imgur.com/EDj4ENP.png"
              width="150"
              height="auto"
              alt="TopFlop Logo"
              style={logo}
            />
          </Section>

          <Hr style={divider} />

          <Section style={contentSection}>
            <Heading style={heading}>Falta pouco, {name || 'Cineasta'}!</Heading>
            
            <Text style={text}>
              Obrigado por se cadastrar no <strong>TopFlop</strong>. Para ativar a sua conta e liberar o seu acesso à nossa comunidade de cinema, basta confirmar o seu endereço de e-mail clicando no botão abaixo:
            </Text>

            <Section style={buttonContainer}>
              <Button href={url} style={button}>
                Confirmar E-mail
              </Button>
            </Section>

            <Text style={subtext}>
              Se tiver problemas com o botão, copie e cole este link no seu navegador: 
              <br />
              <a href={url} style={link}>{url}</a>
            </Text>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footerText}>
              Se você não solicitou este cadastro, pode ignorar este e-mail com segurança.
              <br />
              © {new Date().getFullYear()} TopFlop. Todos os direitos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#e8ebeb',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: '0 auto',
  padding: '40px 10px',
};

const container = {
  backgroundColor: '#1c3c88',
  borderRadius: '12px',
  margin: '0 auto',
  maxWidth: '560px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

const headerSection = {
  backgroundColor: '#152d66',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  padding: '36px 32px 32px 32px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const divider = {
  borderColor: '#8c9cc4',
  opacity: 0.35,
  margin: '0',
};

const contentSection = {
  padding: '40px 40px 32px 40px',
};

const heading = {
  color: '#e8ebeb',
  fontSize: '24px',
  fontWeight: '700',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const text = {
  color: '#e8ebeb',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 18px 0',
  opacity: 0.95,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0 24px 0',
};

const button = {
  backgroundColor: '#2bab44',
  borderRadius: '6px',
  color: '#e8ebeb', 
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  lineHeight: '100%',
};

const subtext = {
  color: '#8c9cc4',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '24px 0 0 0',
  textAlign: 'center' as const,
};

const link = {
  color: '#2bab44',
  textDecoration: 'underline',
};

const footerSection = {
  padding: '32px',
  textAlign: 'center' as const,
  backgroundColor: '#152d66',
};

const footerText = {
  color: '#8c9cc4',
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '0',
};