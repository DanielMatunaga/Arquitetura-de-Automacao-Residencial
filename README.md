# Arquitetura de Automacao Residencial

1. A ideia de casas inteligentes está se tornando mais acessível com o uso de novas tecnologias.
Controlar os aparelhos de casa só estando conectado em seu telefone móvel é
futurista e pode mudar o jeito que as pessoas interagem com as suas residências. Automação
Residencial usando Internet das Coisas é promissor e um jeito efetivo de atingir
o controle e gerenciamento das aplicações residenciais, de maneira remota e amigável
para o usuário. Este trabalho discute uma opção de implementação de arquitetura
para o desenvolvimento de Internet das Coisas em aplicações residenciais usando
tecnologias populares e acessíveis para controlar qualquer tipo de aplicação residencial.
As características mais relevantes levadas em consideração no desenvolvimento desta
arquitetura foram acessibilidade e facilidade de implementação dos componentes, por
isso foi feita uma análise de quais tecnologias seriam escolhidas. A arquitetura foi
implementada e testada sobre uma aplicação base de controle digital PID (Proporcional
Integral Derivativo), realizando envios e processamentos de comandos e testando a sua
saída, utilizando-se de protocolos adicionais de segurança. O resultado obtido foi uma
conexão bem sucedida entre aplicativo e placa controladora, entregando informações
íntegras e conﬁáveis, tendo assim uma arquitetura funcional e eﬁciente.
2. Neste trabalho objetiva-se desenvolver uma arquitetura de automação residencial
utilizando IoT para o controle de comandos remotos em tempo real. Os comandos
serão executados por meio de um aplicativo Android, em seguida serão transmitidos
via conexão com a internet para o sistema e ﬁnalmente serão executados pela placa controladora.
Para isso, o projeto irá utilizar uma placa controladora com capacidade de
execução de algoritmos em tempo real e uma placa com capacidade de prover acesso à
internet para realizar a conexão com um banco de dados onde os dados coletados serão
salvos. O banco de dados poderá ser acessado por meio do aplicativo Android para
controle do usuário. O projeto desta arquitetura será testado utilizando um sistema
de controle PID, para que sejam testados o envio e recebimento de mensagem na
arquitetura como um todo.
Entre os objetivos especíﬁcos podemos citar:
Desenvolver um aplicativo Android para realizar interface com o cliente e o
processo de controle de uma tarefa.
 Processar os dados recebidos pela comunicação serial.
 Salvar e consultar os dados em um banco de dados.
 Executar os comandos de controle estabelecidos pelo cliente no aplicativo.
 Garantir tempo real do controlador.
