# Recuperação de Senha

  **Requesitos Funcionais**

  - O usuário deve poder recuperar sua senha informando o seu e-mail;
  - O usuário deve receber um e-mail com instruções de recuperação de senha;
  - O usuário deve poder resetar sua senha;

  **Requesitos Não Funcionais**

  - Utilizar Mailtrap para testar envios em ambiente de dev;
  - Utilizar o Amazon SES para envios em produção;
  - O envio de e-mails deve acontecer em segundo plano (background job)

  **Regras de Negócio**

  - O link enviado por email para resetar a senha, deve expirar em 2h;
  - O usuário precisa confirmar a nova senha ao resetar a senha;


# Atualização do perfil

  **Requesitos Funcionais**

  - O usuário deve poder atualizar seu nome, email e senha;

  **Regras de Negócio**

  - O usuário não pode alterar seu email para um email já utilizado;
  - Para atualizar sua senha, o usuário deve informar a senha antiga;
  - Para atualizar sua senha, o usuário deve confirmar a senha;

# Painel do prestador

  **Requesitos Funcionais**

  - O usuário deve poder listar seus agendamentos de um dia específico;
  - O prestador deve receber uma notificação sempre que houver um novo agendamento;
  - O prestador deve poder visualizar as notificações não lidas;

  **Requesitos Não Funcionais**

  - Os agendamentos do prestador no dia devem ser armazenados em cache;
  - As notificações do prestador devem ser armazenadas no mongoDB;
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

  **Regras de Negócio**

  - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de servicos

  **Requesitos Funcionais**

  - O usuário deve poder recuperar sua senha informando o seu e-mail;
  - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
  - O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
  - O usuário deve poder realizar um novo agendamento com um prestador;

  **Requesitos Não Funcionais**

  - A listagem de prestadores deve ser armazenada em cache;

  **Regras de Negócio**

  - Cada agendamento deve durar 1h exatamente;
  - Os agendamentos devem estar disponíveis entre 8h ás 18h ( Primeiro às 8h, último ás 17h);
  - O usuário não pode agendar em um horário já ocupado;
  - O usuário não pode agendar em um horário que já passou;
  - O usuário não pode agendar um horário consigo mesmo;
