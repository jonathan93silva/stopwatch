<?php
	include("../backend/conexao.php");

	$arrayHistoric = array();

	$sqlSelect = "select * from historic";
	$result = $mysqli->query($sqlSelect);
	
	while($dado = mysqli_fetch_array($result)){

		$agrega = array(
			'id' => intval($dado['id']),
			'id_tasktype' =>  floatval($dado['id_tasktype']),
			'id_user' =>  floatval($dado['id_user']),
			'date_task' =>  utf8_encode($dado['date_task']),
			'time_task' =>  utf8_encode($dado['time_task']),
		);

		array_push($arrayHistoric, $agrega);

	};

	echo json_encode($arrayHistoric);

 ?>