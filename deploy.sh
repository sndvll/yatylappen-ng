#!/usr/bin/env bash
# deploy.sh <stage|prod>
# Bygg och deploya yatzylappen-ng till svc.orb.local.
set -euo pipefail

ENV="${1:-}"
if [[ "$ENV" != "stage" && "$ENV" != "prod" ]]; then
  echo "Usage: $0 <stage|prod>"
  exit 1
fi

# Branch guard: stage only from non-main, prod only from main
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
if [[ "$ENV" == "stage" && "$GIT_BRANCH" == "main" ]]; then
  echo "❌ Stage deploy blocked: currently on 'main'. Checkout a feature branch first."
  exit 1
fi
if [[ "$ENV" == "prod" && "$GIT_BRANCH" != "main" ]]; then
  echo "❌ Prod deploy blocked: currently on '$GIT_BRANCH'. Switch to 'main' first."
  exit 1
fi

SVC="emil@svc.orb.local"
APP="yatzylappen-ng"

case "$ENV" in
  stage)
    PORT=3456
    SERVICE=web-server-stage
    URL="https://web.stage.sndvll.dev"
    REMOTE_DIR="~/web/stage/$APP"
    BASE_HREF="/yatzylappen-ng/"
    ;;
  prod)
    echo "❌ Prod deploy via this script is not supported. Use GitHub Actions."
    exit 1
    ;;
esac

echo "→ Bygger $APP för $ENV..."

# Inject version + commit hash
HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0")
sed -i "s/VERSION_PLACEHOLDER/$VERSION/" src/environments/environment.prod.ts
sed -i "s/COMMIT_HASH/$HASH/" src/environments/environment.prod.ts

npm run build -- --base-href="$BASE_HREF"

DEPLOY_DIR=$(mktemp -d)
echo "→ Förbereder deploy-katalog: $DEPLOY_DIR"

# Static files — Angular browser builder output
cp -r dist "$DEPLOY_DIR/dist"

# Symlink: static → dist/yatzylappen-ng (web-server använder static/)
ln -s dist/yatzylappen-ng "$DEPLOY_DIR/static"

# Skapa deploy.json för metadata
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
GIT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
GIT_MSG=$(git log -1 --pretty=%s 2>/dev/null || echo "")
PKG_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0")
if [[ "$ENV" == "stage" ]]; then
  if [[ "$PKG_VERSION" != *-dev ]]; then
    DEPLOY_VERSION="${PKG_VERSION}-dev"
  else
    DEPLOY_VERSION="$PKG_VERSION"
  fi
else
  DEPLOY_VERSION="$PKG_VERSION"
fi
cat > "$DEPLOY_DIR/deploy.json" <<EOF
{
  "branch": "$GIT_BRANCH",
  "commit": "$GIT_COMMIT",
  "message": "$GIT_MSG",
  "version": "$DEPLOY_VERSION",
  "deployedAt": "$(date -Iseconds)"
}
EOF

echo "→ Rsynkar till $SVC:$REMOTE_DIR ..."
rsync -avz --delete "$DEPLOY_DIR/" "$SVC:$REMOTE_DIR/"

echo "→ Startar om $SERVICE på svc..."
ssh "$SVC" "sudo systemctl restart $SERVICE"

echo "→ Väntar på health check ($URL)..."
for i in {1..15}; do
  if curl -sf "http://svc.orb.local:$PORT/health" > /dev/null 2>&1; then
    echo "✅ $ENV redo — $URL"
    rm -rf "$DEPLOY_DIR"
    exit 0
  fi
  sleep 1
done

echo "❌ Health check misslyckades efter 15s — kolla med: ssh $SVC 'sudo journalctl -u $SERVICE -n 30 --no-pager'"
echo "   Deploy dir ($DEPLOY_DIR) finns kvar för felsökning"
exit 1
