CREATE TABLE Profissao(
    CodProfissao INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	DescProfissao varchar(50) NULL
);


CREATE TABLE Bairro (
    CodBairro INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    NomeBairro VARCHAR(50) NULL,
    CodCidade INT NULL
);


CREATE TABLE Cidade(
	CodCidade INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	NomeCidade varchar(50) NULL,
	Estado varchar(2)
 );

CREATE TABLE Cliente (
    CodCliente INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	Nome varchar(80) NULL,
	Endereco varchar(80) NULL,
	CodCidade INT(6) UNSIGNED NULL,
	CodBairro INT(6) UNSIGNED NULL,
	CEP varchar(10) NULL,
	DataNasc datetime NULL,
	FoneCom VARCHAR(20) NULL,
	FoneRes VARCHAR(20) NULL,
	Celular VARCHAR(20) NULL,
	Email VARCHAR(50) NULL,
	RG VARCHAR(20) NULL,
	CPF VARCHAR(20) NULL,
	Sexo VARCHAR(1) NULL,
	EstadoCivil VARCHAR(10) NULL,
	DataCadastro TIMESTAMP,
	CodProfissao INT(6) UNSIGNED NULL,
	Situacao VARCHAR(10) NULL,
	Obs varchar(250) NULL,
    FOREIGN KEY (CodCidade) REFERENCES Cidade(CodCidade),
    FOREIGN KEY (CodBairro) REFERENCES Bairro(CodBairro),
    FOREIGN KEY (CodProfissao) REFERENCES Profissao(CodProfissao)
 );
 
 