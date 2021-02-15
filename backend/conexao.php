<?php
	$servidor = "localhost";
	$usuario = "root";
	$senha = "";
	$banconome = "stopwatch";
	
	//Criar a conexao
	$mysqli = new MySQLi($servidor, $usuario, $senha, $banconome);
	
	if($mysqli->connect_errno)
		echo "Falha na conexão: (" .$conexao->connect_errno.") " .$conexao->connect_error;
				
?>