# React Native Project-EN

This project is a mobile application developed in **React Native** for an engineering company, aiming to optimize the management of construction projects, teams, and schedules.
## Project Structure

The code architecture is designed to facilitate maintenance and expansion, with modules and folders that separate the application's functionalities:

- **/components**: Contains all reusable components, such as registration forms, modals, and calendar items.
- **/database**: Includes providers and hooks for interactions with the local database, where information is managed.
- **/paginas**: Contains the application's screens, such as `Home`, `Login`, `Construction`, and `Employees`. Each screen is represented by a specific JS file.
- **/utils**: Contains helper functions for data manipulation, such as API calls for location.
- **/tests**: Includes automated tests that verify the correct rendering of the application's main screens.

## Pre requisites

Before starting the project, ensure the following requirements are met:

- **Node.js** and **npm** installed.
- **Expo CLI** installed globally
- **Attention** install all dependencies from package.json

  ```bash
  npm install -g expo-cli
  ```

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   ```

2. Navigate to the project folder:

   ```bash
   cd <FOLDER_NAME>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the project:

   ```bash
   expo start
   ```

This command will open **Expo Developer Tools**, allowing you to run the application on an emulator or connected physical device.

## Testing Framework

The project uses **Jest** and **React Native Testing Library** to ensure the main screens are rendered correctly. The tests are located in the `/tests` folder. Each file in this folder verifies a specific screen:

- `Home.test.js`: Tests the Home screen.
- `Workers.test.js`: Tests the Workers screen.

### Running the Tests

1. Ensure all dependencies are installed.

2. Run the following command to start the automated tests:

   ```bash
   npm test
   ```

The command will provide immediate feedback on any rendering issues on the main screens.

# Projeto React Native-PT/BR

Este projeto é um aplicativo mobile desenvolvido em **React Native**, para uma empresa de engenharia, com o objetivo de otimizar a gestão de obras, equipes e cronogramas.

## Estrutura do Projeto

A arquitetura do código foi desenhada para facilitar a manutenção e expansão, com módulos e pastas que segregam as funções do aplicativo:

- **/components**: Contém todos os componentes reutilizáveis, como formulários de cadastro, modais e itens de calendário.
- **/database**: Inclui provedores e hooks para interações com o banco de dados local, onde as informações são gerenciadas.
- **/paginas**: Contém as telas do aplicativo, como `Home`, `Login`, `Obras` e `Funcionários`. Cada tela é representada por um arquivo JS específico.
- **/utils**: Contém funções auxiliares para manipulação de dados, como chamadas de API para localização.
- **/tests**: Inclui os testes automatizados que verificam a renderização correta das telas principais do aplicativo.

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de que os seguintes requisitos estejam atendidos:

- **Node.js** e **npm** instalados.
- **Expo CLI** instalado globalmente
- **atenção** instale todas as dependencias do package.json

  ```bash
  npm install -g expo-cli
  ```

## Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd <NOME_DA_PASTA>
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o projeto:

   ```bash
   expo start
   ```

Este comando abrirá o **Expo Developer Tools**, permitindo que você execute o aplicativo em um emulador ou dispositivo físico conectado.

## Estrutura de Testes

O projeto utiliza o **Jest** e a **React Native Testing Library** para garantir que as telas principais sejam renderizadas corretamente. Os testes estão localizados na pasta `/tests`. Cada arquivo nesta pasta verifica uma tela específica:

- `Home.test.js`: Testa a tela Home.
- `Workers.test.js`: Testa a tela de Funcionários (Workers).

### Executando os Testes

1. Certifique-se de que todas as dependências estão instaladas.

2. Execute o seguinte comando para iniciar os testes automatizados:

   ```bash
   npm test
   ```

O comando fornecerá feedback imediato sobre eventuais problemas de renderização nas telas principais.
