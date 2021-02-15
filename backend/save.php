<?php
	include("../backend/conexao.php");	
	
    $data = json_decode($_POST["data"], false);

	$id_type = intval($data->{'id_type'});
	$task_date = doubleval($data->{'task_date'});
	$task_time = floatval($data->{'task_time'});
	
	$sqlInsert = "INSERT INTO history(id_type, task_date, task_time) VALUES('$id_type', '$task_date', '$task_time')";
	$resultInsert = $mysqli->query($sqlInsert);
	
	// $sqlSelect = "SELECT * FROM metragens ORDER BY id DESC LIMIT 1";
	// $result = $mysqli->query($sqlSelect);
	
	// foreach($data as $id){
		
	// }

	// $sqlSelect = "DELETE FROM referencias WHERE id = '$id'";
	// $result = $mysqli->query($sqlSelect);
	
	// //limpar o id
	// $sqlSelectAutoIncrement = "ALTER TABLE referencias AUTO_INCREMENT = 1";
	// $resultAutoIncrement = $mysqli->query($sqlSelectAutoIncrement);
	
	// echo json_encode($result);
	echo json_encode($task_date);
	// echo json_encode($data->{'type_id'});