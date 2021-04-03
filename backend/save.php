<?php
	include("../backend/conexao.php");
	
    $data = json_decode($_POST["data"], false);

	$id_tasktype = intval($data->{'id_tasktype'});
	$id_user = intval($data->{'id_user'});
	$date_task = utf8_decode($data->{'date_task'});
	$time_task = utf8_decode($data->{'time_task'});
	
	$sqlInsert = "INSERT INTO historic(id_tasktype, id_user, date_task, time_task) VALUES('$id_tasktype', '$id_user', '$date_task', '$time_task')";
	$resultInsert = $mysqli->query($sqlInsert);
	
	$sqlSelect = "SELECT * FROM historic ORDER BY id DESC LIMIT 1";
	$result = $mysqli->query($sqlSelect);

	$arrayHistoric = array();
	while($dado = mysqli_fetch_array($result)){

		$agrega = array(
			'id' => intval($dado['id']),
			'id_tasktype' => floatval($dado['id_tasktype']),
			'id_user' => floatval($dado['id_user']),
			'date_task' => utf8_encode($dado['date_task']),
			'time_task' => utf8_encode($dado['time_task']),
		);

		array_push($arrayHistoric, $agrega);

	};

	echo json_encode($arrayHistoric);