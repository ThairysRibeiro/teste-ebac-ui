/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

   beforeEach(() => {
      cy.visit('minha-conta/')
   });

   afterEach(() => {
      cy.screenshot()
   });
 
   it('Deve fazer login com sucesso', () => {
      
      cy.get('#username').type('thairys.teste@teste.com')
      cy.get('#password').type('teste@123')
      cy.get('.woocommerce-form > .button') .click()
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, thairys.teste (não é thairys.teste? Sair)')

   })

it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
  
   cy.get('#username').type('gustavo.teste@teste.com')
   cy.get('#password').type('teste@123')
   cy.get('.woocommerce-form > .button') .click() 

   cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
   cy.get('.woocommerce-error').should('exist')
});

it('Deve exibir uma mensagem de rro ao inserir uma senha inválida', () => {
   
   cy.get('#username').type('thairys.teste@teste.com')
   cy.get('#password').type('test123')
   cy.get('.woocommerce-form > .button') .click()

   cy.get('.woocommerce-error').should('contain','Erro: A senha fornecida para o e-mail thairys.teste@teste.com está incorreta. Perdeu a senha?')
   cy.get('.woocommerce-error').should('exist')
});


it('Deve fazer login com sucesso - Usando massa de dados', () => {
      cy.get('#username').type(perfil.usuario)
      cy.get('#password').type(perfil.senha)
      cy.get('.woocommerce-form > .button') .click()
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, thairys.teste (não é thairys.teste? Sair)')

})

it.only('Deve fazer login com sucesso - Usando Fixture', () => {
      cy.fixture('perfil').then( dados => {
         cy.get('#username').type(dados.usuario , {log: false})
         cy.get('#password').type(dados.senha , {log: false})
         cy.get('.woocommerce-form > .button') .click()
         cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, thairys.teste (não é thairys.teste? Sair)')
      
      })
})

}) 