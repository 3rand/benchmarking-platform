#!/bin/bash


IGBLAST_VERSION=ncbi-igblast-1.14.0



MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"${MY_PATH}\" && pwd )`"  # absolutized and normalized
if [ -z "$MY_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi
cat ${MY_PATH}/../tools/templates/01_header
echo ${MY_PATH}

# add group's anaconda/python to path
#ANACONCA=$GROUP/software/anaconda3/bin
#export PATH=$ANACONCA:$PATH

pip3 install changeo --user
export PATH=${MY_PATH}/../tools/changeo/bin:$PATH

KLEINSTEIN=${MY_PATH}/../tools/kleinstein
export PATH=${KLEINSTEIN}:$PATH

IGBLAST_PATH=${MY_PATH}/../releases/$IGBLAST_VERSION/bin
export PATH=${IGBLAST_PATH}:$PATH

conda install -c bioconda pandaseq

echo "Setting up IgBLAST pipeline"
echo ""
