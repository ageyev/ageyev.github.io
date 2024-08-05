# source "${HOME}"/.bashrc;
source ./.env;

# git init 
git config --local user.name "$GIT_USER_NAME";
git config --local user.email "$GIT_USER_EMAIL";

ssh-add -D 
ssh-add "${GITHUB_KEY_PATH}";
git push github --all 

# ssh-add "${GITLAB_KEY_PATH}" 
#  git push gitlab --all
