if [ "$VERCEL_ENV" == "production" ]; then
  # Check if the build is triggered by a merged pull request
  if [ "$VERCEL_GIT_COMMIT_MESSAGE" == "Merge pull request"* ]; then
    exit 1 # Proceed with the build
  else
    exit 0 # Skip the build
  fi
else
  exit 0 # Skip the build for non-production environments
fi
