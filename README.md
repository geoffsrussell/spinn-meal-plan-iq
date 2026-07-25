# Never commit real values. Add them in Netlify > Project configuration > Environment variables.
KROGER_CLIENT_ID=replace_with_new_client_id
KROGER_CLIENT_SECRET=replace_with_rotated_client_secret
KROGER_API_BASE=https://api.kroger.com/v1
KROGER_REDIRECT_URI=https://YOUR-NETLIFY-SITE.netlify.app/api/kroger/auth/callback
SESSION_SECRET=replace_with_a_random_64_character_secret
