<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="styles/style.css">
    <link rel="shortcut icon" href="imgs/favicon.ico" type="image/x-icon">

    <title>Stopwatch</title>
</head>
<body>
    <div class="container">
        <section class="options-config">
            <div class="transparent-box">
                <label>
                    <input type="checkbox" data-js="check-milliseconds">
                    Mostrar milisegundos
                </label>
            </div>
            <div class="transparent-box">
                <select data-js="select-taskType">
                    <option value="1">Estudos de programação</option>
                    <option value="2">Desenvolvimento projetos pessoais</option>
                    <option value="3">Desenvolvimento projetos da empresa</option>
                </select>
            </div>
        </section>
        <section class="display">
            <div class="card-display">
                <label>00:00:11<small class="milliseconds">.00</small></label>
            </div>
        </section>
        <section class="buttons">
            <button class="btn btnIniciar"><img src="./imgs/play.svg" alt="play"> Iniciar</button>
            <button class="btn btnPause"><img src="./imgs/pause.svg" alt="pause"> Pausar</button>
            <button class="btn btnPararSalvar"><img src="./imgs/stop.svg" alt="parar e salvar"> Parar e salvar</button>
            <button class="btn btnRelatorio"><img src="./imgs/reports.svg" alt="relatorio"> Relatório</button>
        </section>
        <section class="table-results d-none">
            <div class="table">
                <div class="table-head">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tipo de atividade</th>
                                <th>Data e hora de início</th>
                                <th>Tempo total</th>
                                <th>Observações</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body">
                    <table>
                        <tbody>
                            <?php $i = 1; while($i < 14){ ?>
                            <tr>
                                <td>13</td>
                                <td>Desenvolvimento projetos da empresa</td>
                                <td>Quar 16 dez 2020 23:33:04</td>
                                <td>00:35:22</td>
                                <td>Estudos de phyton (curso em video)</td>
                                <td>
                                    <button class="btn">Excluir</button>
                                </td>
                            </tr>
                            <?php $i++; };  ?>
                        </tbody>
                    </table>
                </div>  
            </div>
        </section>
    </div>

    <script src="scripts/data.js"></script>
    <script src="scripts/events.js"></script>
    <script src="scripts/app.js"></script>
</body>
</html>