# source "${HOME}"/.bashrc;
source ./.env;

# git init 

# add remote repository 
# git remote remove origin # remove remote 'origin' repository 
# git remote add gitlab "git@gitlab.com:${GIT_USER_NAME}/${APP_NAME}.git"
# git remote add github "git@github.com:${GIT_USER_NAME}/${APP_NAME}.git" 

git config --local user.name "$GIT_USER_NAME";
git config --local user.email "$GIT_USER_EMAIL";

# git config --local -l

npm run-script build && git add ./build && git commit -a -m "run build script"

ssh-add -D

ssh-add "${GITHUB_KEY_PATH}";
git push github --all 

ssh-add "${GITLAB_KEY_PATH}"
git push gitlab --all

# docusaurus clear
