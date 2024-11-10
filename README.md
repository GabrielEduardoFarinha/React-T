
Descrição do Projeto
Este projeto é um aplicativo desenvolvido em React Native que utiliza uma estrutura modular com componentes, banco de dados e várias telas para gerenciar e visualizar informações de funcionários, obras, documentos e outras funcionalidades.

Estrutura do Projeto
Componentes (/components): Contém componentes reutilizáveis, como formulários de cadastro, modais e itens de calendário.
Banco de Dados (/database): Inclui provedores e hooks para interações com o banco de dados local.
Páginas (/paginas): Cada arquivo JS representa uma tela específica do aplicativo, como Home, Login, Obras e Funcionários.
Utils (/utils): Funções auxiliares para lidar com dados, como APIs de localização.
Pré-requisitos
Node.js e npm instalados.
Expo CLI (npm install -g expo-cli) para desenvolvimento com Expo.
Instale dependências com:
----npm install
Scripts Principais
Iniciar Projeto:
----expo start
Testar Componentes:
-----npm test
Estrutura de Testes
Os testes estão localizados na pasta __tests__, com arquivos específicos para cada tela testada:

Home.test.js: Testa se a tela Home é renderizada corretamente.
Workers.test.js: Testa se a tela Workers é renderizada corretamente.
Como Executar os Testes
Certifique-se de que todas as dependências estão instaladas, então execute:
----npm test

