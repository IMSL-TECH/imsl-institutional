#!/bin/bash

# Se estiver fazendo deploy da branch de preview e só o Studio foi alterado, cancela o build
CHANGED_FILES=$(git diff --name-only $VERCEL_GIT_COMMIT_REF $VERCEL_GIT_PREVIOUS_SHA)

if echo "$CHANGED_FILES" | grep -q "^studio-imsl-institucional/"; then
  echo "Só arquivos do Studio foram alterados. Ignorando build..."
  exit 0
fi

# Continua com o build normalmente
exit 1
