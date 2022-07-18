pushd $(dirname $0)/server/ > /dev/null
node index.js & # Run in separate process
popd > /dev/null