# dani.openmarmot.com
cdk, typescript,react, and github actions project
just a small project to make sure I understand how these things interact

### reference 
https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-typescript.html
<br>https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html

### setup
\# install awscli (Fedora 40)  
sudo dnf install awscli2 -y

\# setup aws cli  
aws 

\# setup nodesjs and npm on rpm distros  
\# - Amazon Linux 2  
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -  
\# Fedora 40 And Amazon Linux 2023
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -  

\# install nodejs and npm  
sudo dnf install nodejs -y  

\# test both  
node -v  
npm -v  

\# install cdk and typescript globally  
sudo npm install -g aws-cdk typescript

\# test cdk  
cdk --version  

\# !! make sure to cd to your project directly now, after this the setup is local  

\# make a project folder and initalize the cdk project.  
\# note - this is only necessary if you are starting from scratch
mkdir dani-web  
cd dani-web  
cdk init app --language typescript  

\# update package.json as needed and install packages with npm  
npm install

\# create a certificate in AWS Certificate Manager.  
\# this requires manual approval steps so it is not done with cdk..
