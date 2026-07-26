# GitHub + Netlify Deployment Checklist

- [ ] Rotate/recreate the exposed Kroger client secret
- [ ] Create a private GitHub repository
- [ ] Push this project to the repository root
- [ ] Import the repository into Netlify
- [ ] Add all five environment variables in Netlify
- [ ] Deploy and record the final `*.netlify.app` URL
- [ ] Add `/api/kroger/auth/callback` to that URL
- [ ] Save the exact callback URL in the Kroger developer portal
- [ ] Set the same URL as `KROGER_REDIRECT_URI` in Netlify
- [ ] Redeploy
- [ ] Test ZIP/store search
- [ ] Test product matching
- [ ] Connect a Fry's/Kroger account
- [ ] Add one test item to the Certification cart
