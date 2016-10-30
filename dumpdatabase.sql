CREATE DATABASE  IF NOT EXISTS `cadastro-cliente` 
USE `cadastro-cliente`;

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `rg` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nascimento` datetime DEFAULT NULL,
  PRIMARY KEY (`codigo`)
);

INSERT INTO `cliente` VALUES (1,'CLIENTE 1','99999999999','99.999.999-5','cliente1@testes.com.br',NULL,NULL),(2,'CLIENTE 2','99999999999','99.999.999-5','cliente2@testes.com.br',NULL,NULL),(3,'CLIENTE 3','99999999999','99.999.999-5','cliente3@testes.com.br',NULL,NULL),(4,'CLIENTE 4','99999999999','99.999.999-5','cliente4@testes.com.br',NULL,NULL),(5,'CLIENTE 5','99999999999','99.999.999-5','cliente5@testes.com.br',NULL,NULL),(53,'Jean Coppieters Souza','39140937810','387724655','jean.coppieters@hotmail.com',NULL,NULL);

DROP TABLE IF EXISTS `cliente_telefone`;
CREATE TABLE `cliente_telefone` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `ddd` varchar(3) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `cliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
);
ALTER TABLE `cliente_telefone` ADD CONSTRAINT `fk_cliente_telefone_cliente`
  FOREIGN KEY (`cliente`)
  REFERENCES `cliente` (`codigo`)


DROP TABLE IF EXISTS `usuario_permissao`;
CREATE TABLE `usuario_permissao` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
);

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) DEFAULT NULL,
  `senha` varchar(1024) DEFAULT NULL,
  `permissao` int(11) NOT NULL,
  PRIMARY KEY (`codigo`)
);
ALTER TABLE `usuario` 
ADD CONSTRAINT `fk_usuario_usuario_permissao`
  FOREIGN KEY (`permissao`)
  REFERENCES  `usuario_permissao` (`codigo`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION

DROP TABLE IF EXISTS `usuario_cliente`;
CREATE TABLE `usuario_cliente` (
  `codigo` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `cliente` int(11) NOT NULL,
  PRIMARY KEY (`codigo`,`usuario`,`cliente`),
  KEY `FK_USUARIO_CLIENTE_USUARIO_idx` (`usuario`),
  KEY `FK_USUARIO_CLIENTE_CLIENTE_idx` (`cliente`)
);

ALTER TABLE `usuario` 
ADD CONSTRAINT `fk_usuario_usuario_permissao`
  FOREIGN KEY (`permissao`)
  REFERENCES  `usuario_permissao` (`codigo`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
