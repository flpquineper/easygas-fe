# 🚀 EasyGas - Aplicativo do Cliente

Este é o front-end do cliente para o projeto EasyGas, a plataforma de delivery de gás e água. Esta aplicação permite que os clientes naveguem pelos produtos, criem uma conta, gerenciem seus carrinhos e finalizem pedidos.

## 💻 Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna focada em performance e escalabilidade:

* **Next.js:** Framework React para renderização no servidor (SSR) e geração de sites estáticos (SSG).
* **TypeScript:** Para garantir um código mais seguro, tipado e de fácil manutenção.
* **Axios:** Cliente HTTP para realizar a comunicação com a nossa API back-end (`easygas-api`).
* **React Toastify:** Para exibir notificações e feedbacks ao usuário.
* **Autenticação:** O sistema utiliza **Cookies httpOnly** para o gerenciamento seguro de sessões de usuário, garantindo que os tokens JWT não fiquem expostos no navegador.

## ⚙️ Arquitetura

Este projeto (`easygas-fe`) é um dos três repositórios que compõem a plataforma EasyGas. Ele consome a API central (`easygas-api-be`) para todas as operações.

* **Front-end (Cliente):** `https://easygas.onrender.com`
* **Back-end (API):** `https://easygas-api-ohsz.onrender.com`

---

## 🧪 Como Testar o Software (Avaliação)

Para avaliar a aplicação do cliente, o fluxo recomendado envolve a criação de uma nova conta de usuário.

### 1. URL de Acesso

A aplicação está hospedada e disponível no Render:

* **URL:** **`https://easygas.onrender.com`**

### 2. Credenciais de Teste

E-mail: mano@brown.com
Senha: !Teste123

### 3. Fluxos de Teste Recomendados

1.  Acesse a URL e clique em "Login" 
2.  Preencha o formulário com dados fictícios.
3.  Após o registro, você será logado e redirecionado.
4.  Navegue pela loja e adicione produtos ao carrinho (ex: Gás 45kg, Água 20L).
5.  Acesse o menu (ícone no canto superior direito) e clique em **"Perfil"**.
    * *Verificação:* A página deve carregar seus dados, confirmando que a sessão (`httpOnly cookie`) está persistindo corretamente.
6.  Acesse **"Meus Pedidos"** para ver o histórico (estará vazio se for um novo usuário).
7.  Clique no ícone do carrinho para prosseguir com o fluxo de checkout.
8.  Ao final, clique no menu e em **"Sair da conta"** para testar o fluxo de logout, que limpa o cookie de autenticação.
