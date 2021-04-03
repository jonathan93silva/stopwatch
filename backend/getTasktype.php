<?php
	include("../backend/conexao.php");

	$arrayTasktype = array();

	$sqlSelect = "select * from tasktype";
	$result = $mysqli->query($sqlSelect);
	
	while($dado = mysqli_fetch_array($result)){

		$agrega = array(
			'id' => intval($dado['id']),
			'description' =>  utf8_encode($dado['description']),
			'comments' =>  utf8_encode($dado['comments']),
		);

		array_push($arrayTasktype, $agrega);

	};

	echo json_encode($arrayTasktype);

 ?>