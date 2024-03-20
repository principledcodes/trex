const run = () => {
  console.log(`
  Usage: trex [options]

  Options:
    -h, --help     Show help
    -v, --version  Show version number
    -f, --file     Dependency file to read and update (string [default: "deps.ts"])
    -u, --update   Update dependencies in file (default: false)
  `);

  return 0;
};

export default { run };
