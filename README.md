# 🛒 Selecta App  

Aplicativo mobile desenvolvido para a empresa **LoopStack**, como parte de um **projeto de TCC**.  
O Selecta é uma **loja virtual**, semelhante ao Mercado Livre, que tem como objetivo oferecer uma experiência moderna de compra e venda de produtos. 

---

## 🚀 Tecnologias  

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Expo](https://expo.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [React Navigation](https://reactnavigation.org/)

--- 

## 🧱 Estrutura
```
src/
 ├── components/   # Componentes reutilizáveis (botões, inputs, headers, etc.)
 ├── context/      # Contextos globais (auth, tema, configurações)
 ├── hook/         # Hooks customizados (useAuth, useFetch, etc.)
 ├── navigation/   # Rotas e configurações do React Navigation
 ├── screens/      # Telas principais do aplicativo
 ├── services/     # Comunicação com APIs e backend
 ├── styles/       # Estilos globais e temas (cores, tipografia)
 ├── types/        # Tipos e interfaces TypeScript
 └── utils/        # Funções auxiliares e utilitárias
```

---

## ⚙️ Instalação e Execução

1. Clone o repositório:
```
git clone https://github.com/matheustorsani/SelectaApp.git
cd SelectaApp
```

2. Instale as dependências:


```
npm install
```

3. Execute o projeto com Expo:


```
npm run start
```
4. Escaneie o QR Code no seu dispositivo usando o aplicativo Expo Go para visualizar.
_Ou, utilize um emulador android (O aplicativo não está 100% otimizado para dispositivos iOS) Baixe o emulador em [Android Studio](https://developer.android.com/studio?hl=pt-br)._

5. Gere a documentação usando: 


```
npm run docs
```
---

## 📌 Observações

Projeto em desenvolvimento acadêmico, feito como Trabalho de Conclusão de Curso (TCC) para a empresa fictícia LoopStack.

## 🛠️ Colaboração
```
git pull
# antes de começar a editar

git checkout -b nome-da-sua-feature
# cria sua branch

git commit -m "feat: adiciona nova tela de cadastro"
git push origin nome-da-sua-feature
```