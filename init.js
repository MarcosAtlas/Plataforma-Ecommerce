const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
    console.log('Iniciando o processo de inicialização do projeto...');

    // 1. Validar ambiente e dependências
    if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
        throw new Error('Arquivo package.json não encontrado. Certifique-se de estar no diretório correto.');
    }

    // 2. Instalar dependências
    console.log('Instalando dependências...');
    try {
        execSync('npm install', { stdio: 'inherit' });
    } catch (installError) {
        throw new Error('Erro ao instalar dependências. Verifique se o npm está instalado e configurado corretamente.');
    }

    // 2.1. Garantir que o React esteja instalado
    console.log('Verificando se o React está instalado...');
    try {
        require.resolve('react');
        console.log('React já está instalado.');
    } catch (reactError) {
        console.log('React não encontrado. Instalando React...');
        try {
            execSync('npm install react react-dom', { stdio: 'inherit' });
            console.log('React instalado com sucesso.');
        } catch (installReactError) {
            throw new Error('Erro ao instalar o React. Verifique sua conexão com a internet e tente novamente.');
        }
    }

    // 2.2. Corrigir vulnerabilidades
    console.log('Corrigindo vulnerabilidades...');
    try {
        execSync('npm audit fix', { stdio: 'inherit' });
        console.log('Vulnerabilidades corrigidas com sucesso.');
    } catch (auditError) {
        console.log('Erro ao corrigir vulnerabilidades automaticamente. Tentando correção forçada...');
        try {
            execSync('npm audit fix --force', { stdio: 'inherit' });
            console.log('Correção forçada aplicada com sucesso.');
        } catch (forceAuditError) {
            console.log('Erro ao aplicar correção forçada. Algumas vulnerabilidades podem permanecer.');
        }
    }

    // 2.3. Analisar relatório de vulnerabilidades e corrigir pacotes específicos
    console.log('Analisando relatório de vulnerabilidades...');
    try {
        const auditOutput = execSync('npm audit --json', { encoding: 'utf-8' });
        const auditReport = JSON.parse(auditOutput);

        if (auditReport.advisories) {
            const advisories = Object.values(auditReport.advisories);
            for (const advisory of advisories) {
                const packageName = advisory.module_name;
                const latestVersion = advisory.patched_versions;

                if (latestVersion && latestVersion !== '<0.0.0') {
                    console.log(`Atualizando ${packageName} para a versão ${latestVersion}...`);
                    try {
                        execSync(`npm install ${packageName}@latest`, { stdio: 'inherit' });
                        console.log(`${packageName} atualizado com sucesso.`);
                    } catch (updateError) {
                        console.log(`Erro ao atualizar ${packageName}:`, updateError.message);
                    }
                } else {
                    console.log(`Nenhuma versão corrigida disponível para ${packageName}.`);
                    console.log(`Considere substituir ${packageName} por outra biblioteca que ofereça funcionalidade semelhante.`);
                }
            }
        } else {
            console.log('Nenhuma vulnerabilidade encontrada no relatório.');
        }
    } catch (auditAnalysisError) {
        console.log('Erro ao analisar o relatório de vulnerabilidades:', auditAnalysisError.message);
    }

    // 3. Configurar variáveis de ambiente (se necessário)
    console.log('Configurando variáveis de ambiente...');
    const envPath = path.resolve(__dirname, '.env'); // Usar caminho absoluto seguro
    if (!fs.existsSync(envPath)) {
        try {
            fs.writeFileSync(envPath, 'NODE_ENV=development\nPORT=3000\n', { mode: 0o600 }); // Definir permissões seguras
            console.log('.env criado com sucesso.');
        } catch (writeError) {
            throw new Error('Erro ao criar o arquivo .env. Verifique as permissões do sistema.');
        }
    } else {
        console.log('.env já existe.');
    }

    // 4. Inicializar o servidor
    console.log('Inicializando o servidor...');
    try {
        execSync('npm start', { stdio: 'inherit' });
    } catch (startError) {
        throw new Error('Erro ao iniciar o servidor. Verifique se o script "start" está configurado no package.json.');
    }

    // 5. Configurar servidor local
    console.log('Configurando servidor local...');
    try {
        execSync('npm install -g serve', { stdio: 'inherit' });
        console.log('Servidor estático "serve" instalado com sucesso.');
        execSync('serve -s build', { stdio: 'inherit' });
        console.log('Servidor local configurado e rodando.');
    } catch (serverError) {
        throw new Error('Erro ao configurar o servidor local: ' + serverError.message);
    }

    // 6. Realizar deploy no GitHub Pages
    console.log('Realizando deploy no GitHub Pages...');
    try {
        execSync('npm install --save-dev gh-pages', { stdio: 'inherit' });
        console.log('Pacote "gh-pages" instalado com sucesso.');
        execSync('npm run deploy', { stdio: 'inherit' });
        console.log('Deploy realizado com sucesso no GitHub Pages.');
    } catch (deployError) {
        throw new Error('Erro ao realizar o deploy: ' + deployError.message);
    }

    console.log('Projeto inicializado com sucesso!');
} catch (error) {
    console.error('Erro durante o processo de inicialização:', error.message);
    process.exit(1);
}
