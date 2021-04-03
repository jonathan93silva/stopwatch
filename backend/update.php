<?php
	include("../backend/conexao.php");
	
    $data = json_decode($_POST["data"], false);

	$id = intval($data->{'id'});
	$time_task = utf8_decode($data->{'time_task'});
	
	$sqlUpdate = "UPDATE historic SET time_task = '$time_task' WHERE id = '$id'";
	$result = $mysqli->query($sqlUpdate);

	echo json_encode($result);