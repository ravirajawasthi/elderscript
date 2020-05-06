const traverseNode = ({ node, parent, visitor }) => {
  const methods = visitor[node.type];
  if (methods && methods.enter) {
    methods.enter({ node, parent });
  }

  if (node.arguments) {
    tranverArray({ array: node.arguments, parent: node, visitor });
  }

  if (methods && methods.exit) {
    methods.exit({ node, parent });
  }
};

const tranverArray = ({ array, visitor, parent }) => {
  array.forEach((node) => {
    traverseNode({ node, parent, visitor });
  });
};

const traverse = (node, visitor) => {
  traverseNode({ node, visitor });
};

module.exports = { traverse };
