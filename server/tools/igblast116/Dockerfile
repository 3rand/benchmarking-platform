FROM ubuntu:18.04
COPY . /igblast-pipeline

ENV APP_ROOT=/igblast-pipeline
ENV NUMBER_OF_PROCESSORS=4

RUN apt-get update
RUN apt-get install -y wget libuv1 python3 python3-pip
RUN pip3 install changeo --user
RUN pip3 install biopython==1.77



ENV PATH="${APP_ROOT}:${PATH}"
ENV PATH="${APP_ROOT}/pipeline/tools/changeo/bin:${PATH}"
ENV PATH="${APP_ROOT}/pipeline/tools/kleinstein:${PATH}"
ENV PATH="${APP_ROOT}/pipeline/releases/ncbi-igblast-1.16.0/bin:${PATH}"


## expected to have the following volumes mounted

# /INPUT
# /OUTPUT
# /GERMLINES


