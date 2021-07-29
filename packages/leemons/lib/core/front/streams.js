const stream = require('stream');

// stream transformer for listening ready event from frontend
// Emit a ready event when next is listening
function nextTransform(prefix, callback) {
  return new stream.Transform({
    transform: (chunk, encoding, next) => {
      next(null, chunk);

      const data = chunk.toString();
      if (
        data
          // ignore colors
          .replace(
            // eslint-disable-next-line no-control-regex
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            ''
          )
          // in dev. and prod. next logs a line like: ready - listening on:
          .startsWith(prefix)
      ) {
        callback();
      }
    },
  });
}

function frontLogger(level, label = 'Front') {
  return new stream.Writable({
    write: (chunk, encoding, next) => {
      this.log[level](chunk.toString(), { labels: [label] });
      next();
    },
  });
}

module.exports = { nextTransform, frontLogger };
