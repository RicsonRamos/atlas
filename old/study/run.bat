@echo off
title Roadmap DE e IA — Setup Local
color 0B
echo.
echo  =====================================================
echo   Roadmap Engenharia de Dados e Plataformas de IA
echo   Setup e inicializacao local
echo  =====================================================
echo.

REM Verifica se Node.js esta instalado
node --version >nul 2>&1
if errorlevel 1 (
  echo  [ERRO] Node.js nao encontrado!
  echo  Baixe em: https://nodejs.org/
  pause
  exit /b 1
)

echo  [OK] Node.js detectado:
node --version
echo.

REM Instala dependencias se node_modules nao existir
if not exist "node_modules\" (
  echo  [INFO] Instalando dependencias npm...
  echo  Aguarde, isso pode levar 1-2 minutos na primeira vez.
  echo.
  npm install
  if errorlevel 1 (
    echo.
    echo  [ERRO] Falha ao instalar dependencias.
    pause
    exit /b 1
  )
  echo.
  echo  [OK] Dependencias instaladas com sucesso!
) else (
  echo  [OK] Dependencias ja instaladas.
)

echo.
echo  =====================================================
echo   Iniciando servidor de desenvolvimento...
echo   Acesse: http://localhost:5173
echo  =====================================================
echo.

npm run dev

pause
