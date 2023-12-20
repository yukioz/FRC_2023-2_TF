# Configuração do Ambiente para o Projeto FRC Wired Talks

Este repositório contém a configuração necessária para rodar o projeto FRC Wired Talks localmente. Certifique-se de seguir os passos abaixo para configurar o ambiente corretamente.

## Passo 1: Clonar o Repositório

Clone o repositório para a sua máquina local usando o seguinte comando:

```bash
git clone git@github.com:yukioz/FRC_2023-2_TF.git
```

Dentro do repositório, navegue até a pasta `wired-talks` e execute o seguinte comando para construir o frontend React:

```bash
cd FRC_2023-2_TF/wired-talks
npm install
npm run build
```

## Passo 2: Configurar o Apache2

Edite o arquivo de configuração do Apache2 (`wired-talks.conf`) para refletir o diretório da build do projeto. Adicione o seguinte bloco ao arquivo de configuração:

```apache
<VirtualHost *:80>
    ServerAdmin seu-email@gmail.com
    ServerName www.frc-wiredtalks.com
    DocumentRoot /path/para/o/trabalho/FSE-trabalho-final_2023.2/wired-talks/build

    <Directory /path/para/o/trabalho/FSE-trabalho-final_2023.2/wired-talks/build>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order Deny,Allow
        Allow from all
        Require all granted
    </Directory>
</VirtualHost>
```

## Passo 3: Configurar o DNS

Adicione a seguinte entrada ao arquivo `/etc/hosts` para mapear o domínio para o endereço IP local:

```
127.0.0.1    www.frc-wiredtalks.com
```

## Passo 4: Adicionar Permissões para o Apache

Adicione o usuário Apache ao grupo do proprietário do diretório onde a build do projeto React foi criada. Por exemplo:

```bash
sudo usermod -aG seu_grupo_do_diretório www-data
chmod 770 /path/para/o/trabalho/FSE-trabalho-final_2023.2/wired-talks/build
```

Isso vai garantir que o apache2 tenha acesso a leitura escrita e execução do projeto.

*Dica: o comando __pwd__ gera o path até o diretório atual.

## Passo 5: Reiniciar o Apache2

Reinicie o serviço do Apache2 para aplicar as alterações:

```bash
sudo systemctl restart apache2
```

Agora, você deve ser capaz de acessar o projeto FRC Wired Talks em `http://www.frc-wiredtalks.com` no seu navegador.



Lembre-se de substituir `seu_grupo_do_diretório` pelo grupo correspondente ao diretório da build do seu projeto.


## Passo 6: Usando VM para acessar o site:

Na sua VM, adicione a seguinte entrada ao arquivo `/etc/hosts` para mapear o domínio para o endereço IP local:

```
<IP_DO_SEU_SERVIDOR>    www.frc-wiredtalks.com
```

Para descobrir o <IP_DO_SEU_SERVIDOR>, digite ip a na máquina que está rodando o servidor e procuro por:

```
inet <IP_DO_SEU_SERVIDOR>/XX brd <MASCARA> scope global dynamic noprefixroute enp8s0
```
Assim, mesmo usando outro ambiente de uma máquina virtual você poderá se conectar ao site.