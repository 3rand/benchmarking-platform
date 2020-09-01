#!/bin/bash

MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"${MY_PATH}\" && pwd )`"  # absolutized and normalized
if [ -z "$MY_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi
cat ${MY_PATH}/../tools/templates/00_germlines

TODAY="$(date +"%Y-%m-%d")"
GERMLINE_FOLDER=${MY_PATH}/../germlines/${TODAY}

echo "Checking out latest reference germline as of $TODAY:"
if [ -d "$GERMLINE_FOLDER" ]; then
    echo "Germline for $TODAY already exists. Skipping download";
else
    echo "Downloading $TODAY germline"
    mkdir ${GERMLINE_FOLDER}

    export PATH="${MY_PATH}/../tools/kleinstein:$PATH"
    #export PATH="${HOME}/../GROUP/software/anaconda3/bin:$PATH"
    export PATH="${MY_PATH}/../releases/ncbi-igblast-1.14.0/bin:$PATH"
    echo $PATH
    # Download reference databases
    fetch_igblastdb.sh -o ${GERMLINE_FOLDER}/igblast
    fetch_imgtdb.sh -o ${GERMLINE_FOLDER}/germlines/imgt
    # Build IgBLAST database from IMGT reference sequences
    imgt2igblast.sh -i ${GERMLINE_FOLDER}/germlines/imgt -o ${GERMLINE_FOLDER}/igblast
fi


